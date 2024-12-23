import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faCirclePlay,
  faCompactDisc,
  faTowerBroadcast,
  faClockRotateLeft,
  faHeart,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/Logo.png";
import "../../../index.css";
import Scrollbars from "react-custom-scrollbars-2";

const formatSidebar =
  "text-muted-foreground w-full block p-4 hover:text-foreground duration-300 cursor-pointer relative";
const activeStyle = "bg-purple-900 bg-opacity-50";
// bg-[#561e84]
export default function Sidebar() {
  return (
    <div className="flex w-full h-full text-foreground">
      <nav className="w-full bg-card ">
        <ul>
          <li>
            <span className={`${formatSidebar} cursor-text flex relative`}>
              <img
                src={logo}
                alt="DNCMP3"
                className="w-[100px] h-[100px] relative z-10"
              />
              
            </span>
          </li>
          {[
            { path: "/", label: "Cá nhân", icon: faCirclePlay },
            { path: "/discover", label: "Khám phá", icon: faCompactDisc },
            { path: "/zing-chart", label: "#zing-chart", icon: faChartLine },
            { path: "/radio", label: "Radio", icon: faTowerBroadcast },
          ].map(({ path, label, icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `${formatSidebar} ${isActive ? activeStyle : ""}`
                }
              >
                <span
                  className={`absolute left-0 top-0 h-full w-1 ${
                    window.location.pathname === path
                      ? "bg-pink-500"
                      : "bg-transparent"
                  } transition-all duration-300`}
                ></span>
                <FontAwesomeIcon className="pr-2" icon={icon} />
                {label}
              </NavLink>
            </li>
          ))}
          <li className="border mt-4"></li>
          <ul className="flex flex-col h-screen bg-background text-foreground">
            <Scrollbars style={{ width: "100%", height: "80%" }}>
              <nav className="w-full bg-card scrollable">
                <ul>
                  {[
                    {
                      path: "/new-music",
                      label: "BXH Nhạc Mới",
                      icon: faMusic,
                    },
                  ].map(({ path, label, icon }) => (
                    <li key={path}>
                      <NavLink
                        to={path}
                        className={({ isActive }) =>
                          `${formatSidebar} ${isActive ? activeStyle : ""}`
                        }
                      >
                        <span
                          className={`absolute left-0 top-0 h-full w-1 ${
                            window.location.pathname === path
                              ? "bg-pink-500"
                              : "bg-transparent"
                          } transition-all duration-300`}
                        ></span>
                        <FontAwesomeIcon className="pr-2" icon={icon} />
                        {label}
                      </NavLink>
                    </li>
                  ))}
                  <li
                    className="p-2 rounded-xl mt-4 mb-4 mx-auto w-5/6"
                    style={{
                      backgroundImage:
                        "linear-gradient(117deg, #5a4be7, #c86dd7 102%)",
                    }}
                  >
                    <p className="font-bold text-xs mb-2 text-center">
                      Nghe nhạc không quảng cáo cùng kho nhạc PREMIUM
                    </p>
                    <a
                      style={{ backgroundColor: "yellow" }}
                      href="/vip/upgrade"
                      className={`${formatSidebar} py-2 px-1 text-xs text-black font-bold uppercase mx-auto rounded-full flex text-center justify-center hover:bg-yellow-500 transition-all`}
                    >
                      Nâng Cấp Tài Khoản
                    </a>
                  </li>
                </ul>
                <ul>
                  {[
                    {
                      path: "/history",
                      label: "Nghe gần đây",
                      icon: faClockRotateLeft,
                    },
                    {
                      path: "/favorite-songs",
                      label: "Bài hát yêu thích",
                      icon: faHeart,
                    },
                  ].map(({ path, label, icon }) => (
                    <li key={path}>
                      <NavLink
                        to={path}
                        className={({ isActive }) =>
                          `${formatSidebar} ${isActive ? activeStyle : ""}`
                        }
                      >
                        <span
                          className={`absolute left-0 top-0 h-full w-1 ${
                            window.location.pathname === path
                              ? "bg-pink-500"
                              : "bg-transparent"
                          } transition-all duration-300`}
                        ></span>
                        <FontAwesomeIcon className="pr-2" icon={icon} />
                        {label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
                <div className="h-[40px]"></div>
              </nav>
            </Scrollbars>
          </ul>
        </ul>
      </nav>
    </div>
  );
}
