import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { handleNumber } from "../../ultis/fn";

function SingerDetail({ isHide }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Theo dõi hover riêng từng nghệ sĩ
  const [followers, setFollowers] = useState([]);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("account"))?.userId;

  useEffect(() => {
    fetchArtistData();
  }, []);

  const fetchArtistData = async () => {
    try {
      setIsLoading(true);
      if (userId) {
        const followRes = await axios.get(
          `http://localhost:3000/api/singer/follower?userId=${userId}`
        );
        setFollowers(followRes.data); 
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickFollower = async (title) => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/follower",
        {
          data: { title, userId },
        }
      );
      toast.success(response.data.message); 
      fetchArtistData(); 
    } catch (error) {
      console.error(error);
      toast.error("Error occurred. Please try again.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!isHide && (
        <div className="flex  items-center justify-between">
          <h3 className="text-2xl uppercase font-bold mb-10">Ca sĩ yêu thích</h3>
          <button
            onClick={() => navigate("/favorite-songs")}
            className="uppercase hover:text-pink-500 text-xs"
          >
            Tất cả
          </button>
        </div>
      )}
      <div className="flex-1 flex flex-col-5 gap-[15px]">
        {followers.length > 0 ? (
          followers.slice(0, 5).map((item, index) => (
            <div
              key={item.id || index}
              className="flex flex-col items-center gap-2"
            >
              <Link
                to={item.link}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative overflow-hidden rounded-full"
              >
                <img
                  src={item.image}
                  alt="singer"
                  className={`cursor-pointer object-contain rounded-full w-40 h-40 transition-transform duration-300 ease-in-out ${
                    hoveredIndex === index
                      ? "animate-scale-up-image"
                      : "opacity-100"
                  }`}
                />
                {hoveredIndex === index && (
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 rounded-full"></div>
                )}
              </Link>
              <Link to="" className="text-sm font-medium hover:underline">
                {item.title || "Unknown"}
              </Link>
              <span className="text-xs opacity-70">
                {handleNumber(item.follower) || 0} quan tâm
              </span>
              <button
                onClick={() => handleClickFollower(item.title)}
                type="button"
                className="bg-pink-500 mt-1 px-4 py-1 text-sm rounded-l-full hover:bg-opacity-70 rounded-r-full flex items-center justify-center gap-1"
              >
                <span>
                  <AiOutlineUserAdd />
                </span>
                <span className="uppercase text-xs">Đã quan tâm</span>
              </button>
            </div>
          ))
        ) : (
          <div className=" text-center w-full text-gray-500">
            Không có ca sĩ yêu thích nào
          </div>
        )}
      </div>
    </div>
  );
}

export default SingerDetail;
