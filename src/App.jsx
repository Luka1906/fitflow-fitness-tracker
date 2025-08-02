import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import "./index.css";
import RootLayout from "./pages/Root";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {index: true, element: <HomePage /> },
      { path: "auth", element: <SignUp /> },
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
