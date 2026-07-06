import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../ui/ScrollToTop";
import { useRouteLoaderData } from "react-router-dom";

export default function RootLayout () {
    const user = useRouteLoaderData("root"); 

return <>
<Header user={user} />
<ScrollToTop/>
<Outlet/>

</>
}