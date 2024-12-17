import { useState, useEffect } from "react";
import axios from "axios";
import icons from "../../User/ultis/icons";

const { FiSearch, GrClose } = icons;

function Singers() {
  const [singers, setSingers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filteredSingers, setFilteredSingers] = useState([]);

  useEffect(() => {
    const fetchSingers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/singers");
        setSingers(response.data.singers);
        setFilteredSingers(response.data.singers); // Store all singers initially
      } catch (error) {
        console.error("Error fetching singers", error);
      }
    };

    fetchSingers();
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value.trim(); // Xử lý từ khóa tìm kiếm
    setKeyword(keyword);
    if (keyword === "") {
      setFilteredSingers(singers); // Nếu không có từ khóa, hiển thị tất cả
    } else {
      const filtered = singers.filter((singer) => {
        const artistNames = singer.artistsNames || ""; // Đảm bảo trường artistsNames luôn có giá trị
        const title = singer.title || ""; // Đảm bảo trường title luôn có giá trị
        const userName = singer.userName || ""; // Đảm bảo trường userName luôn có giá trị
        // Tìm kiếm trên nhiều trường (artistsNames, title, userName)
        return (
          artistNames.includes(keyword) ||
          title.includes(keyword) ||
          userName.includes(keyword)
        );
      });
      setFilteredSingers(filtered);
    }
  };

  const groupByUser = (singers) => {
    return singers.reduce((acc, singer) => {
      if (!acc[singer.userId]) {
        acc[singer.userId] = { userName: singer.userName, singers: [] };
      }
      acc[singer.userId].singers.push(singer);
      return acc;
    }, {});
  };

  const groupedSingers = groupByUser(filteredSingers);

  return (
    <div>
      <div>
        <h3 className="text-4xl">DANH SÁCH CA SĨ</h3>
      </div>
      <div className="relative mt-5 flex-grow ml-2 flex items-center rounded-[20px] overflow-hidden">
        <span className="pl-4 cursor-pointer border rounded-l-full py-2">
          <FiSearch size={24} />
        </span>
        <input
          type="text"
          className="outline-none px-4 py-2 w-full text-black border border-l-0 rounded-r-full"
          placeholder="Tìm kiếm ca sĩ, nghệ sĩ"
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
          <span>Hình ảnh ca sĩ</span>
          <span>Tên ca sĩ</span>
          <span>Follower</span>
        </div>
        {Object.keys(filteredSingers).length > 0 ? (
          Object.keys(groupedSingers).map((userId, index) => (
            <div key={userId || index}>
              <div className="font-semibold text-xl px-2 py-2">
                {groupedSingers[userId].userName}
              </div>
              {groupedSingers[userId].singers.map((singer) => (
                <div
                  key={singer.encodeId}
                  className="grid grid-cols-4 items-center justify-between py-2"
                >
                  <p></p>
                  <img
                    src={singer.image}
                    alt={singer.title}
                    className="w-10 h-10"
                  />
                  <h4 className="font-semibold">{singer.title}</h4>
                  <p>{singer.follower.toLocaleString()}</p>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="mt-4 text-gray-500">Không tìm thấy ca sĩ nào.</p>
        )}
      </div>
    </div>
  );
}

export default Singers;
