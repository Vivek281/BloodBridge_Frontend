import UserLayout from "../pages/layout/UserLayout";
import HomePage from "../pages/home/HomePage";
import HowItWorksPage from "../pages/home/HowItWorksPage";
import { bloodRequestRouter } from "./bloodRequestRouter.tsx";
import { donationRouter } from "./donationRouter.tsx";

export const homeRouter = [
    {path:"/", element:<UserLayout />, children:[
        {index:true, element:<HomePage />},
        {path:"/how-it-works", element:<HowItWorksPage />},
        ...bloodRequestRouter,
        ...donationRouter
    ]},
]