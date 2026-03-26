import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../ui/ScrollToTop";

export default function RootLayout () {
return <>
<Header />
<ScrollToTop/>
<Outlet/>
<Footer/>
</>
}