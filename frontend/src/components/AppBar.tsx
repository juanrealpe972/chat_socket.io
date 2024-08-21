import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import HeaderM from "./HeaderM";
import Footer from "./Footer";
import Navbar from "./Navbar";

const AppBar = () => {
    const auth = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    const parsedUser = user ? JSON.parse(user) : null;

    return auth && parsedUser ? (
        <div className="flex flex-auto h-auto bg-[#efefef]">
            <Navbar />
            <div className="grow">
                <HeaderM />
                <Outlet />
            </div>
        </div>
    ) : (
        <div className="h-auto min-h-screen bg-[#FDFBF6] flex flex-col">
            <Header />
            <div className="grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default AppBar;
