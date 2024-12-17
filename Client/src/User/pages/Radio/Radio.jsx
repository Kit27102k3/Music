import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RadioList = [
  {
    img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/8/3/0/e/830e49ef302bbe4fdfb04c9e26d42fbd.jpg",
    title: "XONE Radio",
    listeners: "29 đang nghe",
  },
  {
    img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/f/d/7/9/fd79808d2180de9a421afa6aff38953e.jpg",
    title: "V-POP",
    listeners: "392 đang nghe",
  },
  {
    img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/e/2/3/5/e235117d191db9f7bbc82a3d31f17e60.jpg",
    title: "Cham",
    listeners: "122 đang nghe",
  },
  {
    img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/4/8/c/e/48cefd41cfc03533d52303190f47e6ef.jpg",
    title: "Bolero",
    listeners: "164 đang nghe",
  },
  {
    img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/d/4/f/f/d4ffcd5734d4dae6266fec08719324f0.jpg",
    title: "US-UK",
    listeners: "80 đang nghe",
  },
  {
    img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/6/8/f/e/68feac6764ce3018854f2a2ca313326d.jpg",
    title: "K-POP",
    listeners: "23 đang nghe",
  },
  {
    img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/e/f/b/0/efb05fb9097a7057aecef6ecb62bff5a.jpg",
    title: "Acoustic",
    listeners: "59 đang nghe",
  },
];

export default function Radio({isHideAll}) {
  const navigate = useNavigate();
  const handleRadio = () => {
    toast.warning("Tính năng đang được phát triển!");
  };
  return (
    <div className="px-[60px] mt-12 text-foreground p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold mb-10">Radio</h1>
        {isHideAll && <button
          onClick={() => navigate("/radio")}
          className="text-xs hover:text-pink-500"
        >
          TẤT CẢ
        </button>}
      </div>
      <div className="grid grid-cols-7 md:grid-cols-3 lg:grid-cols-7 gap-6">
        {RadioList.map((radio, index) => (
          <div
            key={index}
            className="group relative flex flex-col items-center"
          >
            <div className="relative mb-3">
              <img
                className="w-24 h-24 border-red-700 border-2 rounded-full transition-transform duration-300 transform group-hover:scale-110 group-hover:opacity-75"
                src={radio.img}
                alt={radio.title}
              />
              <button className="text-xs bg-red-700 absolute ml-6 -mt-2 px-3 rounded-md">
                LIVE
              </button>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={handleRadio}
                  className="bg-black bg-opacity-50 p-3 w-12 rounded-full"
                >
                  <FontAwesomeIcon icon={faPlay} className="text-white" />
                </button>
              </div>
            </div>
            <span className="text-center font-bold mt-2">{radio.title}</span>
            <span className="text-xs text-white">{radio.listeners}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
