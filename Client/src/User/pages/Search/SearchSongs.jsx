import React, { useEffect } from "react";
import ListSong from "../Album/listSong"; // Component hiển thị danh sách bài hát
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../Store/Action";

const SearchSongs = () => {
  const { searchData } = useSelector((state) => state.music);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getSearchSongs(searchData?.top?.id));
  }, [searchData]);

  return (
    <div className="px-[60px]">
      <ListSong isHideTime={true} />
    </div>
  );
};

export default SearchSongs;
