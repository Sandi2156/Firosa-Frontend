import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import SignUp from "../pages/sign-up";
import SignIn from "../pages/sign-in";
import LandingPage from "../pages/landing-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/landing",
    element: <LandingPage />,
  },
]);

export default router;
