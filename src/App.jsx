import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import "./index.css";
import RootLayout from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ path: "/", element: <HomePage /> }],
  },
]);
function App() {
  return <div className="bg-bg-dark min-h-screen text-text-primary-paragraph font-primary">
   <RouterProvider  router={router} />
  </div>
  
}

export default App;
