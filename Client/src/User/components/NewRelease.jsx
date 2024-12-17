import { useState } from "react";
import { useSelector } from "react-redux";
import SongItems from "./SongItems";

function NewRelease() {
  const [isActived, setIsActived] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const { new_song } = useSelector((state) => state.app);

  const songs = isActived ? new_song?.items?.others : new_song?.items?.vPop;
  const displayedSongs = showAll ? songs : songs?.slice(0, 9);

  return (
    <div className="px-[59px] mt-12 md:px-10 lg:px-20 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-bold">{new_song?.title}</h3>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-xs cursor-pointer"
        >
          {showAll ? "ẨN BỚT" : "Xem Tất Cả"}
        </button>
      </div>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => {
              setIsActived(0);
            }}
            className={`py-1 px-4 rounded-full border bg-transparent ${
              isActived === 0 ? "bg-green-500 font-bold" : ""
            }`}
          >
            VIỆT NAM
          </button>
          <button
            type="button"
            onClick={() => {
              setIsActived(1);
            }}
            className={`py-1 px-4 rounded-full border bg-transparent ${
              isActived === 1 ? "bg-green-500 font-bold" : ""
            }`}
          >
            QUỐC TẾ
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-between w-full">
        {displayedSongs?.map((item) => (
          <div key={item.encodeId} className="w-1/3 sm:w-1/2 lg:w-1/3 p-2">
            <SongItems
              thumbnail={item.thumbnail}
              title={item.title}
              artists={item.artistsNames}
              releaseDate={item.releaseDate}
              sid={item.encodeId}
            />
          </div>
        ))}
        {showAll && displayedSongs.length % 3 !== 0 && (
          <div className={`w-full sm:w-1/2 lg:w-1/3 flex-auto h-[60px]`} />
        )}
      </div>
    </div>
  );
}

export default NewRelease;
