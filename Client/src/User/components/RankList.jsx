import { useEffect, useState } from "react";
import ListItem from "../pages/Album/listItem";
import { useNavigate } from "react-router-dom";

function RankList({ data, isHideAlbum, number, link, isHideButton }) {
  const [isShowFull, setIsShowFull] = useState(false);
  const [songs, setSongs] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isShowFull) {
      setSongs(data?.filter((item, index) => index < number));
    } else {
      setSongs(data);
    }
  }, [isShowFull, data]);

  return (
    <div className="w-full ">
      {songs?.map((item, index) => (
        <ListItem
          key={item.encodeId}
          isHideNode={true}
          songData={item}
          isHideAlbum={isHideAlbum}
          order={index + 1}
          percentSize="items-center justify-between"
          style="text-white bg-[hsla(0, 0%, 100%, .07)] hover:bg-purple-900 hover:bg-opacity-50"
        />
      ))}

      <div className="flex w-full items-center justify-center">
        {!isHideButton && <button
          type="button"
          className="px-8 my-4 hover:bg-purple-900 hover:bg-opacity-50 py-2 border-2 border-white rounded-l-full text-sm rounded-r-full "
          onClick={() =>
            link ? navigate(link.split(".")[0]) : setIsShowFull((prev) => !prev)
          }
        >
          {isShowFull ? "ẨN BỚT" : "XEM THÊM"}
        </button>}
      </div>
    </div>
  );
}

export default RankList;
