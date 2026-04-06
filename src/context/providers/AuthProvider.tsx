import { type ReactNode, useEffect, useState, useCallback } from "react";
import { AuthContext, type IUser } from "../AuthContext";
import axiosInstance from "../../config/axios.config";
import Cookies from "js-cookie";
import type { ICredentials } from "../../components/auth/LoginForm";
import LoadingScreen from "../../pages/home/LoadingScreen";
import type { IRegisterData } from "../../components/auth/RegisterForm";
import { requestFCMToken } from "../../utils/firebaseUtils";




export default function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [loggedInUser, setLoggedInUser] = useState<IUser | undefined | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const logoutUser = useCallback(async () => {
        try {
            // Hit the backend first while the token is still in cookies
            await axiosInstance.get("/auth/logout");
        } catch (error) {
            console.error("Logout API failed", error);
        } finally {
            // Always clear local state regardless of API success
            Cookies.remove("_at");
            setLoggedInUser(null);
        }
    }, []);

    // 1. Modify getLoggedInUser to accept an optional manual token
    const getLoggedInUser = async (manualToken?: string): Promise<IUser | undefined> => {
        // Priority: Use the manualToken if provided, otherwise check Cookies
        const token = manualToken || Cookies.get("_at");

        if (!token) {
            setLoggedInUser(null);
            setLoading(false);
            return;
        }

        try {
            const userDetailResponse = await axiosInstance.get("/auth/me", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLoggedInUser(userDetailResponse.data);
            return userDetailResponse.data;
        } catch (error) {
            logoutUser();
        } finally {
            setLoading(false);
        }
    };

    // 2. Update loginUser to pass the fresh token forward
    const loginUser = async (data: ICredentials) => {
        const response = await axiosInstance.post("/auth/login", data);
        const freshToken = response.data.token;

        Cookies.set("_at", freshToken, {
            expires: 1,
            secure: true,
            sameSite: "Lax"
        });

        // Pass the token directly so getLoggedInUser doesn't have to wait for the cookie
        return await getLoggedInUser(freshToken);
    };

    const registerUser = async (data: IRegisterData) => {
        // Just send the data to the backend
        const response = await axiosInstance.post("/auth/register", data);
        return response;
    };

    const [fcmToken, setFcmToken] = useState<string | null>(null);
    const handleRequestFCM = async () => {
        // 1. Permission Check
        if (Notification.permission === "denied") return;
    
        try {
            // requestFCMToken() usually calls Firebase's getToken()
            // If the token is already in browser storage, it returns it instantly.
            // If it's expired or new, Firebase generates a fresh one.
            const currentToken = await requestFCMToken(); 
    
            if (currentToken) {
                // Check if this specific token is already in our user's list
                const alreadyRegistered = loggedInUser?.fcmTokens?.includes(currentToken);
    
                if (!alreadyRegistered) {
                    // 2. Update Backend ONLY if it's a new/refreshed token
                    await axiosInstance.patch("/auth/setFCM", { fcmToken: currentToken });
    
                    // 3. Update Local State
                    setLoggedInUser((prev) => 
                        prev ? { ...prev, fcmTokens: [...new Set([...(prev.fcmTokens || []), currentToken])] } : null
                    );
                }
            }
        } catch (error) {
            console.error("FCM Error:", error);
        }
    };

    useEffect(() => {
        getLoggedInUser();
    }, []);

    const value = {
        loggedInUser,
        loginUser,
        getLoggedInUser,
        logoutUser,
        loading,
        registerUser,
        handleRequestFCM
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? <LoadingScreen isLoading={loading} /> : children}
        </AuthContext.Provider>
    );
}