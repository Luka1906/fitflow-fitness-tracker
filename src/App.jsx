import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import "./index.css";
import RootLayout from "./pages/Root";
import SignUpPage from "./pages/SignUp";
import OnbordingPage from "./pages/Onboarding";
import ProfilePage from "./pages/Profile";

import { signUpAction, logoutAction, onboardingAction } from "./pages/auth.action";
import { onboardingLoader, profileLoader } from "./pages/profile.loader";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "auth", element: <SignUpPage />, action: signUpAction },
      { path: "onboarding", element: <OnbordingPage />, action: onboardingAction, loader: onboardingLoader},
      { path: "profile", element: <ProfilePage />, loader: profileLoader },

      { path: "logout", element: <ProfilePage />, action: logoutAction },
    ],
  },
]);
function App() {
  return (
    <div className="bg-bg-dark min-h-screen text-text-primary-paragraph font-primary">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
