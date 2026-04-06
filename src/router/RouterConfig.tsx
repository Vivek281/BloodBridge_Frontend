import { RouterProvider, createBrowserRouter } from "react-router";
import ErrorPage from "../pages/errors/ErrorPage.tsx";  
import { homeRouter } from "./homeRouter.tsx";
import { authRouter } from "./authRouter.tsx";

import RootLayout from "./rootLayout.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // The parent
    children: [
      ...homeRouter,
      ...authRouter,
      
    ]
  },
  { path: "*", element: <ErrorPage code={404} /> }
]);

export default function RouterConfig() {
  return <RouterProvider router={router} />;
}