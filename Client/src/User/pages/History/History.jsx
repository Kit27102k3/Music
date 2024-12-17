import { useState, useEffect } from "react";
import "../../../App.css";
import { useSelector } from "react-redux";
import SongItems from "../../components/SongItems";
import { apiGetDetailPlaylist } from "../../../apis";

export default function History() {
  const [isRecent, setIsRecent] = useState(false);
  const [playlist, setPlaylist] = useState();
  const { curSongData, curAlbumId, isPlaying, recentSongs, curSongId } =
    useSelector((state) => state.music);

  const fetchDetailPlaylist = async () => {
    const response = await apiGetDetailPlaylist(curAlbumId);
    if (response.data?.err === 0) setPlaylist(response.data.data?.song?.items);
  };

  useEffect(() => {
    curAlbumId && fetchDetailPlaylist();
  }, []);

  useEffect(() => {
    if (curAlbumId && isPlaying) fetchDetailPlaylist();
  }, [curAlbumId, isPlaying]);

  useEffect(() => {
    isPlaying && setIsRecent(false);
  }, [isPlaying, curSongId]);

  return (
    <div className="px-[60px] mt-10">
      <div className="mb-5">
        <span className="text-[40px] font-bold">Phát Gần Đây</span>
      </div>
      <div className="w-full flex flex-col flex-auto">
        {recentSongs && (
          <div className="grid grid-cols-2">
            {recentSongs?.map((item) => (
              <SongItems
                key={item.sid}
                thumbnail={item?.thumbnail}
                title={item?.title}
                artists={item?.artists}
                sid={item?.sid}
                sm
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
