import { Outlet, useSearchParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { searchMenu } from "../../ultis/menu";
import { useSelector } from "react-redux";

const notActiveStyle =
  "px-4 hover:text-main-500 font-semibold cursor-pointer uppercase";
const activeStyle =
  "px-4 hover:text-main-500 font-semibold cursor-pointer border-b-2 border-pink-500 uppercase text-white flex items-center h-[54px]";

function Search() {
  const { keyword } = useSelector((state) => state.music);

  return (
    <div className="w-full">
      <div className="flex h-[50px] mb-7 items-center text-sm border-b border-gray-400 pl-[60px] pb-1">
        <span className="text-[24px] font-bold pr-6 border-r border-gray-400 uppercase">
          Kết quả tìm kiếm
        </span>
        <div className="flex items-center ">
          {searchMenu.map((item) => (
            <NavLink
              key={item.path}
              to={`${item.path}?q=${keyword.replace(" ", "+")}`}
              className={({ isActive }) =>
                isActive ? activeStyle : notActiveStyle
              }
            >
              {item.text}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Search;
