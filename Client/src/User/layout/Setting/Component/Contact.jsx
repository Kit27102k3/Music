import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    problem: "",
    content: "",
    userName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("account"));
    const userId = storedUser?.userId;

    if (!userId) {
      toast.error("Vui lòng đăng nhập trước!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/contact", {
        ...formData,
        userId,
      });
      toast.success(response.data.message);
      setFormData({
        problem: "",
        content: "",
        userName: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      toast.warning("Gửi phản hồi thất bại! Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="flex flex-col text-white items-center p-6 bg-background">
      <ToastContainer />
      <img
        src="https://static-zmp3.zmdcdn.me/skins/zmp3-v5.1/images/group-279.svg"
        alt="Contact Us"
      />
      <form className="mt-6 w-full max-w-md space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <h1 className="text-2xl text-left font-bold">LIÊN HỆ VỚI CHÚNG TÔI</h1>
          <p className="mt-2 text-muted-foreground mb-2">
            Chúng tôi luôn ghi nhận các đóng góp ý kiến của bạn để cải tiến sản
            phẩm Zing MP3 ngày một hoàn thiện và hữu ích hơn. Đừng ngại chia sẻ
            ý tưởng cho chúng tôi.
          </p>
          <span className="text-muted font-bold">
            Chọn vấn đề bạn đang cần hỗ trợ: *
          </span>
          <select
            name="problem"
            value={formData.problem}
            onChange={handleChange}
            className="mt-1 block w-full text-black border border-border rounded-md p-2"
            required
          >
            <option value="">Chọn vấn đề cần liên hệ</option>
            <option value="Báo lỗi">Báo lỗi</option>
            <option value="Gợi ý sản phẩm">Gợi ý sản phẩm</option>
            <option value="Gia hạn, đăng ký tài khoản PLUS/PREMIUM">
              Gia hạn, đăng ký tài khoản PLUS/PREMIUM
            </option>
            <option value="Phát hành nội dung">Phát hành nội dung</option>
            <option value="Hợp tác nội dung">Hợp tác nội dung</option>
            <option value="Tài khoản người dùng">Tài khoản người dùng</option>
            <option value="Vấn đề khác">Vấn đề khác</option>
          </select>
        </label>

        <label className="block ">
          <span className="text-muted font-bold">Nội dung: *</span>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="mt-1 block w-full text-black border border-border rounded-md p-2"
            rows="4"
            placeholder="Nhập nội dung cần giúp đỡ"
            required
          ></textarea>
        </label>

        <label className="block">
          <span className="text-muted font-bold">Họ tên: *</span>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="mt-1 block w-full border text-black border-border rounded-md p-2"
            placeholder="Nhập họ tên"
            required
          />
        </label>

        <label className="block">
          <span className="text-muted font-bold">Email: *</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border text-black border-border rounded-md p-2"
            placeholder="Nhập email"
            required
          />
        </label>

        <label className="block">
          <span className="text-muted font-bold">Số điện thoại: *</span>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full border text-black border-border rounded-md p-2"
            placeholder="Nhập số điện thoại"
            required
          />
        </label>

        <button
          type="submit"
          className="w-2/4 bg-purple-700 text-white hover:bg-purple-900 hover:bg-opacity-50 p-2 rounded-md"
        >
          Gửi
        </button>
      </form>
    </div>
  );
}
