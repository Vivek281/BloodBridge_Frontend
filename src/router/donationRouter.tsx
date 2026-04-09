import ActiveDonationPage from "../pages/donation/ActiveDonationPage"
import DonorDetailsPage from "../pages/donation/DonorDetailsPage"

export const donationRouter = [
    {path:"/donation-active/:id", element:<ActiveDonationPage/>},
    {path:"/donor/:id", element:<DonorDetailsPage/>},

]