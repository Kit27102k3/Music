import { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo-dark.svg";
import { toast } from "react-toastify";

const formatSidebar =
  "text-muted-foreground w-full block p-4 hover:text-foreground duration-300 cursor-pointer relative";

export default function Login() {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const emailAdmin = import.meta.env.VITE_EMAIL_ADMIN;
  const nameAdmin = import.meta.env.VITE_NAME_ADMIN;

  useEffect(() => {
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) {
      setAccount(JSON.parse(storedAccount));
      toast.warning("Bạn đã đăng nhập. Vui lòng thử lại!");
      navigate("/");
    }
  }, [navigate]);

  const handleGoogleLoginSuccess = async (res) => {
    const { credential } = res;
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken: credential }),
      });
        if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Google đăng nhập không thành công");
      }
        const user = await response.json();
        // Lưu thông tin vào localStorage
      localStorage.setItem("account", JSON.stringify(user));
      localStorage.setItem("isLogin", "true");
        // Xử lý sau khi đăng nhập thành công
      handleLoginSuccess(user);
    } catch (error) {
      console.error("Lỗi đăng nhập của Google:", error.message);
      toast.error("Google đăng nhập không thành công. Hãy thử lại.");
    }
  };
  
  // Xử lý đăng nhập thành công bằng Facebook
  const handleFacebookLogin = () => {
    FB.login(
      (response) => {
        if (response.authResponse) {
          const { accessToken, userID } = response.authResponse;
          loginWithFacebook(accessToken, userID);
        } else {
          console.error(
            "Người dùng đã hủy đăng nhập Facebook hoặc không được ủy quyền đầy đủ."
          );
          toast.error("Đăng nhập Facebook bị hủy.");
        }
      },
      { scope: "email,public_profile" }
    );
  };

  // Đăng nhập với Facebook
  const loginWithFacebook = async (accessToken, userID) => {
    try {
      if (!accessToken || !userID) {
        throw new Error("accessToken hoặc userID không hợp lệ");
      }
      const response = await fetch("http://localhost:3000/login-facebook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken, userID }),
      });

      if (!response.ok) {
        throw new Error("Đăng nhập Facebook thất bại");
      }

      const user = await response.json();
      toast.success("Đăng nhập thành công !");
      localStorage.setItem("account", JSON.stringify(user));
      localStorage.setItem("isLogin", "true");
      handleLoginSuccess(user);
    } catch (error) {
      console.error("Lỗi trong quá trình đăng nhập:", error.message);
      toast.error("Đăng nhập Facebook thất bại.");
    }
  };

  const handleLoginSuccess = (user) => {
    setAccount(user);
    if (user.email === emailAdmin && user.name === nameAdmin) {
      navigate("/admin/statistical");
    } else {
      navigate("/");
    }
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("account");
    localStorage.removeItem("isLogin");
    setAccount(null);
    navigate("/login");
  };

  return (
    <div className="flex md:flex-row h-screen bg-gradient-to-r from-blue-400 to-purple-500 rounded-r-full">
      <div className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center rounded-r-full justify-center">
        <div className="text-white text-4xl font-bold">
          WELCOME TO ZING
          <p className="text-sm mt-2">
            Đăng ký với thông tin cá nhân của bạn để sử dụng tất cả các tính
            năng của trang web.
          </p>
        </div>
      </div>
      <div className="flex-1 bg-blue-200 p-8 flex items-center justify-center">
        <div className="w-full text-black max-w-md">
          <span className="justify-center flex cursor-text text-xl mb-4">
            <a className={`${formatSidebar} cursor-pointer`}>
              <img
                src={logo}
                alt="DNCMP3"
                className="w-[240px] h-[100px] ml-20"
              />
            </a>
          </span>
          <p className="text-zinc-600 mb-6 text-center">
            Sign Into Your Account
          </p>

          <div className="flex mb-4 justify-center gap-5">
            <button
              onClick={handleFacebookLogin}
              className="bg-blue-600 w-[210px] text-white p-2 rounded-sm"
            >
              Đăng nhập bằng Facebook
            </button>
          </div>
          <div className="justify-center flex">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() =>
                toast.error("Google login failed. Please try again.")
              }
              useOneTap
            />
          </div>
        </div>
      </div>
    </div>
  );
}
