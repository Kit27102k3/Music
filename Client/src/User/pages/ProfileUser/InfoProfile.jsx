import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { googleLogout } from "@react-oauth/google";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../../index.css";
import { useNavigate } from "react-router-dom";

export default function InfoProfile() {
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [userTitle, setUserTitle] = useState("BASIC");
  const storeUser = JSON.parse(localStorage.getItem("account"));
  const userName = storeUser?.name || "Người dùng";
  const userId = storeUser?.userId;

  useEffect(() => {
    const checkUserExists = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/payment/checkUser/${userId}`
        );
        if (response.data.payment) {
          setUserTitle(response.data.payment.title || "BASIC");
        } else {
          setUserTitle("BASIC");
        }
      } catch (error) {
        console.log("Error checking user: ", error);
      }
    };

    checkUserExists();
  }, [userId]);

  useEffect(() => {
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) {
      setAccount(JSON.parse(storedAccount));
    }
  }, []);

  const handleLogin = (path) => {
    setTimeout(() => {
      window.location.href = path;
    });
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("account");
    localStorage.removeItem("isLogin");
    setAccount(null);
    window.location.reload();
  };

  const getTitleClass = () => {
    switch (userTitle) {
      case "PREMIUM":
        return "bg-yellow-500 text-white";
      case "PLUS":
        return "bg-blue-700 text-white";
      default:
        return "bg-slate-400 text-black";
    }
  };

  return (
    <div className="bg-purple-600 scrollable w-[300px] p-4 rounded-lg shadow-lg h-96 overflow-y-auto">
      <div className="flex items-center mb-4">
        {account ? (
          <>
            <img
              src={account.picture}
              alt="User Avatar"
              className="rounded-full mr-2 w-16 h-16"
            />
            <div>
              <h2 className="text-lg font-semibold">{account.name}</h2>
              <span
                className={`text-sm font-bold px-3 rounded-lg ${getTitleClass()}`}
              >
                {userTitle}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-full mr-2 w-16 h-16 bg-gray-300" />
            <div>
              <h2 className="text-lg font-semibold">
                Đăng nhập để xem thông tin
              </h2>
            </div>
          </>
        )}
      </div>
      <button
        onClick={() => navigate("/vip/upgrade")}
        className="bg-purple-400 rounded-full text-secondary-foreground w-full p-2 mb-4"
      >
        Nâng cấp tài khoản
      </button>
      <h3 className="text-lg font-semibold mb-2">Nâng cấp gói</h3>
      <div className="mb-4 text-xs">
        <h4 className="text-purple-800 text-2xl ml-4 font-bold mb-1">
          DNC MP3{" "}
          <span className="font-bold bg-purple-400 px-2 rounded-lg">PLUS</span>
        </h4>
        <p className="text-muted-foreground ml-4">Chi từ 13,000đ/tháng</p>
        <p className="text-muted-foreground ml-4">
          Nghe nhạc với chất lượng cao nhất, không quảng cáo
        </p>
        <button
          onClick={() => navigate("/vip/upgrade/plus")}
          className="bg-purple-500 font-bold mt-2 text-primary-foreground w-full p-2 rounded-lg"
        >
          Tìm hiểu thêm
        </button>
      </div>
      <div className="text-xs">
        <h4 className="text-yellow-300 text-2xl ml-4 font-bold mb-1">
          DNC MP3{" "}
          <span className="font-bold bg-yellow-500 px-1 rounded-lg text-white">
            PREMIUM
          </span>
        </h4>
        <p className="text-muted-foreground ml-4">Chi từ 41,000đ/tháng</p>
        <p className="text-muted-foreground ml-4">
          Toàn bộ đặc quyền Plus cùng kho nhạc Premium
        </p>
        <button
          style={{
            backgroundColor: "yellow",
          }}
          className="mt-2 text-black font-bold w-full p-2 rounded-lg"
          onClick={() => navigate("/vip/upgrade/premium")}
        >
          Tìm hiểu thêm
        </button>
      </div>
      <div className="border-b border-white mb-3 mt-3"></div>
      <div className="flex bg-black hover:bg-purple-900 hover:bg-opacity-50 text-white mt-2 text-left gap-3 font-bold w-full p-3 rounded-lg items-center">
        <FontAwesomeIcon className="w-4 h-4" icon={faRightFromBracket} />
        {account ? (
          <button className="text-sm cursor-pointer" onClick={handleLogout}>
            Đăng xuất
          </button>
        ) : (
          <button
            onClick={() => {
              handleLogin("/login");
            }}
          >
            Đăng nhập
          </button>
        )}
      </div>
    </div>
  );
}
