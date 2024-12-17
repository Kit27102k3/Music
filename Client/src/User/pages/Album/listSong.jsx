import { memo } from "react";
import ListItem from "./listItem";
import { BsDot } from "react-icons/bs";
import moment from "moment";
import { useSelector } from "react-redux";

const ListSong = ({ totalDuration, isHideTime }) => {
  const { songs } = useSelector((state) => state.music);
  return (
    <div className="w-full flex flex-col text-xs ">
      <div className="flex justify-between items-center uppercase p-[10px] font-semibold">
        <span className={isHideTime && "font-bold text-lg"}>Bài hát</span>
        {!isHideTime && <span>Album</span>}
        {!isHideTime && <span>Thời gian</span>}
      </div>
      <div className="flex flex-col">
        {songs?.map((item) => (
          <ListItem key={item.encodeId} isHideNode songData={item} />
        ))}
      </div>
      {totalDuration && (
        <span className="flex items-center gap-1 py-[10px] border-t border-[rgba(0,0,0,0.05)]">
          <span>{`${songs?.length} bài hát`}</span>
          {!isHideTime && <BsDot size={24} />}
          <span>{moment.utc(totalDuration * 1000).format("HH:mm:ss")}</span>
        </span>
      )}
    </div>
  );
};

export default memo(ListSong);
