import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as apis from "../../../apis";
import moment from "moment";
import ListSong from "./listSong";
import { Scrollbars } from "react-custom-scrollbars-2";
import Loading from "../../components/Loaded-Spinner/Loading";
import * as actions from "../../Store/Action";
import AudioComponent from "../../components/Loaded-Spinner/Audio";
import { BsFillPlayFill } from "react-icons/bs";

export default function Album() {
  const { isPlaying } = useSelector((state) => state.music);
  const [playlistData, setPlaylistData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const { pid } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setCurAlbumId(pid));
    const fetchDetailPlaylist = async () => {
      try {
        const response = await apis.apiGetDetailPlaylist(pid);
        if (response?.data?.err === 0) {
          setPlaylistData(response?.data?.data);
          dispatch(actions.setPlaylist(response.data?.data?.song?.items));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetailPlaylist();
  }, [pid]);

  useEffect(() => {
    if (location.state?.playAlbum) {
      const randomSong =
        Math.round(Math.random() * playlistData?.song?.items?.length) - 1;
      dispatch(
        actions.setCurSongId(playlistData?.song?.items[randomSong]?.encodeId)
      );
      dispatch(actions.play(true));
    }
  }, [pid, playlistData]);

  return (
    <div className="flex relative gap-8 w-full h-full p-8 animate-scale-up-center">
      {isLoading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center">
          <Loading />
        </div>
      )}
      <div
        className={`flex-none w-[25%] flex flex-col items-center gap-2 ${
          isLoading
            ? "opacity-0 transition-opacity duration-500"
            : "opacity-100"
        }`}
      >
        <div className="w-full relative">
          <img
            src={playlistData?.thumbnailM}
            alt="thumbnailM"
            className={`w-full object-contain ${
              isPlaying
                ? "rounded-full animate-rotate-center"
                : "rounded-md animate-rotate-center-pause"
            } shadow-md`}
          />
          <div
            className={`absolute top-0 left-0 bottom-0 right-0 hover:bg-purple-900 hover:bg-opacity-50 text-white flex items-center justify-center ${
              isPlaying && "rounded-full"
            }`}
          >
            <span className="p-3 border border-white rounded-full">
              {isPlaying ? <AudioComponent /> : <BsFillPlayFill size={30} />}
            </span>
          </div>
        </div>
        <div className="flex flex-col text-center items-center">
          <h3 className="text-[15px] font-bold text-white">
            {playlistData.title}
          </h3>
          <span className="flex gap-2 items-center text-[13px]">
            <span>Cập nhật:</span>
            <span>
              {moment
                .unix(playlistData?.contentLastUpdate)
                .format("MM/DD/YYYY")}
            </span>
          </span>
          <span className="text-[13px]">{playlistData.artistsNames}</span>
          <span className="text-[13px]">{`${Math.round(
            playlistData.like / 1000
          )}K người yêu thích`}</span>
        </div>
      </div>
      <Scrollbars
        style={{ width: "100%", height: "80%" }}
        className={`${
          isLoading
            ? "opacity-0 transition-opacity duration-500"
            : "opacity-100"
        }`}
      >
        <div className="flex-auto">
          <span className="text-sm">
            <span>Lời tựa: </span>
            <span>{playlistData.sortDescription}</span>
          </span>

          <ListSong totalDuration={playlistData?.song?.totalDuration} />
        </div>
      </Scrollbars>
    </div>
  );
}