import { Outlet } from "react-router";
import ActivationHandler from "../components/activationHandler/ActivationHandler.tsx";

export default function RootLayout() {
  return (
    <>
      <ActivationHandler />
      {/* This is where all your page content will render */}
      <Outlet /> 
    </>
  );
}