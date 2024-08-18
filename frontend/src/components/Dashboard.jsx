import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "./Navbar";
import Header from "./Header";

const Dashboard = () => {
    // const auth = localStorage.getItem("token");
    const auth = false
    const user = JSON.parse(localStorage.getItem("user"));

    return auth && user ? (
        <div className="flex flex-auto h-auto bg-[#FDFBF6]">
            <Navbar />
            <div className="grow">
                <Header />
                <Outlet />
            </div>
        </div>
    ) : (
        <div className="flex-auto h-auto bg-[#FDFBF6]">
            <Header />
            <div className="grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
