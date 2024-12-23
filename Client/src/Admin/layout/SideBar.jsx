import { NavLink, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import logo from "../../assets/Logo.png";

const formatSidebar =
  "text-muted-foreground w-full block p-4 hover:text-foreground duration-300 cursor-pointer relative";
const activeStyle = "bg-purple-900 bg-opacity-50";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);

  return (
    <div className="flex w-full bg-black text-white h-full text-foreground">
      <nav className="w-full bg-card ">
        <ul>
          <li>
            <span className={`${formatSidebar} cursor-text`}>
              <img src={logo} alt="DncMP3" className="w-[140px] h-[70px]" />
            </span>
          </li>
          {[
            { path: "/admin/statistical", label: "Thống kê" },
            { path: "/admin/users", label: "Người dùng" },
            { path: "/admin/songs", label: "Bài hát yêu thích" },
            { path: "/admin/playlists", label: "Playlist yêu thích" },
            { path: "/admin/singers", label: "Ca sĩ yêu thích" },
            { path: "/admin/upgrade", label: "Gói nâng cấp" },
            { path: "/admin/contacts", label: "Phản hồi" },
          ].map(({ path, label }) => (
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
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className="w-full px-4 p-4 mt-2 bg-purple-900 text-center justify-center hover:bg-opacity-80"
        >
          ĐĂNG XUẤT
        </button>
      </nav>
    </div>
  );
}
