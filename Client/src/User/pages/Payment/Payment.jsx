import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo-DH-Nam-Can-Tho-NCTU.webp";
import Mp3 from "../../../assets/Mp3.png";

const formatSidebar =
  "text-muted-foreground w-full block p-4 hover:text-foreground duration-300 cursor-pointer relative";

function Payment() {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-white via-lightblue-400 to-blue-700 min-h-screen">
      <div className="text-black p-8 mx-auto container">
        <div className="">
          <a href="/" className={`${formatSidebar} cursor-pointer ml-12`}>
            <span className={`${formatSidebar} cursor-text flex relative`}>
              <img
                src={logo}
                alt="ZingMP3"
                className="w-[100px] h-[100px] relative z-10"
              />
              <img
                src={Mp3}
                alt=""
                width={40}
                className="h-12 absolute bottom-[30px] right-[86%] z-0"
              />
            </span>
          </a>
        </div>
        <h1 className="text-4xl font-sans font-bold text-foreground mb-6 ml-16 animate-slide-left">
          Âm nhạc
          <p>không giới hạn</p>
        </h1>
        <p className="text-muted-foreground mb-8 ml-16 animate-slide-left">
          Nâng cấp tài khoản để trải nghiệm các tính năng và nội dung cao cấp
        </p>
        <div className="flex justify-center space-x-4 h-full w-full ">
          <div className="bg-purple-600 text-white p-6 rounded-lg shadow-lg w-[504px] h-[636px] animate-slide-right">
            <h2 className="text-2xl font-semibold mb-2 text-[34px]">
              Zing MP3{" "}
              <span className="text-sm bg-white p-1 rounded-lg text-purple-900 font-bold">
                PLUS
              </span>
            </h2>
            <p className="text-sm">
              Nghe nhạc chất lượng cao nhất, không quảng cáo
            </p>
            <p className="text-3xl mb-4 font-bold mt-5">Chỉ từ 13,000đ/tháng</p>
            <button
              onClick={() => navigate("/vip/upgrade/plus")}
              className="bg-purple-800 w-[90%] ml-5 font-bold rounded-r-full mt-2 rounded-l-full py-2 px-4 rounded hover:animate-scale-up-image"
            >
              ĐĂNG KÝ GÓI
            </button>
            <div className="border mt-10 border-gray-500"></div>
            <h3 className="mt-6 font-bold">Đặc quyền đặc biệt:</h3>
            <div className="flex flex-col gap-3 mt-2">
              <span>
                <FontAwesomeIcon
                  className="mr-4 text-purple-950"
                  icon={faCheck}
                />
                <span className="font-medium">Nghe nhạc không quảng cáo</span>
              </span>

              <span>
                <FontAwesomeIcon
                  className="mr-4 text-purple-950"
                  icon={faCheck}
                />
                <span className="font-medium">Nghe và tải nhạc Lossless</span>
              </span>
              <span>
                <FontAwesomeIcon
                  className="mr-4 text-purple-950"
                  icon={faCheck}
                />
                <span className="font-medium">Lưu trữ nhạc không giới hạn</span>
              </span>
              <span>
                <FontAwesomeIcon
                  className="mr-4 text-purple-950"
                  icon={faCheck}
                />
                <span className="font-medium">
                  Tính năng nghe nhạc nâng cao
                </span>
              </span>
              <span>
                <FontAwesomeIcon
                  className="mr-4 text-purple-950"
                  icon={faCheck}
                />
                <span className="font-medium">Mở rộng khả năng Upload</span>
              </span>
            </div>
          </div>

          <div
            style={{
              background:
                "radial-gradient(148.32% 100% at 0% 0%, #795B0E 0%, rgba(121, 91, 14, 0.90) 100%)",
            }}
            className="text-white p-6 rounded-lg shadow-lg w-[504px] h-[636px] animate-slide-left"
          >
            <h2 className="text-2xl font-semibold mb-2 text-[34px]">
              Zing MP3{" "}
              <span className="text-sm bg-white p-1 rounded-lg text-yellow-900 font-bold">
                PREMIUM
              </span>
            </h2>
            <p className="text-sm">
              Toàn bộ đặc quyền Plus cùng kho nhạc Premium
            </p>
            <p className="text-3xl mb-4 font-bold mt-5">Chỉ từ 41,000đ/tháng</p>
            <button
              onClick={() => navigate("/vip/upgrade/premium")}
              className="bg-yellow-500 w-[90%] ml-5 font-bold rounded-r-full mt-2 rounded-l-full py-2 px-4 rounded hover:animate-scale-up-image"
            >
              ĐĂNG KÝ GÓI
            </button>
            <div className="border mt-10 border-gray-500"></div>
            <h3 className="mt-6 font-bold">Đặc quyền đặc biệt:</h3>
            <div className="flex flex-col gap-3 mt-2">
              <span>
                <FontAwesomeIcon
                  className="mr-4 text-yellow-500"
                  icon={faCheck}
                />
                <span className="font-medium">Nghe nhạc Premium</span>
              </span>

              <span>
                <FontAwesomeIcon
                  className="mr-4 text-yellow-500"
                  icon={faCheck}
                />
                <span className="font-medium">Nghe nhạc không quảng cáo</span>
              </span>
              <span>
                <FontAwesomeIcon
                  className="mr-4 text-yellow-500"
                  icon={faCheck}
                />
                <span className="font-medium">Nghe và tải nhạc Lossless</span>
              </span>
              <span>
                <FontAwesomeIcon
                  className="mr-4 text-yellow-500"
                  icon={faCheck}
                />
                <span className="font-medium">Lưu trữ nhạc không giới hạn</span>
              </span>
              <span>
                <FontAwesomeIcon
                  className="mr-4 text-yellow-500"
                  icon={faCheck}
                />
                <span className="font-medium">
                  Tính năng nghe nhạc nâng cao
                </span>
              </span>
              <span>
                <FontAwesomeIcon
                  className="mr-4 text-yellow-500"
                  icon={faCheck}
                />
                <span className="font-medium">Mở rộng khả năng Upload</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
