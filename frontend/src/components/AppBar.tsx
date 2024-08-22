import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import HeaderM from "./HeaderM";
import { UserContext } from "../context/UserContext";

const AppBar = () => {
    const auth = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const { userAuth } = UserContext()

    const parsedUser = user ? JSON.parse(user) : null;

    return auth && parsedUser && userAuth ? (
        <div className="h-screen bg-[#efefef]">
            <HeaderM />
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
