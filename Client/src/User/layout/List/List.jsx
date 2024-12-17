import { useState, useEffect } from "react";
import "../../../App.css";
import icons from "../../ultis/icons";
import { useSelector } from "react-redux";
import SongItems from "../../components/SongItems";
import { apiGetDetailPlaylist } from "../../../apis";
import { Scrollbars } from "react-custom-scrollbars-2";

const { ImBin } = icons;

export default function List() {
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
    <div className="flex flex-col text-[10px] w-full">
      <div className="h-[70px] w-full flex flex-none py-[14px] gap-8 justify-between px-2 items-center">
        <div className="flex flex-auto justify-center bg-purple-900 rounded-full cursor-pointer">
          <span
            onClick={() => setIsRecent(false)}
            className={`py-[5px] ${
              !isRecent && "bg-purple-700 bg-opacity-50 font-bold"
            } flex-1 flex justify-center rounded-full items-center`}
          >
            Danh sách phát
          </span>
          <span
            onClick={() => setIsRecent(true)}
            className={`py-[5px] ${
              isRecent && "bg-purple-700 bg-opacity-50 font-bold"
            } flex-1 flex justify-center rounded-full items-center`}
          >
            Nghe gần đây
          </span>
        </div>
        <span className="p-1 rounded-full border cursor-pointer hover:bg-purple-900 hover:bg-opacity-50">
          <ImBin size={16} />
        </span>
      </div>
      {isRecent ? (
        <div className="w-full flex flex-col flex-auto">
          <Scrollbars autoHide style={{ width: "100%", height: "600px" }}>
            {recentSongs && (
              <div className="flex flex-col">
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
          </Scrollbars>
        </div>
      ) : (
        <div className="w-full flex flex-col flex-auto">
          <SongItems
            thumbnail={curSongData?.thumbnail}
            title={curSongData?.title}
            artists={curSongData?.artistsNames}
            sid={curSongData?.encodeId}
            sm
            style="bg-purple-900 "
          />
          <div className="flex flex-col  pt-[15px] pb-[5px]">
            <span className="text-sm font-bold">Tiếp theo</span>
            <span className="opacity-70 text-xs flex gap-1">
              <span>Từ playlist</span>
              <span className="font-bold text-yellow-400">
                {curSongData?.album?.title?.length > 25
                  ? `${curSongData?.album?.title.slice(0, 25)}...`
                  : curSongData?.album?.title || "Không có danh sách phát"}
              </span>
            </span>

            <Scrollbars autoHide style={{ width: "100%", height: "600px" }}>
              {playlist && (
                <div className="flex mt-2 flex-col">
                  {playlist?.map((item) => (
                    <SongItems
                      key={item?.encodeId}
                      thumbnail={item?.thumbnail}
                      title={item?.title}
                      artists={item?.artistsNames}
                      sid={item?.encodeId}
                      sm
                    />
                  ))}
                </div>
              )}
            </Scrollbars>
          </div>
        </div>
      )}
    </div>
  );
}
