import { useState, useEffect } from "react";
import axios from "axios";
import icons from "../../User/ultis/icons";

const { FiSearch, GrClose } = icons;

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/playlists");
        setPlaylists(response.data.playlists || []);
        setFilteredPlaylists(response.data.playlists || []); // Lưu playlists vào filteredPlaylists
      } catch (error) {
        console.error("Error fetching playlists", error);
      }
    };

    fetchPlaylists();
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
    // Lọc playlist theo title
    const filtered = playlists.filter(
      (playlist) => playlist.title?.includes(keyword) // Tìm kiếm không phân biệt chữ hoa/thường
    );
    setFilteredPlaylists(filtered); // Cập nhật filteredPlaylists
  };

  const groupByUser = (playlists) => {
    return playlists.reduce((acc, playlist) => {
      if (!acc[playlist.userId]) {
        acc[playlist.userId] = { userName: playlist.userName, playlists: [] };
      }
      acc[playlist.userId].playlists.push(playlist);
      return acc;
    }, {});
  };

  const groupedPlaylists = groupByUser(filteredPlaylists); // Dùng filteredPlaylists thay vì playlists

  return (
    <div>
      <div>
        <h3 className="text-4xl">DANH SÁCH PLAYLISTS</h3>
      </div>
      <div className="relative mt-5 flex-grow ml-2 flex items-center rounded-[20px] overflow-hidden">
        <span className="pl-4 cursor-pointer border rounded-l-full py-2">
          <FiSearch size={24} />
        </span>
        <input
          type="text"
          className="outline-none px-4 py-2 w-full text-black border border-l-0 rounded-r-full"
          placeholder="Tìm kiếm playlist"
          value={keyword}
          onChange={handleSearch}
        />
        {keyword && (
          <span
            onClick={() => setKeyword("")}
            className="absolute right-4 cursor-pointer text-white"
          >
            <GrClose size={15} />
          </span>
        )}
      </div>

      <div className="mt-5">
        <div className="grid grid-cols-4 justify-between border-b p-2">
          <span>Tên người dùng</span>
          <span>Hình ảnh playlist</span>
          <span>Tên playlist</span>
          <span>Chi tiết</span>
        </div>

        {Object.keys(groupedPlaylists).length > 0 ? (
          Object.keys(groupedPlaylists).map((userId) => (
            <div key={userId}>
              <div className="font-semibold text-xl px-2 py-2">
                {groupedPlaylists[userId].userName}
              </div>
              {groupedPlaylists[userId].playlists.map((playlist) => (
                <div
                  key={playlist.encodeId}
                  className="grid grid-cols-4 items-center justify-between py-2"
                >
                  <p>{""}</p>
                  <img
                    src={playlist.thumbnailM}
                    alt={playlist.title}
                    className="w-10 h-10"
                  />
                  <h4 className="font-semibold">{playlist.title}</h4>
                  <p>{playlist.sortDescription?.slice(0, 20)}...</p>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="mt-4 text-gray-500">Không tìm thấy playlist nào.</p>
        )}
      </div>
    </div>
  );
}

export default Playlists;
