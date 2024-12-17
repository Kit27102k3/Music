import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function NewReleaseCharts() {
  const { chartData } = useSelector((state) => state.app);
  const navigate = useNavigate()

  return (
    <div className="mt-12 px-[59px] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-bold">{chartData?.title}</h3>
        <span className="text-xs cursor-pointer">
          <span 
          onClick={() => navigate('/new-music')}
          className="text-xs cursor-pointer hover:text-pink-500">TẤT CẢ</span>
        </span>
      </div>
      <div className="grid grid-cols-3 gap-[28px]">
        {chartData?.items?.map((item) => (
          <div
            key={item.encodeId}
            onClick={() => navigate(item?.link?.split(".")[0])}
            className="flex gap-2 text-sm cursor-pointer hover:bg-purple-900 hover:bg-opacity-50 p-2"
          >
            <img
              src={item.thumbnailM}
              alt="avatar"
              className="w-[48px] h-[48px] rounded-lg"
            />
            <span className="flex flex-col">
              <span className="flex flex-col font-bold">{`${item.title?.slice(
                0,
                25
              )}...`}</span>
              <span className="text-white">{`${item.artistsNames?.slice(0,15)}...`}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewReleaseCharts;
