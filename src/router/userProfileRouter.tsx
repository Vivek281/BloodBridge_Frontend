import ActiveDonationInProfilePage from "../pages/userProfile/ActiveDonationInProfilePage";
import BloodRequestDetailsInProfilePage from "../pages/userProfile/BloodRequestDetailsInProfilePage";
import DonorDetailsInProfilePage from "../pages/userProfile/DonorDetailsInProfilePage";
import UserProfilePage from "../pages/userProfile/UserProfilePage";

export const userProfileRouter = [
    {path:"/user-profile", element:<UserProfilePage/>},
    {path:"/user-profile/active-donation", element:<ActiveDonationInProfilePage/>},
    {path:"/user-profile/my-request-detail", element:<BloodRequestDetailsInProfilePage/>},
    {path:"/user-profile/donor/:id", element:<DonorDetailsInProfilePage/>}
]