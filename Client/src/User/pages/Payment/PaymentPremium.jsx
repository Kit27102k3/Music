import { useState, useEffect } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import logo from "../../../assets/logo-dark.svg";

const formatSidebar =
  "text-muted-foreground w-full block p-4 hover:text-foreground duration-300 cursor-pointer relative";

function PaymentPremium() {
  const currentDate = new Date();
  const { type } = useParams();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [payments, setPayment] = useState({});
  const [account, setAccount] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState({
    name: "12 tháng",
    price: "499.000đ",
    months: 12,
  });

  const storeUser = JSON.parse(localStorage.getItem("account"));
  const userName = storeUser.name || "Người dùng";
  const userId = storeUser.userId;
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  useEffect(() => {
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) {
      setAccount(JSON.parse(storedAccount));
    }
  }, []);
  useEffect(() => {
    const checkUserExists = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/payment/checkUser/${userId}`
        );
        if (response.data.exists) {
          setIsUserRegistered(true);
        } else {
          setIsUserRegistered(false);
        }
      } catch (error) {
        console.log("Error checking user: ", error);
      }
    };

    checkUserExists();
  }, [userId]);

  const handleRegister = async () => {
    if (isChecked) {
      try {
        const newUpgradeDate = new Date(currentDate);
        newUpgradeDate.setMonth(
          newUpgradeDate.getMonth() + selectedPlan.months
        );
        const formattedUpgradeDate = newUpgradeDate.toISOString();
        const response = await axios.post("http://localhost:3000/api/payment", {
          userName,
          userId,
          name: selectedPlan.name,
          price: selectedPlan.price,
          dateNow: currentDate.toISOString(),
          upgrade: formattedUpgradeDate,
          title: type === "plus" ? "PLUS" : "PREMIUM",
        });
        setPayment(response.data);
        console.log(response.data);
        navigate("/vip/upgrade/premium/payment", {
          state: {
            amount: selectedPlan.price,
            name: selectedPlan.name,
          },
        }); // Sử dụng navigate
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [upgradeDate, setUpgradeDate] = useState(
    currentDate.toLocaleDateString()
  );

  const plans = [
    {
      name: "12 tháng",
      price: "499.000đ",
      originalPrice: "588.000đ",
      discount: "15%",
      months: 12,
    },
    {
      name: "6 tháng",
      price: "279.000đ",
      originalPrice: "294.000đ",
      discount: "5%",
      months: 6,
    },
    {
      name: "1 tháng",
      price: "49.000đ",
      months: 1,
    },
    {
      name: "1 tháng Family",
      price: "89.000đ",
      months: 1,
    },
  ];

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
    const newUpgradeDate = new Date(currentDate);
    newUpgradeDate.setMonth(newUpgradeDate.getMonth() + plan.months);
    setUpgradeDate(newUpgradeDate.toLocaleDateString());
  };

  return (
    <div className="bg-gradient-to-r from-[#181818] to-[#BA8B02] min-h-screen">
      <div className="container mx-auto">
        <a href="/vip/upgrade" className={`${formatSidebar}  ml-12`}>
          <img src={logo} alt="ZingMP3" className="w-[140px] h-[70px]" />
        </a>
      </div>
      <div className="text-black px-[200px] py-[50px]">
        <h2 className="text-5xl flex items-center gap-2 font-semibold mb-10 text-yellow-500 ">
          Zing MP3{" "}
          <span className="text-sm bg-yellow-500 p-2 rounded-lg text-white font-bold">
            {type === "plus" ? "PLUS" : "PREMIUM"}
          </span>
        </h2>
        <div className="grid grid-cols-2 text-white">
          <div className="bg-[#1B1E28] p-5 animate-slide-right px-4 rounded-2xl">
            <h3 className="text-[24px] font-bold">Chọn gói nâng cấp</h3>
            {plans.map((plan, index) => (
              <div
                className="mt-6 border mb-8 p-2 px-5 rounded-2xl cursor-pointer"
                key={index}
              >
                <label className="items-center cursor-pointer">
                  <span className="font-bold text-[18px] text-yellow-300">
                    {plan.name}
                  </span>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[24px]">{plan.price}</p>
                    {plan.originalPrice && (
                      <>
                        <span className="line-through text-muted">
                          {plan.originalPrice}
                        </span>
                        <span className="bg-yellow-500 rounded-md px-1 text-[14px]">
                          Tiết kiệm {plan.discount}
                        </span>
                      </>
                    )}
                    <input
                      type="radio"
                      name="subscription"
                      value={plan.name}
                      className="ml-36"
                      onChange={() => handlePlanChange(plan)}
                      checked={selectedPlan.name === plan.name}
                    />
                  </div>
                  <p>
                    Chỉ{" "}
                    {plan.name === "1 tháng"
                      ? "49.000đ/tháng"
                      : "41.000đ/tháng"}
                  </p>
                </label>
              </div>
            ))}
          </div>

          <div className="animate-slide-left">
            <div className="ml-4 bg-[#1B1E28] p-5 px-4 rounded-2xl">
              <p className="mt-2 flex items-center gap-2">
                <img
                  className="w-12 h-12 rounded-full"
                  src={
                    account
                      ? account.picture
                      : "https://via.placeholder.com/150"
                  }
                  alt="User Profile Picture"
                />
                <strong>{userName}</strong>
              </p>
              <div className="border-b mt-5 mb-5 border-b-slate-700"></div>
              <div className="flex flex-col gap-2">
                <p className="flex justify-between items-center">
                  Thời điểm nâng cấp:{" "}
                  <strong>{currentDate.toLocaleDateString()}</strong>
                </p>
                <p className="flex justify-between items-center">
                  Hiệu lực đến: <strong>Khi bạn hủy</strong>
                </p>
                <p className="flex justify-between items-center">
                  Kỳ thanh toán tiếp theo: <strong>{upgradeDate}</strong>
                </p>
              </div>
              <div className="border-b mt-5 mb-5 border-b-slate-700"></div>
              <div className="flex items-center justify-between">
                <p className="font-bold mt-4">
                  Tổng thanh toán: <strong>{selectedPlan.price}</strong>
                </p>
                <button
                  className={`mt-4 p-2 px-4 rounded-lg ${
                    isUserRegistered || !isChecked
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
                  disabled={isUserRegistered || !isChecked}
                  onClick={handleRegister}
                >
                  ĐĂNG KÝ
                </button>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <span className="ml-2">
                  Khi nhấn Thanh toán, bạn đã đồng ý với Chính sách thanh toán
                  của chúng tôi.
                </span>
              </p>
            </div>
            <div className="ml-4 bg-[#1B1E28] p-3 px-5 rounded-2xl mt-3">
              <h3 className="font-semibold text-2xl">Đặc quyền gói PREMIUM</h3>
              <div className="flex flex-col gap-3 mt-2">
                {[
                  "Nghe nhạc Premium",
                  "Nghe nhạc không quảng cáo",
                  "Nghe và tải nhạc Lossless",
                  "Lưu trữ nhạc không giới hạn",
                  "Tính năng nghe nhạc nâng cao",
                  "Mở rộng khả năng Upload",
                ].map((privilege, index) => (
                  <span key={index}>
                    <FontAwesomeIcon
                      className="mr-4 text-yellow-500"
                      icon={faCheck}
                    />
                    <span className="font-medium">{privilege}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPremium;
