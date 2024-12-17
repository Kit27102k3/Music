import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import * as actions from "../../Store/Action";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../../../index.css';

function FavoriteSong() {
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notify = (message) => {
    toast(message, { type: "info" });
  };

  const handleSongClick = (sid) => {
    dispatch(actions.setCurSongId(sid));
    dispatch(actions.play(true));
  };

  const addFavoriteSong = async (song) => {
    const storedAccount = JSON.parse(localStorage.getItem("account"));
    if (!storedAccount || !storedAccount.userId) return;

    try {
      await axios.post("http://localhost:3000/api/song/favorite", {
        ...song,
        userId: storedAccount.userId,
        userName: storedAccount.userName,
      });
      setErrorMessage("");
      fetchSongs();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        notify("Bài hát đã có trong danh sách yêu thích!");
      } else {
        console.error("Error adding favorite song:", error);
        setErrorMessage("Đã xảy ra lỗi khi thêm bài hát vào yêu thích.");
      }
    }
  };

  const deleteFavoriteSong = async (song) => {
    const storedAccount = JSON.parse(localStorage.getItem("account"));
    if (!storedAccount || !storedAccount.userId) return;

    try {
      await axios.delete("http://localhost:3000/api/song/favorite", {
        data: { encodeId: song.encodeId, userId: storedAccount.userId },
      });
      toast.success("Bài hát đã được xóa khỏi danh sách yêu thích.");
      fetchSongs();
    } catch (error) {
      console.error("Lỗi khi xóa bài hát yêu thích:", error);
      setErrorMessage(
        "Đã xảy ra lỗi khi xóa bài hát khỏi danh sách yêu thích."
      );
    }
  };

  const fetchSongs = async () => {
    const storedAccount = JSON.parse(localStorage.getItem("account"));
    if (!storedAccount || !storedAccount.userId) {
      setFavoriteSongs([]);
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:3000/api/song/favorite?userId=${storedAccount.userId}`
      );
      const sortedSongs = response.data.songs || [];
      sortedSongs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setFavoriteSongs(sortedSongs);
    } catch (error) {
      console.error("Error fetching songs:", error);
      setErrorMessage("Đã xảy ra lỗi khi tải danh sách bài hát.");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div className="rounded-lg">
      <ToastContainer />
      <div className="flex items-center justify-between ">
        <h2 className="text-2xl uppercase font-bold mb-5">
          Bài Hát Yêu Thích
        </h2>
        <button
          className="uppercase hover:text-pink-500 text-xs"
          onClick={() => navigate("/favorite-songs")}
        >
          Tất cả
        </button>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
      <div className="flex flex-wrap -m-2">
        {favoriteSongs.length === 0 ? (
          <div className="text-center w-full p-4 text-gray-500">
            Không có bài hát yêu thích nào
          </div>
        ) : (
          favoriteSongs?.slice(0, 6)?.map((song) => (
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
                      e.stopPropagation(); // Ngăn chặn sự kiện click trên cả song
                      deleteFavoriteSong(song);
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
          ))
        )}
      </div>
    </div>
  );
}

export default FavoriteSong;
