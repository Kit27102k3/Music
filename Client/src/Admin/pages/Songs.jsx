import { useState, useEffect } from "react";
import axios from "axios";
import icons from "../../User/ultis/icons";

const { FiSearch, GrClose } = icons;

function Songs() {
  const [songs, setSongs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/songs");
        setSongs(response.data.songs);
        setFilteredSongs(response.data.songs); // Lưu toàn bộ danh sách bài hát
      } catch (error) {
        console.error("Error fetching songs", error);
      }
    };

    fetchSongs();
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
  
    if (keyword.trim() === "") {
      setFilteredSongs(songs);
    } else {
      const filtered = songs.filter(
        (song) =>
          song.title.includes(keyword) ||
          song.artistsNames.includes(keyword)
      );
      setFilteredSongs(filtered);
    }
  };
  

  const groupByUser = (songs) => {
    return songs.reduce((acc, song) => {
      if (!acc[song.userId]) {
        acc[song.userId] = { userName: song.userName, songs: [] };
      }
      acc[song.userId].songs.push(song);
      return acc;
    }, {});
  };

  const groupedSongs = groupByUser(filteredSongs); // Nhóm các bài hát đã lọc

  return (
    <div>
      <div>
        <h3 className="text-4xl">DANH SÁCH BÀI HÁT</h3>
      </div>
      <div
        className={`relative mt-5 flex-grow ml-2 flex items-center rounded-[20px] overflow-hidden`}
      >
        <span className="pl-4 cursor-pointer border rounded-l-full py-2">
          <FiSearch size={24} />
        </span>
        <input
          type="text"
          className={`outline-none px-4 py-2 w-full text-black border border-l-0 rounded-r-full`}
          placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát"
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
          <span>Hình ảnh bài hát</span>
          <span>Tên bài hát</span>
          <span>Tên ca sĩ</span>
        </div>

        {filteredSongs.length > 0 ? (
          Object.keys(groupedSongs).map((userId) => (
            <div key={userId}>
              <div className="font-semibold text-xl px-2 py-2">
                {groupedSongs[userId].userName}
              </div>
              {groupedSongs[userId].songs.map((song) => (
                <div
                  key={song.encodeId}
                  className="grid grid-cols-4 items-center py-2"
                >
                  <p></p>
                  <img
                    src={song.thumbnail}
                    alt={song.title}
                    className="w-10 h-10"
                  />
                  <h4 className="font-semibold">{song.title}</h4>
                  <p className="text-sm text-gray-500">{song.artistsNames}</p>
                  <p className="text-sm text-gray-500">
                    {song.album ? song.album.title : "No album"}
                  </p>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="mt-4 text-gray-500">Không tìm thấy bài hát nào.</p>
        )}
      </div>
    </div>
  );
}

export default Songs;
