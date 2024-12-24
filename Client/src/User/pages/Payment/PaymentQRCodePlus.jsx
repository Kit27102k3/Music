import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCode } from "react-qrcode-logo";
import { toast } from "react-toastify";

function PaymentQRCodePlus() {
  const location = useLocation();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);

  const recipientName = "Nguyễn Trọng Khiêm";
  const accountNumber = "070122118299";
  const bankName = "Sacombank";

  const amount = location.state?.amount || "0";
  const name = location.state?.name || "Know";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  const handleCancel = () => {
    setIsModalOpen(true);
  };

  const confirmCancel = async () => {
    if (!storeUser.userId) {
      toast.warning("Không tìm thấy thông tin người dùng.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/payments/user/${storeUser.userId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        toast.success("Giao dịch đã bị hủy thành công.");
        navigate("/vip/upgrade/plus");
      } else {
        const error = await response.json();
        toast.warning(`Hủy giao dịch thất bại: ${error.message}`);
      }
    } catch (error) {
      console.error("Error deleting payment:", error);
      toast.warning("Có lỗi xảy ra khi hủy giao dịch.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const calculateExpirationDate = (name) => {
    const currentDate = new Date();
    const expirationDate = new Date(currentDate);
    expirationDate.setMonth(currentDate.getMonth() + parseInt(name));
    return expirationDate.toLocaleDateString();
  };

  const expirationDate = calculateExpirationDate(name);
  const qrContent = `Thông tin người nhận:
    Tên: ${recipientName}
    STK: ${accountNumber}
    Ngân hàng: ${bankName}
    Số tiền: ${amount}
  `.trim();

  useEffect(() => {
    if (timeLeft <= 0) {
      confirmCancel();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, navigate]);

  const storeUser = JSON.parse(localStorage.getItem("account"));
  const userName = storeUser?.name || "Người dùng";
  useEffect(() => {
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) {
      setAccount(JSON.parse(storedAccount));
    }
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return (
    <div className="bg-gradient-to-r from-white via-lightblue-400 to-blue-700 h-screen">
      <div className="text-black container mx-auto">
        <div className="grid grid-cols-2 p-12">
          <div className="flex flex-col gap-3 items-center">
            <h2>Quét mã QR Thanh Toán</h2>
            <QRCode size={200} value={qrContent} />
            <p>
              Mã QR chỉ có hiệu lực cho lần thanh toán này. Hết hạn sau:{" "}
              <span className="font-bold">{formattedTime}</span>
            </p>
          </div>
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="font-bold text-xl">Chi tiết giao dịch</h2>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-muted">Tài khoản mua dịch vụ</span>
              <p className="mt-2 flex items-center gap-2">
                <img
                  className="w-10 h-10 rounded-full"
                  src={
                    account
                      ? account.picture
                      : "https://via.placeholder.com/150"
                  }
                  alt="User Profile Picture"
                />
                <strong>{userName}</strong>
              </p>
            </div>
            <div className="mt-6">
              <span className="text-muted font-bold text-lg">Sản phẩm</span>
              <div className="mt-1 flex justify-between items-center">
                <p>DNC MP3 PLUS - {name}</p>
                <p className="block text-primary font-bold">{amount}</p>
              </div>
              <p className="text-muted text-sm mt-1">
                Hạn dùng: {expirationDate}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-muted font-bold text-lg">Tổng tiền</span>
              <div className="mt-1 ">
                <p className="font-bold text-primary text-right text-2xl">
                  {amount}
                </p>
                <p className="block text-muted text-sm">
                  Đã bao gồm VAT và phí liên quan
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="agreement"
                className="mr-2"
                checked
                disabled
              />
              <label htmlFor="agreement" className="text-sm text-muted">
                Khi tiếp tục thanh toán, bạn đồng ý với{" "}
                <a href="#" className="text-primary text-blue-500">
                  thỏa thuận sử dụng dịch vụ
                </a>
              </label>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                className="bg-muted text-muted-foreground hover:bg-muted/80 py-2 px-4 rounded-lg"
                onClick={handleCancel}
              >
                Hủy giao dịch
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
            <h3 className="font-bold text-xl">Hủy giao dịch</h3>
            <div className="border-b border-slate-300 mb-2 mt-2"></div>
            <h3 className="text-xl font-semibold ">
              Bạn có chắc chắn muốn hủy giao dịch?
            </h3>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
                onClick={closeModal}
              >
                Hủy
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
                onClick={confirmCancel}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentQRCodePlus;
