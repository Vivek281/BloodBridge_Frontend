import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";

export const authRouter = [
    {path:"/login", element:<LoginPage />},
    {path:"/register", element:<RegisterPage />},
    {path:"/verify-email", element:<VerifyEmailPage/>}
]