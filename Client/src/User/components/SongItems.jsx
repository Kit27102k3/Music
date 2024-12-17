import { memo } from "react";
import moment from "../ultis/moment";
moment.locale("vi");
import { useDispatch } from "react-redux";
import * as actions from "../Store/Action";
import "../../App.css";

function SongItems({
  thumbnail,
  title = "",
  artists = "",
  sid,
  releaseDate,
  order,
  percent,
  percentSize = "items-center justify-between",
  style,
  size,
}) {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(actions.setCurSongId(sid));
        dispatch(actions.play(true));
      }}
      className={`w-full flex-auto flex p-[10px] gap-[10px] rounded-md ${percentSize} cursor-pointer ${
        style || " hover:bg-purple-900 hover:bg-opacity-50"
      }`}
    >
      <div className="flex gap-4 ">
        {order && (
          <span
            className={`text-[rgba(77,34,104,0.9)] m-auto text-[25px]`}
            style={{
              textShadow:
                order === 1
                  ? "1px 1px 0px #4a90e2, -1px 1px 0 #4a90e2, -1px -1px 0 #4a90e2, 1px -1px 0 #4a90e2"
                  : order === 2
                  ? "1px 1px 0px #50e3c2, -1px 1px 0 #50e3c2, -1px -1px 0 #50e3c2, 1px -1px 0 #50e3c2"
                  : "1px 1px 0px #e35050, -1px 1px 0 #e35050, -1px -1px 0 #e35050, 1px -1px 0 #e35050",
            }}
          >
            {order}
          </span>
        )}

        <img
          src={thumbnail}
          alt="thumbnail"
          className={`${size || "h-[40px]"} object-cover rounded-md`}
        />
        <div className={`flex flex-col`}>
          <span className="text-sm font-semibold ">
            {title.length > 20 ? `${title.slice(0, 20)}...` : title}
          </span>
          <span className="text-xs ">
            {artists.length > 15 ? `${artists.slice(0, 20)}...` : artists}
          </span>
          {releaseDate && (
            <span
              className={`text-xs ${order ? "opacity-70" : "text-white"}`}
            >
              {moment(releaseDate * 1000).fromNow()}
            </span>
          )}
        </div>
      </div>
      {percent && <span className={`${percentSize}`}>{`${percent}%`}</span>}
    </div>
  );
}

export default memo(SongItems);
