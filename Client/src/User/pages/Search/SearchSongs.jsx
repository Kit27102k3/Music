import React, { useEffect, useState } from "react";
import ListSong from "../Album/listSong";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../Store/Action";
import Loading from "../../components/Loaded-Spinner/Loading";

const SearchSongs = () => {
  const { searchData } = useSelector((state) => state.music);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSongs = async () => {
      setIsLoading(true);
      try {
        if (searchData?.top?.id) {
          await dispatch(actions.getSearchSongs(searchData.top.id));
        }
      } catch (error) {
        console.log("Error fetching songs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, [searchData, dispatch]); // Đảm bảo dispatch được đưa vào dependency array

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen -mt-32">
          <Loading />
        </div>
      ) : (
        <div className="px-[60px]">
          <ListSong isHideTime={true} />
        </div>
      )}
    </div>
  );
};

export default SearchSongs;
