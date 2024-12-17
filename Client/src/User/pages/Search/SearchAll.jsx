import { handleNumber } from "../../ultis/fn";
import SongItems from "../../components/SongItems";
import Section from "../../components/Section";
import ListItem from "../Album/listItem";
import Artist from "../../components/Artist";
import { useSelector } from "react-redux";
import SectionItem from "../../components/SectionItem";
import { useEffect, useState } from "react";
import Loading from "../../components/Loaded-Spinner/Loading";
import { useParams } from "react-router-dom";

function SearchAll() {
  const { searchData } = useSelector((state) => state.music);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (err) {
        setError("Failed to load search results.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center -mt-32 h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="w-full flex flex-col px-[60px]">
      <h3 className="text-lg font-bold mb-8">Nổi bật</h3>
      <div className="flex gap-8">
        {searchData?.top && (
          <div className="p-[10px] cursor-pointer bg-purple-900 hover:bg-opacity-50 rounded-md flex flex-1 gap-5 items-center">
            <img
              className={`w-[70px] h-[70px] object-cover ${
                searchData.top.objectType === "artist" && "rounded-full"
              }`}
              src={searchData.top.thumbnail}
              alt={searchData.top.title || searchData.top.name}
            />
            <div className="flex flex-col text-xs">
              <span className="mb-[6px]">
                {searchData.top.objectType === "artist" ? "Nghệ sĩ" : ""}
              </span>
              <span className="text-sm font-semibold hover:text-pink-500">
                {searchData.top.title || searchData.top.name}
              </span>
              {searchData.top.objectType === "artist" && (
                <span>
                  {handleNumber(searchData.artists[0]?.totalFollow) +
                    " quan tâm"}
                </span>
              )}
            </div>
          </div>
        )}
        {searchData?.songs?.slice(0, 2).map((item) => (
          <div key={item.encodeId} className="flex-1 ">
            <SongItems
              thumbnail={item.thumbnail}
              sid={item.encodeId}
              title={item.title}
              artists={item.artistsNames}
              size="w-[70px] h-[70px]"
              style="bg-purple-900 hover:bg-opacity-50"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full">
        <h3 className="text-lg font-bold mb-12 mt-12">Bài hát</h3>
        <div className="grid grid-cols-2 gap-8 w-full">
          {searchData?.songs?.map((item) => (
            <div key={item.encodeId} className="flex-auto -mt-6">
              <ListItem isHideNode isHideAlbum={true} songData={item} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full">
        <h3 className="text-lg font-bold mb-12 mt-12">Playlist/Album</h3>
        <div className="grid grid-cols-4 gap-7 w-full">
          {searchData?.playlists?.map((item) => (
            <SectionItem
              key={item.encodeId}
              title={item.title}
              link={item.link}
              sortDescription={item.sortDescription}
              thumbnailM={item.thumbnailM}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full">
        <h3 className="text-lg font-bold mb-12 mt-12">Nghệ sĩ</h3>
        <div className="grid grid-cols-5 gap-8 w-full">
          {searchData?.artists
            ?.filter((item, index) => index < 5)
            .map((item) => (
              <Artist
                key={item.id}
                title={item.name}
                image={item.thumbnailM}
                follower={item.totalFollow}
                link={item.link}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default SearchAll;
