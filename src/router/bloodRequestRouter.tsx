import BloodRequestPage from "../pages/bloodRequest/BloodRequestPage";
import BloodRequestDetailsPage from "../pages/bloodRequest/BloodRequestDetailsPage";
import BloodRequestListPage from "../pages/bloodRequest/BloodRequestListPage";

export const bloodRequestRouter = [
    {path:"/blood-request", element:<BloodRequestPage />},
    {path:"/requests/:id", element:<BloodRequestDetailsPage />},
    {path:"/request-list", element:<BloodRequestListPage />}
]