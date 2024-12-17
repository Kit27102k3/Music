import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import * as actions from "../../Store/Action";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SectionItem from "../../components/SectionItem";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useFavoritePlaylists } from "../../ultis/fn";

function FavoriteSong() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [favoriteSingers, setFavoriteSingers] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeSection, setActiveSection] = useState("songs");
  const { favoritePlaylists } = useFavoritePlaylists();

  const storedAccount = JSON.parse(localStorage.getItem("account"));
  const userId = storedAccount?.userId;

  const handleSongClick = (sid) => {
    dispatch(actions.setCurSongId(sid));
    dispatch(actions.play(true));
  };

  const handleItemClick = (type, title, pid) => {
    const formattedTitle = title.replace(/\s+/g, "-");
    if (type === "playlist") {
      navigate(`/playlist/${formattedTitle}/${pid}`);
    } else if (type === "album") {
      navigate(`/album/${formattedTitle}/${pid}`);
    }
  };

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            `http://localhost:3000/api/song/favorite?userId=${userId}`
          );
          setFavoriteSongs(response.data.songs);
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchSongs();
  }, [userId]);

  useEffect(() => {
    fetchFavoriteSingers();
  }, []);

  const fetchFavoriteSingers = async () => {
    try {
      if (userId) {
        const response = await axios.get(
          `http://localhost:3000/api/singer/follower?userId=${userId}`
        );
        setFavoriteSingers(response.data);
      }
    } catch (error) {
      console.error("Error fetching favorite singers:", error);
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
      fetchFavoriteSingers();
    } catch (error) {
      console.error(error);
      toast.error("Error occurred. Please try again.");
    }
  };

  return (
    <div className="px-[60px] mt-12 rounded-lg">
      <ToastContainer />
      <div className="flex items-center gap-5 mb-4">
        <button
          onClick={() => setActiveSection("songs")}
          className={`text-2xl font-bold uppercase ${
            activeSection === "songs" ? "border-b-2 border-primary" : ""
          }`}
        >
          Bài Hát Yêu Thích
        </button>
        <span className="border-r-2 border h-7"></span>
        <button
          onClick={() => setActiveSection("playlists")}
          className={`text-2xl font-bold uppercase ${
            activeSection === "playlists" ? "border-b-2 border-primary" : ""
          }`}
        >
          PlayList Yêu Thích
        </button>
        <span className="border-r-2 border h-7"></span>
        <button
          onClick={() => setActiveSection("singers")}
          className={`text-2xl font-bold uppercase ${
            activeSection === "singers" ? "border-b-2 border-primary" : ""
          }`}
        >
          Ca sĩ Yêu Thích
        </button>
      </div>

      {activeSection === "songs" && (
        <div className="flex flex-wrap -m-2">
          {favoriteSongs.map((song) => (
            <div key={song.encodeId} className="p-2 w-1/2">
              <div
                onClick={() => handleSongClick(song.encodeId)}
                className="flex items-center shadow-md justify-between p-2 bg-muted cursor-pointer hover:bg-purple-900 hover:bg-opacity-50"
              >
                <div className="flex items-center space-x-2">
                  <img
                    src={song.thumbnail}
                    alt={song.title}
                    className="w-10 h-10 rounded"
                  />
                  <div>
                    <p className="font-semibold">{song.title}</p>
                    <p className="text-xs">
                      {song.artistsNames.join(", ").slice(0, 35)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="text-primary hover:text-primary/80 mr-4 text-pink-500"
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền
                    }}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                  <span className="text-xs">
                    {moment.utc(song.duration * 1000).format("mm:ss")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSection === "playlists" && (
        <div className="grid grid-cols-4">
          {favoritePlaylists.map((playlist) => (
            <div
              key={playlist.encodeId}
              className="p-4 rounded-lg"
              onClick={() =>
                handleItemClick("playlist", playlist.title, playlist.encodeId)
              }
            >
              <SectionItem
                thumbnailM={playlist.thumbnailM}
                title={playlist.title}
                sortDescription={playlist.sortDescription}
                sectionData={playlist}
              />
            </div>
          ))}
        </div>
      )}

      {activeSection === "singers" && (
        <div className="grid grid-cols-5 gap-4">
          {favoriteSingers.length > 0 ? (
            favoriteSingers.map((singer, index) => (
              <div
                key={singer.id || index}
                className="flex flex-col items-center gap-2"
              >
                <Link
                  to={singer.link}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative overflow-hidden rounded-full"
                >
                  <img
                    src={singer.image}
                    alt={singer.title}
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
                <Link
                  to={singer.link}
                  className="text-sm font-medium hover:underline"
                >
                  {singer.title || "Unknown"}
                </Link>
                <span className="text-xs opacity-70">
                  {singer.follower.toLocaleString() || 0} quan tâm
                </span>
                <button
                  onClick={() => handleClickFollower(singer.title)}
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
            <div>Không có dữ liệu</div>
          )}
        </div>
      )}
    </div>
  );
}

export default FavoriteSong;
