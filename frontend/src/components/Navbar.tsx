import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { icono } from "./IconsAtom"; 
import { UserContext } from "../context/UserContext";

interface MenuItem {
  title: string;
  link: string;
  icon: React.ElementType;
  gap?: boolean;
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const [sidebar, setSidebar] = useState<boolean>(true);
  const [activeLink, setActiveLink] = useState<string>(location.pathname);
  const {open} = UserContext()

  const Menus: MenuItem[] = [
      { title: "Usuarios", link: "/users", icon: icono.iconoRol },
      { title: "Geografía", link: "/geografia", icon: icono.iconoWorl },
      { title: "Tipo Variedad", link: "/tipo_variedad", icon: icono.iconoFlor },
      { title: "Datos Estadísticos", link: "/datosEstadisticos", icon: icono.iconoFlor },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebar(false);
      } else {
        setSidebar(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(open));
  }, [open]);

  return (
    <div className="flex min-h-screen border-r border-[#838383]">
      {sidebar && (
        <div
          className={`${open ? "w-60" : "w-20"} bg-[#F7F4F3] max-h-full p-5 pt-5 relative duration-300`}
        >
          <div className="flex items-center">
            <Logo />
            <h1
              className={`text-[#323232] origin-left ml-2 font-bold text-2xl duration-200 overflow-hidden whitespace-nowrap ${
                !open && "scale-0"
              }`}
              style={{ maxWidth: "calc(100% - 4rem)" }}
              title="DEV"
            >
              <span className="text-[#071013]">DEV</span>
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <Link
                to={Menu.link}
                key={index}
                onClick={() => setActiveLink(Menu.link)}
                className={`flex rounded-md p-2 cursor-pointer text-[#071013] border-solid text-sm items-center gap-x-3 ${
                  activeLink === Menu.link ? "bg-[#071013] text-[#F7F4F3]" : "hover:bg-[#071013] hover:text-[#F7F4F3]"
                } ${Menu.gap ? "mt-9" : "mt-2"}`}
              >
                <div>{React.createElement(Menu.icon, { size: "20" })}</div>
                <span
                  className={`${!open && "hidden"} origin-left duration-200 overflow-hidden whitespace-nowrap`}
                  style={{ maxWidth: "calc(100% - 3rem)" }}
                  title={Menu.title}
                >
                  {Menu.title}
                </span>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
