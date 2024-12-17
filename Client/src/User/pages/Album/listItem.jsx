import { memo, useState, useEffect } from "react";
import icons from "../../ultis/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import * as actions from "../../Store/Action";
import axios from "axios";
import { toast } from "react-toastify";

const { BsMusicNoteBeamed, BsHeart, BsDownload } = icons;

const ListItem = ({ songData, isHideAlbum, isHideNode, order }) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false); // Trạng thái yêu thích
  // Kiểm tra nếu bài hát đã yêu thích khi component được tải
  useEffect(() => {
    const userAccount = JSON.parse(localStorage.getItem("account"));
    if (userAccount) {
      const { userId } = userAccount;
      // Kiểm tra nếu bài hát đã có trong danh sách yêu thích
      const checkFavorite = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/song/favorite?userId=${userId}`
          );
          const favoriteSongs = response.data.songs || [];
          const isSongFavorite = favoriteSongs.some(
            (song) => song.encodeId === songData.encodeId
          );
          setIsFavorite(isSongFavorite);
        } catch (error) {
          console.error("Error checking favorite status:", error);
        }
      };
      checkFavorite();
    }
  }, [songData.encodeId]);

  const handleDownloadClick = async (event, songData) => {
    event.stopPropagation();
    const userAccount = JSON.parse(localStorage.getItem("account"));
    if (!userAccount) {
      toast.error("Không tìm thấy thông tin người dùng.");
      return;
    }
    const { userId } = userAccount;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/song/download",
        {
          encodeId: songData.encodeId,
          title: songData.title,
          artistsNames: songData.artistsNames,
          album: songData.album,
          thumbnail: songData.thumbnailM,
          duration: songData.duration,
          userId,
          userName: userAccount.name,
        }
      );
      toast.success(response.data.message); // Hiển thị thông báo thành công
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message); // Bài hát đã tải về
      } else {
        console.error("Error during download:", error);
        toast.error("Đã xảy ra lỗi khi tải bài hát.");
      }
    }
  };

  const handleClickHeart = async (event, songData) => {
    event.stopPropagation();
    const userAccount = JSON.parse(localStorage.getItem("account"));
    if (!userAccount) {
      toast.error("Không tìm thấy thông tin người dùng.");
      return;
    }
    const { userId, name: userName } = userAccount;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/song/favorite",
        {
          encodeId: songData?.encodeId,
          title: songData?.title,
          artistsNames: songData?.artistsNames,
          album: songData?.album?.title || songData?.album,
          thumbnail: songData?.thumbnailM,
          duration: songData?.duration,
          userId,
          userName,
        }
      );
      if (response.data.message === "Dữ liệu đã được lưu thành công!") {
        setIsFavorite(true); // Đánh dấu bài hát là yêu thích
      }
      toast.success("Đã thêm bài hát vào danh sách yêu thích!");
    } catch (err) {
      console.error("Error during favorite:", err);
      toast.error("Đã có lỗi xảy ra khi thêm bài hát vào danh sách.");
    }
  };

  return (
    <div
      className="flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-purple-900 hover:bg-opacity-50 cursor-pointer group relative"
      onClick={() => {
        dispatch(actions.setCurSongId(songData?.encodeId));
        dispatch(actions.play(true));
        dispatch(actions.playAlbum(true));
        dispatch(
          actions.setRecent({
            thumbnail: songData?.thumbnail,
            title: songData?.title,
            sid: songData?.encodeId,
            artists: songData?.artistsNames,
          })
        );
      }}
    >
      <div className="flex items-center gap-3 flex-1">
        {order && (
          <span
            className={`text-[rgba(77,34,104,0.9)] flex justify-center items-center flex-none w-[20%]`}
            style={{
              textShadow:
                order === 1
                  ? "1px 1px 0px #4a90e2, -1px 1px 0 #4a90e2, -1px -1px 0 #4a90e2, 1px -1px 0 #4a90e2 "
                  : order === 2
                  ? "1px 1px 0px #50e3c2, -1px 1px 0 #50e3c2, -1px -1px 0 #50e3c2, 1px -1px 0 #50e3c2"
                  : order === 3
                  ? "1px 1px 0px #e35050, -1px 1px 0 #e35050, -1px -1px 0 #e35050, 1px -1px 0 #e35050"
                  : "1px 1px 0px #CCCCCC, -1px 1px 0 #CCCCCC, -1px -1px 0 #CCCCCC, 1px -1px 0 #CCCCCC",
              fontSize: "30px",
            }}
          >
            {order}
          </span>
        )}
        {!isHideNode && <span>{<BsMusicNoteBeamed />}</span>}
        <img
          className="w-10 h-10 object-cover rounded-md"
          src={songData?.thumbnail}
          alt="thumbnail"
        />
        <span className="flex flex-col w-full">
          <span className="text-sm w-full font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis">
            {songData?.title?.length > 20
              ? `${songData?.title?.slice(0, 20)}...`
              : songData?.title}
          </span>
          <span className="text-xs opacity-70">
            {songData?.artistsNames?.length > 10
              ? `${songData?.artistsNames?.slice(0, 10)}...`
              : songData?.artistsNames}
          </span>
        </span>
      </div>

      {!isHideAlbum && (
        <div className="flex-1 ml-16 flex text-xs justify-center items-center">
          {songData?.album?.title?.length > 20
            ? `${songData?.album?.title?.slice(0, 20)}...`
            : songData?.album?.title}
        </div>
      )}

      <div className="flex items-center justify-end flex-1 relative">
        <span className="text-xs opacity-70 ">
          {moment.utc(songData?.duration * 1000).format("mm:ss")}
        </span>
        <div className="flex gap-5 mr-16 absolute items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <BsHeart
            size={13}
            className={`cursor-pointer ${
              isFavorite ? "text-pink-500" : "text-gray-500"
            }`} // Đổi màu dựa trên trạng thái yêu thích
            onClick={(event) => {
              handleClickHeart(event, songData);
            }}
          />
          <BsDownload
            size={13}
            className="cursor-pointer -mt-1"
            onClick={(event) => handleDownloadClick(event, songData)}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ListItem);
