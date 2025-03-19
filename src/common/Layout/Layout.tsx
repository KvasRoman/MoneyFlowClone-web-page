import { useAppDispatch } from "@/store/hooks";
import { getProfile, selectUser } from "@/store/slices/authSlice";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

function Layout() {
    const dispatch = useAppDispatch();
    const user = useSelector(selectUser);
    const effectRan = useRef(false);
    useEffect(() => {
        if (!user && !effectRan.current) {
            dispatch(getProfile());
            effectRan.current = true
        }
    },
        [user, dispatch])
    return (
        <>
            <div className="h-screen flex flex-col">

            
            <div className="header">
                <Link to="/dashboard" className="text-blue-500 underline m-2">
                    To DashBoard
                </Link>
                <Link to="/ai-assistant" className="text-blue-500 underline m-2">
                    To AI Chat
                </Link>
                {user ? `${user.firstName} ${user.email}` : "loading"}</div>
            <div className="sidebar"></div>
            <div className="content flex-1">
                <Outlet />
            </div>
            </div>
        </>
    )
}

export default Layout;