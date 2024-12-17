import { useEffect, useState } from "react";
import { apiNewReleaseChartSongs } from "../../../apis/music";
import ListItem from "../Album/listItem";
import { BsFillPlayFill } from "react-icons/bs";
import Loading from "../../components/Loaded-Spinner/Loading";

function NewMusic() {
  const [newRelease, setNewRelease] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNewReleaseData = async () => {
      try {
        setIsLoading(true);
        const response = await apiNewReleaseChartSongs();
        if (response.data.err === 0) setNewRelease(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewReleaseData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loading />
      </div>
    );
  }

  if (!newRelease) return null;

  return (
    <div className="mt-12 px-[60px]">
      <div className="flex items-center gap-3">
        <h3 className="text-[40px] font-bold">{newRelease?.title}</h3>
        <span className="bg-pink-500 p-2 rounded-full cursor-pointer hover:bg-purple-900 hover:bg-opacity-50">
          <BsFillPlayFill size={20} />
        </span>
      </div>
      <div className="mt-5">
        {newRelease?.items?.map((item, index) => (
          <ListItem
            key={item.encodeId}
            order={index + 1}
            isHideNode={true}
            songData={item}
          />
        ))}
      </div>
    </div>
  );
}

export default NewMusic;
