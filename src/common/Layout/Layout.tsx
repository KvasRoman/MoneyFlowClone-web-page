import { Outlet } from "react-router-dom";

function Layout (){
    return (
        <>
        <div className="header"></div>
        <div className="sidebar"></div>
        <div className="content">
            <Outlet/>
        </div>
        </>
    )
}

export default Layout;