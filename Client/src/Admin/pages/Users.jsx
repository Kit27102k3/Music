import { useState, useEffect } from "react";
import axios from "axios";
import icons from "../../User/ultis/icons";

const { FiSearch, GrClose } = icons;

function Users() {
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [titlesByUserId, setTitlesByUserId] = useState({}); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setUsers(response.data);
        setFilteredUsers(response.data);
        const titlesResponsePromises = response.data.map(async (user) => {
          const titleResponse = await axios.get(
            `http://localhost:3000/api/user/title/${user.userId}`
          );
          return { userId: user.userId, titles: titleResponse.data.titles };
        });

        const titlesResponses = await Promise.all(titlesResponsePromises);
        const titlesMap = {};
        titlesResponses.forEach((item) => {
          titlesMap[item.userId] = item.titles; 
        });

        setTitlesByUserId(titlesMap);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(keyword.toLowerCase()) ||
        user.email.toLowerCase().includes(keyword.toLowerCase()) 
    );
    setFilteredUsers(filtered);
  };

  const getTitleClass = (title) => {
    switch (title) {
      case "PREMIUM":
        return "bg-yellow-400 text-white "; // Màu nền vàng và chữ trắng
      case "PLUS":
        return "bg-blue-500 px-7 text-white "; // Màu nền xanh dương và chữ trắng
      default:
        return "bg-gray-500 text-white "; // Màu nền xám và chữ trắng
    }
  };

  const renderTitles = (titles) => {
    // Chọn title đầu tiên hoặc để mặc định là "BASIC"
    const displayTitle = titles.length > 0 ? titles[0] : "BASIC";
    return (
      <span className={`rounded-md px-2 py-1 ${getTitleClass(displayTitle)}`}>
        {displayTitle}
      </span>
    );
  };

  return (
    <div>
      <div>
        <h3 className="text-4xl">DANH SÁCH NGƯỜI DÙNG</h3>
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
          placeholder="Tìm kiếm người dùng..."
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
        <div className="grid grid-cols-5 justify-between border-b p-2">
          <span>Hình ảnh</span>
          <span>Tên người dùng</span>
          <span>Email</span>
          <span>Cấp tài khoản</span>
          <span>Trạng thái</span>
        </div>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.userId}
              className="grid grid-cols-5 items-center py-2 mt-2"
            >
              <img
                src={user.picture}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <h4 className="font-semibold">{user.name}</h4>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="">{renderTitles(titlesByUserId[user.userId] || [])}</p>
              <button className="bg-green-500 py-2 w-24">Hoạt động</button>
            </div>
          ))
        ) : (
          <p className="mt-4 text-gray-500">Không tìm thấy người dùng nào.</p>
        )}
      </div>
    </div>
  );
}

export default Users;
