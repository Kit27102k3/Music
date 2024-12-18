import { memo, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../ultis/icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const { AiOutlineHeart, BsFillPlayFill, BsThreeDots } = icons;

function SectionItem({
  link,
  title,
  thumbnailM,
  sectionData,
  sortDescription,
  sizeThumbnail,
}) {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const imageRef = useRef();
  const [favoritePlaylists, setFavoritePlaylists] = useState([]);

  useEffect(() => {
    fetchFavoritePlaylists();
  }, []);

  const handleToggleFavoritePlaylist = async (e) => {
    e.stopPropagation();
    const encodeId = sectionData.encodeId;
    const userAccount = JSON.parse(localStorage.getItem("account"));
    const userId = userAccount?.userId;
    if (!isFavorite) {
      await addFavoritePlaylist();
    } else {
      setIsFavorite(false);
      setFavoritePlaylists((prev) => {
        prev.filter((playlist) => playlist.encodeId !== encodeId);
      });
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/favoritePlaylists?userId${userId}`,
          {
            data: {
              encodeId,
              userId,
            },
          }
        );
        window.location.reload();
        toast.success(response.data.message);
        setIsFavorite(false);
      } catch (error) {
        toast.error("Lỗi khi xóa khỏi danh sách yêu thích!");
        setIsFavorite(true);
      }
    }
  };

  const addFavoritePlaylist = async () => {
    const userAccount = JSON.parse(localStorage.getItem("account"));
    const userId = userAccount?.userId;
    if (!userId) {
      toast.error("Không tìm thấy thông tin người dùng.");
      return;
    }
    const payload = {
      title,
      thumbnailM,
      ...(sectionData && sectionData.encodeId
        ? { encodeId: sectionData.encodeId }
        : {}),
      link,
      userId,
      userName: userAccount.name,
    };

    if (sortDescription) {
      payload.sortDescription = sortDescription;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/detailplaylist/favorites",
        payload
      );
      toast.success(response.data.message);
      setIsFavorite(true);
      setFavoritePlaylists((prev) => [
        ...prev,
        { encodeId: sectionData.encodeId },
      ]);
    } catch (error) {
      console.error("Error adding favorite playlist:", error);
      toast.error("Lỗi khi thêm vào danh sách yêu thích!");
    }
  };

  const fetchFavoritePlaylists = async () => {
    try {
      const userAccount = JSON.parse(localStorage.getItem("account"));
      if (userAccount) {
        const userId = userAccount.userId;
        const response = await axios.get(
          `http://localhost:3000/api/favoritePlaylists?userId=${userId}`
        );
        const playlists = response.data;
        setFavoritePlaylists(playlists);
        const isCurrentFavorite = playlists.some(
          (playlist) => playlist?.encodeId === sectionData?.encodeId
        );
        setIsFavorite(isCurrentFavorite);
      }
    } catch (error) {
      console.error("Lỗi khi tìm nạp danh sách phát yêu thích:", error);
    }
  };

  const handleHover = () => {
    setIsHover(true);
    imageRef.current?.classList.add("animate-scale-up-image");
  };

  const handleLeave = () => {
    setIsHover(false);
    imageRef.current?.classList.remove("animate-scale-up-image");
  };

  return (
    <div
      onClick={() =>
        navigate(link?.split(".")[0], { state: { playAlbum: false } })
      }
      className="flex flex-col flex-auto gap-3 text-sm cursor-pointer"
    >
      <ToastContainer />
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className={`relative overflow-hidden rounded-lg ${sizeThumbnail}`}
      >
        {isHover && (
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-overlay-30 z-10 flex items-center justify-center gap-3">
            <span
              onClick={handleToggleFavoritePlaylist}
              className={`${isFavorite ? "text-pink-500" : "text-white"}`}
            >
              <AiOutlineHeart size={20} />
            </span>

            <span
              onClick={(e) => {
                e.stopPropagation();
                navigate(link?.split(".")[0], { state: { playAlbum: true } });
              }}
              className="p-1 border border-white rounded-full"
            >
              <BsFillPlayFill size={20} />
            </span>
            <span>
              <BsThreeDots size={20} />
            </span>
          </div>
        )}

        <img
          ref={imageRef}
          src={thumbnailM}
          alt="avatar"
          className={`rounded-lg ${sizeThumbnail}`}
        />
      </div>
      <div className="flex flex-col">
        <span className="font-bold">
          {title?.length > 17 ? `${title.slice(0, 17)}...` : title}
        </span>
        <span className="text-white">
          {sortDescription?.length > 19
            ? `${sortDescription.slice(0, 19)}...`
            : sortDescription}
        </span>
      </div>
    </div>
  );
}

export default memo(SectionItem);
