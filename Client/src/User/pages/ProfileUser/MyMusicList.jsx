import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import * as actions from "../../Store/Action";
import moment from "moment";
import { Scrollbars } from "react-custom-scrollbars-2";

export default function MyMusicList() {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [songs, setSongs] = useState([]);
  const [sliders, setSliders] = useState([]);
  const dispatch = useDispatch();

  const handleSongClick = (sid) => {
    dispatch(actions.setCurSongId(sid));
    dispatch(actions.play(true));
  };

  useEffect(() => {
    const fetchSongs = async () => {
      const storedAccount = JSON.parse(localStorage.getItem("account"));
      if (!storedAccount || !storedAccount.userId) {
        setSongs([]);
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:3000/api/song/download?userId=${storedAccount.userId}`
        );
        const songsData = response.data.songs || [];
        const slidersData = songsData.map((song) => song.thumbnail);

        // Sắp xếp bài hát theo thời gian tải lên (createdAt)
        const sortedSongs = songsData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setSliders(slidersData);
        setSongs(sortedSongs);

        if (slidersData.length > 0) {
          setSliderIndex(0);
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchSongs();
    const intervalId = setInterval(() => {
      setSliderIndex((prevIndex) => (prevIndex + 1) % sliders.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [sliders.length]);

  const getImageClass = (index) => {
    if (index === sliderIndex) return "option-all__song-slider-img-first";
    if (index === (sliderIndex + 1) % sliders.length)
      return "option-all__song-slider-img-second";
    return "option-all__song-slider-img-third";
  };

  return (
    <div className="rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl uppercase font-bold mb-10">Bài Hát Tải Về</h2>
      </div>

      <div className="flex">
        <div className="w-3/12 pr-4">
          <div className="option-all__song-slider ">
            {sliders.length > 0 ? (
              sliders.map((slider, index) => (
                <img
                  key={index}
                  src={slider}
                  alt={`Slider image ${index}`}
                  className={`option-all__song-slider-img ${getImageClass(
                    index
                  )}`}
                />
              ))
            ) : (
              <div className="text-center"></div>
            )}
          </div>
        </div>
        <div className="w-9/12">
          <Scrollbars
            autoHide
            style={{
              width: "100%",
              height: songs.length === 0 ? "30px" : "100%",
            }}
          >
            {songs.length === 0 ? (
              <div className="text-center mr-40 text-gray-500">
                Không có bài hát nào được tải về
              </div>
            ) : (
              <ul className="space-y-2 shadow-2xl">
                {songs.map((song) => (
                  <li
                    key={song.encodeId}
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
                          {song.artistsNames.slice(", ")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-primary hover:text-primary/80 mr-4">
                        <FontAwesomeIcon icon={faHeart} />
                      </button>
                      <span className="text-xs">
                        {moment.utc(song.duration * 1000).format("mm:ss")}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Scrollbars>
        </div>
      </div>
    </div>
  );
}
