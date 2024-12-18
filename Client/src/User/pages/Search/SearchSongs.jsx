import React, { useEffect, useState } from "react";
import ListSong from "../Album/listSong"; // Component hiển thị danh sách bài hát
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../Store/Action";
import Loading from "../../components/Loaded-Spinner/Loading";

const SearchSongs = () => {
  const { searchData } = useSelector((state) => state.music);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    try {
      dispatch(actions.getSearchSongs(searchData?.top?.id));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [searchData]);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen -mt-32">
          <Loading />
        </div>
      ) : (
        <div className="px-[60px]">
          <ListSong isHideTime={true} />
        </div>
      )}
    </>
  );
};

export default SearchSongs;
