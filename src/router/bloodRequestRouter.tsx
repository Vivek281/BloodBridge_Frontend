import BloodRequestPage from "../pages/bloodRequest/BloodRequestPage";
import BloodRequestDetailsPage from "../pages/bloodRequest/BloodRequestDetailsPage";

export const bloodRequestRouter = [
    {path:"/blood-request", element:<BloodRequestPage />},
    {path:"/requests/:id", element:<BloodRequestDetailsPage />}
]