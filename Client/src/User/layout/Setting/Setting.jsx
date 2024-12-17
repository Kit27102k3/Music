import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faBrush,
  faExclamation,
  faFileLines,
  faPlay,
  faFlag,
  faRectangleAd,
  faShield,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Setting() {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-purple-600 text-white rounded-lg shadow-lg p-2">
      <ul>
        <li className="flex items-center justify-between py-2 px-4 hover:bg-purple-900 hover:bg-opacity-50 rounded cursor-pointer">
          <div className="flex items-center justify-between w-full">
            <FontAwesomeIcon
              className="border p-1 w-3 h-3 mr-2 rounded-full"
              icon={faPlay}
            />
            <p className="flex-grow">Trình phát nhạc</p>
            <FontAwesomeIcon className="w-4 h-4" icon={faAngleRight} />
          </div>
        </li>
        <li className="flex items-center justify-between py-2 px-4 hover:bg-purple-900 hover:bg-opacity-50 rounded cursor-pointer">
          <div className="flex items-center justify-between w-full">
            <FontAwesomeIcon
              className="border p-1 w-3 h-3 mr-2 rounded-full"
              icon={faBrush}
            />
            <p className="flex-grow">Giao diện</p>
            <FontAwesomeIcon className="w-4 h-4" icon={faAngleRight} />
          </div>
        </li>
        <div className="border-t border-gray-400 my-2"></div>
        <li className="flex items-center py-2 px-4 hover:bg-purple-900 hover:bg-opacity-50 rounded cursor-pointer">
          <div className="flex items-center justify-between w-full">
            <FontAwesomeIcon
              className="border p-1 w-3 h-3 mr-2 rounded-full"
              icon={faExclamation}
            />
            <p onClick={() => navigate("/introduce")} className="flex-grow">
              Giới thiệu
            </p>
          </div>
        </li>
        <li className="flex items-center py-2 px-4 hover:bg-purple-900 hover:bg-opacity-50 rounded cursor-pointer">
          <div className="flex items-center justify-between w-full">
            <FontAwesomeIcon
              className="border p-1 w-3 h-3 mr-2 rounded-full"
              icon={faFileLines}
            />
            <p className="flex-grow">Thỏa thuận người dùng</p>
          </div>
        </li>
        <li className="flex items-center py-2 px-4 hover:bg-purple-900 hover:bg-opacity-50 rounded cursor-pointer">
          <div className="flex items-center justify-between w-full">
            <FontAwesomeIcon
              className="border p-1 w-3 h-3 mr-2 rounded-full"
              icon={faShield}
            />
            <p className="flex-grow">Chính sách bảo mật</p>
          </div>
        </li>
        <li className="flex items-center py-2 px-4 hover:bg-purple-900 hover:bg-opacity-50 rounded cursor-pointer">
          <div className="flex items-center justify-between w-full">
            <FontAwesomeIcon
              className="border p-1 w-3 h-3 mr-2 rounded-full"
              icon={faFlag}
            />
            <p className="flex-grow">Báo cáo vi phạm bản quyền</p>
          </div>
        </li>
        <li className="flex items-center py-2 px-4 hover:bg-purple-900 hover:bg-opacity-50 rounded cursor-pointer">
          <div className="flex items-center justify-between w-full">
            <FontAwesomeIcon
              className="border p-1 w-3 h-3 mr-2 rounded-full"
              icon={faRectangleAd}
            />
            <p className="flex-grow">Quảng cáo</p>
          </div>
        </li>
        <li className="flex items-center py-2 px-4 hover:bg-purple-900 hover:bg-opacity-50 rounded cursor-pointer">
          <div className="flex items-center justify-between w-full">
            <FontAwesomeIcon
              className="border p-1 w-3 h-3 mr-2 rounded-full"
              icon={faPhone}
            />
            <p onClick={() => navigate("/contact")} className="flex-grow">
              Liên hệ
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Setting;
