import { useState, useEffect } from "react";
import axios from "axios";
import icons from "../../User/ultis/icons";

const { FiSearch, GrClose } = icons;

function ContactAdmin() {
  const [keyword, setKeyword] = useState("");
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/contacts");
        setContacts(response.data);
        setFilteredContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setKeyword(value);
    if (value.trim() === "") {
      setFilteredContacts(contacts);
    } else {
      setFilteredContacts(
        contacts.filter(
          (feedback) =>
            feedback.userName.toLowerCase().includes(value.toLowerCase()) ||
            feedback.email.toLowerCase().includes(value.toLowerCase()) ||
            feedback.phone.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-4xl font-bold mb-4">DANH SÁCH PHẢN HỒI</h3>
      <div className="relative flex-grow flex items-center rounded-[20px] overflow-hidden mb-6">
        <span className="pl-4 cursor-pointer border rounded-l-full py-2">
          <FiSearch size={24} />
        </span>
        <input
          type="text"
          className="outline-none px-4 py-2 w-full text-black border border-l-0 rounded-r-full"
          placeholder="Tìm kiếm theo tên người dùng"
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

      <div className="grid grid-cols-6 mt-6 font-bold text-justify">
        <span>Tên người dùng</span>
        <span>Email</span>
        <span className="text-center">SĐT</span>
        <span className="text-center">Vấn đề</span>
        <span className="text-center">Nội dung</span>
        <span>Thời gian</span>
      </div>

      <div>
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div
              className="grid grid-cols-6 text-justify justify-between mt-5"
              key={contact.id}
            >
              <p>{contact.userName.slice(0, 20)}</p>
              <p>{contact.email.slice(0, 30)}</p>
              <p className="text-center">{contact.phone}</p>
              <p className="text-center">{contact.problem}</p>
              <p className="text-center">{contact.content}</p>
              <p>{new Date(contact.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <span className="col-span-6 text-center text-gray-500">
            Không tìm thấy phản hồi nào.
          </span>
        )}
      </div>
    </div>
  );
}

export default ContactAdmin;
