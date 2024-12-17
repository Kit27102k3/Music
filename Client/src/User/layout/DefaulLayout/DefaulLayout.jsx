import { useState, useMemo } from "react"; // import useMemo để tối ưu hóa
import Sidebar from "../../pages/Sidebar/Sidebar";
import Header from "../../layout/Header/Header";
import List from "../List/List";
import "../../../App.css";
import PlayBack from "../PlayBack/PlayBack";
import { Scrollbars } from "react-custom-scrollbars-2";
import BG from "../../../assets/vite.svg";
import image4 from "../../../assets/background-theme/backroundThemes/3.jpg";
import image5 from "../../../assets/background-theme/backroundThemes/4.jpg";
import image6 from "../../../assets/background-theme/backroundThemes/5.jpg";
import image7 from "../../../assets/background-theme/backroundThemes/6.jpg";
import image8 from "../../../assets/background-theme/backroundThemes/7.jpg";

const singerBackgrounds = [image4, image5, image6, image7, image8];

const DefaultLayout = ({ children }) => {
  const [isShowRightSidebar, setIsShowRightSidebar] = useState(true);

  const [background, setBackground] = useState(() => {
    return localStorage.getItem("background") || BG;
  });

  const handleChangeBackground = (newBackground) => {
    setBackground(newBackground);
    localStorage.setItem("background", newBackground);
  };

  const textColor = useMemo(() => {
    return singerBackgrounds.includes(background) ? "text-black" : "text-white";
  }, [background]);

  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className={`${textColor} flex flex-col fixed w-full h-screen bg-cover`}
    >
      <div className="w-full h-full flex flex-auto">
        <div className="w-[240px] min-h-screen flex-none border border-blue-500">
          <Sidebar />
        </div>
        <div
          className={`flex-auto flex flex-col border border-red-500 ${textColor}`}
        >
          <div className="flex-none">
            <Header onChangeBackground={handleChangeBackground} />
          </div>
          <div className="flex-auto w-full overflow-hidden">
            <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
              {children}
              <div className="h-[100px] w-full"></div>
            </Scrollbars>
          </div>
        </div>
        {isShowRightSidebar && (
          <div
            className={`${textColor} w-[280px] px-2 min-h-screen hidden 1600:flex animate-slide-left flex-none `}
          >
            <List />
          </div>
        )}
      </div>
      <div className="fixed z-50 bottom-0 left-0 right-0 h-[90px] ">
        <PlayBack setIsShowRightSidebar={setIsShowRightSidebar} />
      </div>
    </div>
  );
};

export default DefaultLayout;
