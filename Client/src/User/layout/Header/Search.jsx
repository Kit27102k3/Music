import { useState, useEffect } from "react";
import {
  useNavigate,
  createSearchParams,
  useLocation,
  useParams,
} from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import * as actions from "../../Store/Action";
import icons from "../../ultis/icons";
import { useDispatch } from "react-redux";

const { HiArrowNarrowLeft, HiArrowNarrowRight } = icons;

function Search() {
  const [keyword, setKeyword] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singer } = useParams();
  const { search } = useLocation(); // Lấy thông tin search từ URL

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const query = queryParams.get("q") || "";
    setKeyword(query);
    const historyString = localStorage.getItem("searchHistory");
    let history = [];

    try {
      history = JSON.parse(historyString) || [];
    } catch (e) {
      history = [];
    }

    setSearchHistory(history);
  }, [search]);

  // Cập nhật lại hàm lưu trữ chỉ lưu 1 từ khóa duy nhất
  const saveSearchQuery = (query) => {
    // Lưu lại từ khóa duy nhất và xóa các từ khóa cũ
    localStorage.setItem("searchHistory", JSON.stringify([query]));
    setSearchHistory([query]);
  };

  const handleSearch = async (e) => {
    if (e.keyCode === 13 && keyword.trim()) {
      dispatch(actions.search(keyword));
      saveSearchQuery(keyword); // Lưu từ khóa tìm kiếm mới
      navigate({
        pathname: `/tim-kiem/tat-ca`,
        search: createSearchParams({ q: keyword }).toString(),
      });
      setShowHistory(false);
    }
  };

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const handleNextNavigation = () => {
    navigate(1);
  };

  return (
    <div className="w-full flex items-center gap-2 relative">
      <div className="flex items-center gap-5">
        <span className="cursor-pointer" onClick={handleBackNavigation}>
          <HiArrowNarrowLeft size={20} />
        </span>

        <span className="cursor-pointer" onClick={handleNextNavigation}>
          <HiArrowNarrowRight size={20} />
        </span>
      </div>

      <div
        className={`relative flex-grow ml-2 flex items-center ${
          singer ? "bg-purple-900 bg-opacity-50" : "bg-purple-900 text-white"
        } rounded-[20px] overflow-hidden`}
      >
        <span className="pl-4 cursor-pointer">
          <FiSearch size={24} />
        </span>
        <input
          type="text"
          className={`outline-none px-4 ${
            singer ? "bg-purple-900 bg-opacity-50" : " text-white"
          } py-2 w-full  text-white bg-purple-900`}
          placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyUp={handleSearch}
          onFocus={() => setShowHistory(true)}
          onBlur={() => setTimeout(() => setShowHistory(false), 200)}
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
    </div>
  );
}

export default Search;
