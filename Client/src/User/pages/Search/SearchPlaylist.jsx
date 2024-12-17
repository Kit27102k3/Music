import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiGetArtist } from "../../../apis";
import Section from "../../components/Section";
import Loading from "../../components/Loaded-Spinner/Loading";

const SearchPlaylist = () => {
  const { searchData } = useSelector((state) => state.music);
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const CURRENT_KEY = searchData?.top?.alias;

  useEffect(() => {
    const storedKey = localStorage.getItem("searchHistory");
    if (storedKey !== CURRENT_KEY) {
      localStorage.setItem("searchHistory", CURRENT_KEY);
      localStorage.removeItem("playlists");
    }

    const fetch = async () => {
      setIsLoading(true);
      try {
        const res = await apiGetArtist(CURRENT_KEY);
        if (res.data.err === 0) {
          setPlaylists(res.data.data.sections[1]);
          localStorage.setItem(
            "playlists",
            JSON.stringify(res.data.data.sections[1])
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    const storedPlaylists = localStorage.getItem("playlists");
    if (storedPlaylists) {
      setPlaylists(JSON.parse(storedPlaylists));
      setIsLoading(false);
    } else {
      fetch();
    }
  }, [CURRENT_KEY]); // Thêm CURRENT_KEY vào dependency array để chạy lại khi từ khóa thay đổi

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen -mt-32">
          <Loading />
        </div>
      ) : (
        <>
          <h3 className="font-bold text-lg px-[60px] -mb-10">PLAYLIST/ALBUM</h3>
          <Section
            isHide={true}
            sectionData={playlists}
            number={100}
            sizeThumbnail="w-[150px] h-[150px]"
          />
        </>
      )}
    </div>
  );
};

export default SearchPlaylist;
