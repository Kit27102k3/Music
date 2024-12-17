import Sidebar from "./SideBar";
import "../../App.css";

function HeaderAdmin({ children }) {
  return (
    <div className="flex h-screen text-black">
      <div className="w-[20%] border-r">
        <Sidebar />
      </div>
      <div className="w-[80%] mt-16 px-[60px] bg-white">{children}</div>
    </div>
  );
}

export default HeaderAdmin;


