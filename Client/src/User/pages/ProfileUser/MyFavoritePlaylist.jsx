import { useNavigate } from "react-router-dom";
import SectionItem from "../../components/SectionItem";
import { useFavoritePlaylists } from "../../ultis/fn";

function FavoritePlaylist() {
  const navigate = useNavigate();
  const { favoritePlaylists } = useFavoritePlaylists();

  const handleItemClick = (type, title, pid) => {
    const formattedTitle = title.replace(/\s+/g, "-");
    if (type === "playlist") {
      navigate(`/playlist/${formattedTitle}/${pid}`);
    } else if (type === "album") {
      navigate(`/album/${formattedTitle}/${pid}`);
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl uppercase font-bold mb-5">
          PlayList Yêu Thích
        </h2>
        <button
          onClick={() => navigate("/favorite-songs")}
          className="text-xs hover:text-pink-500 uppercase"
        >
          Tất cả
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4 cursor-pointer">
        {favoritePlaylists.length > 0 ? (
          favoritePlaylists.slice(0, 4).map((playlist) => (
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
          ))
        ) : (
          <div className="col-span-4 text-center text-gray-500">
            Không có playlist yêu thích nào.
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritePlaylist;
