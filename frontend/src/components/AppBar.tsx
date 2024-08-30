import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import { UserContext } from "../context/UserContext";

const AppBar = () => {
    const { userAuth, setUserAuth } = UserContext();
    const [auth, setAuth] = useState(false);
    const [parsedUser, setParsedUser] = useState(null);

    useEffect(() => {
        const getDates = () => {
            const token = localStorage.getItem("token");
            const user = localStorage.getItem("user");
            if(token && user) {
                setUserAuth(true)
            }
            setAuth(!!token); 
            setParsedUser(user ? JSON.parse(user) : null);
        };
        getDates();
    }, []);

    return auth && parsedUser && userAuth ? (
        <div className="h-screen bg-[#efefef]">
            <Header />
            <div className="p-6">
                <Outlet />
            </div>
        </div>
    ) : (
        <div className="bg-[#FDFBF6] flex flex-col h-screen">
            <Header />
            <div className="flex-1 overflow-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default AppBar;
