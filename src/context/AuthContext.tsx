import { createContext } from "react";
import type { ICredentials } from "../components/auth/LoginForm";
import type { IRegisterData } from "../components/auth/RegisterForm";

export interface IUser{
    address: string;
    email: string;
    name: string;
    role: string;
    status: string;
    _id: string;
    bloodGroup: string;
    fcmTokens: string[];
    // image:{
    //     publicId: string,
    //     secureUrl: string,
    //     optimizedUrl: string
    // }

}


export interface IAuthContext {
    loggedInUser: null | undefined | IUser;
    loginUser: (data: ICredentials) => Promise<IUser | undefined>;
    getLoggedInUser: () => Promise<IUser | undefined>;
    logoutUser: () => void; // Added logout
    loading: boolean; // Useful to have this in context too
    registerUser: (data: IRegisterData) => Promise<any>;
    handleRequestFCM: () => Promise<any>;
}

export const AuthContext = createContext<IAuthContext>({
    loggedInUser: null,
    loginUser: async () => undefined,
    getLoggedInUser: async () => undefined,
    logoutUser: () => {},
    loading: true,
    registerUser: async () => undefined,
    handleRequestFCM: async () => {},
});