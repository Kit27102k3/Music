import { useState, useEffect } from "react";
import axios from "axios";
import icons from "../../User/ultis/icons";
import moment from "../../User/ultis/moment";

const { FiSearch, GrClose } = icons;

function Upgrade() {
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/payment/allUsers"
        );
        setUsers(response.data);
        setFilteredUsers(response.data); // Cập nhật filteredUsers khi tải dữ liệu
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
    const filtered = users.filter((user) =>
      user.userName.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredUsers(filtered); // Cập nhật filteredUsers sau khi tìm kiếm
  };

  const getTitleClass = (title) => {
    switch (title) {
      case "PREMIUM":
        return "bg-yellow-400 text-white "; // Gói Premium
      case "PLUS":
        return "bg-green-500 text-white "; // Gói Plus
      default:
        return "bg-blue-500 text-white "; // Các gói khác
    }
  };

  const renderTitles = (title) => {
    if (title === "PREMIUM") {
      return (
        <span className={`rounded-md px-2 py-1 ${getTitleClass(title)}`}>
          {title}
        </span>
      );
    }
    return (
      <span className={`rounded-md px-2 py-1 ${getTitleClass(title)}`}>
        {title}
      </span>
    );
  };

  return (
    <div>
      <div>
        <h3 className="text-4xl">DANH SÁCH NGƯỜI DÙNG NÂNG CẤP GÓI</h3>
      </div>

      <div className="relative mt-5 flex-grow ml-2 flex items-center rounded-[20px] overflow-hidden">
        <span className="pl-4 cursor-pointer border rounded-l-full py-2">
          <FiSearch size={24} />
        </span>
        <input
          type="text"
          className="outline-none px-4 py-2 w-full text-black border border-l-0 rounded-r-full"
          placeholder="Tìm kiếm người dùng theo tên"
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
        <div className="grid grid-cols-6 justify-between border-b p-2">
          <span>Tên người dùng</span>
          <span>Giá</span>
          <span>Hạn sử dụng</span>
          <span>Cấp gói</span>
          <span>Ngày nâng cấp</span>
          <span>Ngày hết hạn</span>
        </div>

        {/* Kiểm tra xem có users hoặc filteredUsers để render */}
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="grid grid-cols-6 items-center py-2 mt-2"
            >
              <p className="font-semibold">{user.userName}</p>
              <h4 className="font-semibold">{user.price}</h4>
              <h4 className="font-semibold">{user.name}</h4>
              <p>{renderTitles(user.title)}</p>
              <h4 className="font-semibold">
                {moment(user.dateNow).format("DD/MM/YYYY HH:mm:ss")}
              </h4>
              <h4 className="font-semibold">
                {moment(user.upgrade).format("DD/MM/YYYY HH:mm:ss")}
              </h4>
            </div>
          ))
        ) : (
          <p className="mt-4 text-gray-500">Không tìm thấy người dùng nào.</p>
        )}
      </div>
    </div>
  );
}

export default Upgrade;
