import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import "./index.css";
import RootLayout from "./pages/Root";
import SignUpPage from "./pages/SignUp";
import ProfilePage from "./pages/Profile";
import { action as authAction } from "./pages/signup.action";
import {loader as profileLoader} from "./pages/profile.loader"

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {index: true, element: <HomePage /> },
      { path: "auth", element: <SignUpPage />, action:authAction },
      {path: "profile", element: <ProfilePage/>, loader:profileLoader}
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
