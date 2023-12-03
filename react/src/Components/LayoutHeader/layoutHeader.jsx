import { Link, Outlet, useLocation} from "react-router-dom";
import Header from "../Header/header";

export default function LayoutHeader({heaer_link}) {
    const pages = {
        "/proj" : 1,
        "/hotworks" : 2,
        "/req" : 3,
    }
    console.log(Object.keys(pages))
    const location = useLocation()
    return (
        <>
            <Header selected={pages[location.pathname]}/> 
            <Outlet/>
        </>
    )
}