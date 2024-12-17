import { memo, useState } from "react";
import { handleNumber } from "../ultis/fn";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

function Artist({ image, title, follower, link }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="flex-1 flex flex-col gap-[15px]">
      <Link to={link}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative overflow-hidden rounded-full"
      >
        <img
          src={image}
          alt="singer"
          className={`cursor-pointer w-full object-contain rounded-full transition-transform duration-300 ease-in-out ${
            isHover ? "scale-110 " : "opacity-100"
          }`}
        />
        {isHover && (
          <div className="absolute top-0 left-0 ring-0 bottom-0 bg-black rounded-full opacity-40"></div>
        )}
      </Link>
      <div className="flex gap-1 flex-col items-center">
        <Link to={link} className="text-sm font-medium hover:underline">{title.slice(0,20)}</Link>
        <span className="text-xs opacity-70">{`${handleNumber(follower)} quan tâm`}</span>
        <button
          type="button"
          className="bg-pink-500 mt-1 px-4 py-1 text-sm rounded-l-full hover:bg-opacity-70 rounded-r-full flex items-center justify-center gap-1"
        >
          <span>
            <AiOutlineUserAdd />
          </span>
          <Link to={link} className="uppercase text-xs">Xem Thông Tin</Link>
        </button>
      </div>
    </div>
  );
}

export default memo(Artist);