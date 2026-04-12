import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import "./index.css";
import RootLayout from "./pages/Root";
import SignUpPage from "./pages/SignUp";
import OnbordingPage from "./pages/Onboarding";
import ProfilePage from "./pages/Profile";
import EditProfilPage from "./pages/EditProfil.jsx";

import {
  signUpAction,
  logoutAction,
  onboardingAction,
  editInfoAction,
  editImageAction,
  addWeightAction,
  addWaterAction,
  addWorkoutAction,
} from "./pages/actions.js";
import {
  profileLoader,
  onboardingLoader,
  authLoader,
} from "./pages/loaders.js";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "auth",
        element: <SignUpPage />,
        action: signUpAction,
        loader: authLoader,
      },
      {
        path: "onboarding",
        element: <OnbordingPage />,
        action: onboardingAction,
        loader: onboardingLoader,
      },
      {
        path: "profile",
        element: <ProfilePage />,
        loader: profileLoader,
        action: editImageAction,
      },
      {
        path: "profile/edit",
        element: <EditProfilPage />,
        loader: profileLoader,
        action: editInfoAction,
      },
      {
        path: "profile/add-weight",
        action: addWeightAction,
      },
      { path: "profile/add-water", action: addWaterAction },
      {
        path: "profile/add-workout",
        action: addWorkoutAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
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
