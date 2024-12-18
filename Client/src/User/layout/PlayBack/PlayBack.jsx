import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as apis from "../../../apis";
import icons from "../../ultis/icons";
import * as actions from "../../Store/Action";
import moment from "moment";
import player from "../../../assets/player.png";
import { toast } from "react-toastify";
import LoadingSong from "../../components/Loaded-Spinner/LoadingSong";

const {
  AiOutlineHeart,
  BsMusicNoteList,
  BsThreeDots,
  MdSkipNext,
  MdSkipPrevious,
  CiRepeat,
  BsPauseFill,
  BsFillPlayFill,
  CiShuffle,
  TbRepeatOnce,
  SlVolumeOff,
  SlVolume1,
  SlVolume2,
} = icons;
var intervalId;

function PlayBack({ setIsShowRightSidebar }) {
  const dispatch = useDispatch();
  const { curSongId, isPlaying, songs } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [volume, setVolume] = useState(100);
  const [curSeconds, setCurSeconds] = useState(0);
  const [isLoadedSource, setIsLoadedSource] = useState(true);

  const audioRef = useRef(new Audio());
  const thumbRef = useRef();
  const trackRef = useRef();

  useEffect(() => {
    const fetchDetailSong = async () => {
      audioRef.current.pause();
      setIsLoadedSource(false);
      audioRef.current.src = "";

      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);
      // console.log(res1.data.data);
      setIsLoadedSource(true);
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data);
        dispatch(actions.setCurSongData(res1.data.data));
      }

      if (res2.data.err === 0) {
        audioRef.current.src = res2.data.data["128"];
        if (isPlaying) {
          audioRef.current.play();
        }
      } else {
        audioRef.current.pause();
        dispatch(actions.play(false));
        toast.warning(res2.data.msg);
        setCurSeconds(0);
        thumbRef.current.style.cssText = `right: 100%`;
      }
    };
    fetchDetailSong();
    return () => {
      audioRef.current.pause();
      clearInterval(intervalId);
    };
  }, [curSongId]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audioRef.current.pause();
    if (isPlaying && thumbRef.current) {
      audioRef.current.play();
      intervalId = setInterval(() => {
        let percent =
          Math.round(
            (audioRef.current.currentTime * 10000) / songInfo?.duration
          ) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurSeconds(Math.round(audioRef.current.currentTime));
      }, 50);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, songInfo?.duration]);

  useEffect(() => {
    const handleEnded = () => {
      if (isShuffle) {
        handleShuffle();
      } else if (repeatMode === 1) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        handleNextSong();
      }
    };
    audioRef.current.addEventListener("ended", handleEnded);
    return () => audioRef.current.removeEventListener("ended", handleEnded);
  }, [isShuffle, repeatMode]);

  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
      dispatch(actions.play(false));
    } else {
      audioRef.current.play();
      dispatch(actions.play(true));
    }
  };

  const handleClickProgressbar = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    const percent =
      Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) /
      100;
    thumbRef.current.style.cssText = `right: ${100 - percent}%`;
    audioRef.current.currentTime = (percent * songInfo.duration) / 100;
    setCurSeconds(Math.round((percent * songInfo.duration) / 100));
  };

  const handleNextSong = () => {
    if (songs) {
      const currentSongIndex = songs.findIndex(
        (item) => item.encodeId === curSongId
      );
      dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handlePrevSong = () => {
    if (songs) {
      const currentSongIndex = songs.findIndex(
        (item) => item.encodeId === curSongId
      );
      dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handleShuffle = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * songs.length);
    } while (songs[randomIndex].encodeId === curSongId);
    dispatch(actions.setCurSongId(songs[randomIndex].encodeId));
    dispatch(actions.play(true));
  };

  return (
    <div className="px-5 relative h-full flex text-white">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={player}
        alt="Player Background"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10 rounded-lg"></div>
      <div className="w-[30%] flex-none z-50 flex items-center gap-3 p-4">
        <img
          src={songInfo?.thumbnail}
          alt="thumbnail"
          className="w-16 h-16 object-cover border rounded-md"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-sm">{songInfo?.title}</span>
          <span className="text-gray-300 text-xs">
            {songInfo?.artistsNames}
          </span>
        </div>
        <div className="flex gap-4 pl-2">
          <span className="cursor-pointer">
            <AiOutlineHeart size={16} />
          </span>
          <span className="cursor-pointer">
            <BsThreeDots size={16} />
          </span>
        </div>
      </div>

      <div className="w-[40%] flex-none flex-col z-50 flex items-center justify-center gap-4 py-2">
        <div className="flex gap-8 justify-center items-center">
          <span
            onClick={() => setIsShuffle((prev) => !prev)}
            title="Bật phát ngẫu nhiên"
            className={`cursor-pointer ${isShuffle && "text-pink-600"}`}
          >
            <CiShuffle size={24} />
          </span>
          <span
            onClick={handlePrevSong}
            className={`${!songs ? "text-gray-500 " : "cursor-pointer"}`}
          >
            <MdSkipPrevious size={24} />
          </span>
          <span
            onClick={handleTogglePlayMusic}
            className="border border-white rounded-full p-2 cursor-pointer hover:bg-purple-900 hover:bg-opacity-50"
          >
            {!isLoadedSource ? (
              <LoadingSong />
            ) : isPlaying ? (
              <BsPauseFill size={30} />
            ) : (
              <BsFillPlayFill size={30} />
            )}
          </span>
          <span
            onClick={handleNextSong}
            className={`${!songs ? "text-gray-500 " : "cursor-pointer"}`}
          >
            <MdSkipNext size={24} />
          </span>
          <span
            onClick={() => setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))}
            className={`cursor-pointer ${repeatMode && "text-pink-600"}`}
            title="Bật phát lại tất cả"
          >
            {repeatMode === 1 ? (
              <TbRepeatOnce size={24} />
            ) : (
              <CiRepeat size={24} />
            )}
          </span>
        </div>
        <div className="w-full flex items-center justify-center gap-3 text-xs">
          <span className="">
            {moment.utc(curSeconds * 1000).format("mm:ss")}
          </span>
          <div
            onClick={handleClickProgressbar}
            ref={trackRef}
            className="w-4/5 hover:h-[8px] cursor-pointer relative bg-[rgba(103,87,250,0.1)] h-[3px] rounded-l-full rounded-r-full"
          >
            <div
              ref={thumbRef}
              className="absolute hover:h-[8px] top-0 left-0 bottom-0 h-[3px] bg-[#0e8080] rounded-l-full rounded-r-full"
            ></div>
          </div>
          <span>{moment.utc(songInfo?.duration * 1000).format("mm:ss")}</span>
        </div>
      </div>
      <div className="w-[30%] gap-4 flex-none z-50 flex items-center justify-end px-4">
        <div className="flex gap-2 items-center">
          <span onClick={() => setVolume((prev) => (+prev === 0 ? 70 : 0))}>
            {+volume >= 50 ? (
              <SlVolume2 />
            ) : +volume === 0 ? (
              <SlVolumeOff />
            ) : (
              <SlVolume1 />
            )}
          </span>
          <input
            type="range"
            step={1}
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>
        <span
          onClick={() => setIsShowRightSidebar((prev) => !prev)}
          className="p-1 rounded-md cursor-pointer bg-purple-800 opacity-70 hover:bg-purple-900 hover:bg-opacity-50"
        >
          <BsMusicNoteList size={20} />
        </span>
      </div>
    </div>
  );
}

export default PlayBack;
