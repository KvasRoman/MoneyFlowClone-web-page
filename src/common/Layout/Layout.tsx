import { useAppDispatch } from "@/store/hooks";
import { getProfile, selectUser } from "@/store/slices/authSlice";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function Layout (){
    const dispatch = useAppDispatch();
    const user = useSelector(selectUser);
    const effectRan = useRef(false); 
    useEffect(() => {
       if(!user && !effectRan.current){
        dispatch(getProfile());
        effectRan.current = true
       } 
    },
    [user,dispatch])
    return (
        <>
        <div className="header">{user ? `${user.firstName} ${user.email}` : "loading"}</div>
        <div className="sidebar"></div>
        <div className="content">
            <Outlet/>
        </div>
        </>
    )
}

export default Layout;