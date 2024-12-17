import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiGetArtist } from "../../../apis";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";
import ListItem from "../Album/listItem";
import Loading from "../../components/Loaded-Spinner/Loading";
import SectionItem from "../../components/SectionItem";
import Artist from "../../components/Artist";
import { toast } from "react-toastify";
import axios from "axios";
import { normalizeText } from "../../ultis/fn";

function ProfileSinger() {
  const { singer } = useParams();
  const ref = useRef(null);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [artistData, setArtistData] = useState(null);
  const [isFollower, setIsFollower] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const fetchArtistData = async () => {
    try {
      setIsLoading(true);
      const res = await apiGetArtist(singer);
      if (res.data.err === 0) {
        setArtistData(res.data.data);
        const storeUser = JSON.parse(localStorage.getItem("account"));
        const userId = storeUser?.userId;
        if (userId) {
          const followRes = await axios.get(
            `http://localhost:3000/api/checkFollower?userId=${userId}`
          );
          const isFollowing = followRes.data.some((item) => {
            const normalizeTitle = normalizeText(item.title);
            const normalizeSinger = normalizeText(singer);
            if (normalizeSinger === normalizeTitle) {
              setIsFollower(item.isFollowing);
              setIsFollowing(item.isFollowing);
            }
          });
          setIsFollower(isFollowing);
        }
      }
    } catch (error) {
      console.error("Error fetching artist data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArtistData();
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [singer]);

  const handleClickFollower = async () => {
    const storeUser = JSON.parse(localStorage.getItem("account"));
    const userId = storeUser.userId;
    const userName = storeUser?.name;
    try {
      if (!userId) {
        toast.warning("Vui lòng đăng nhập trước!");
        return;
      }
      if (isFollower) {
        const response = await axios.delete(
          "http://localhost:3000/api/follower",
          {
            data: {
              title: artistData?.name,
              userId,
            },
          }
        );
        if (response.data && !response.data.isFollowing) {
          setIsFollower(false);
          setIsFollowing(false);
          toast.success("Bỏ theo dõi thành công !");
        }
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/follower",
          {
            link: artistData?.link,
            title: artistData?.name,
            image: artistData?.thumbnailM,
            follower: artistData?.follow,
            userName,
            userId,
            isFollowing: true,
          }
        );
        if (response.data && response.data.isFollowing) {
          setIsFollower(true);
          setIsFollowing(true);
          toast.success("Theo dõi thành công !");
        }
      }
    } catch (error) {
      console.error(error);
      toast.warning("Vui lòng đăng nhập trước!");
    }
  };

  const handleToggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center -mt-32 h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div ref={ref} className="flex flex-col">
      <div className="relative w-full h-[200px] flex flex-col items-center justify-center bg-purple-900 bg-opacity-50">
        <div className="absolute gap-8 flex items-center top-0 left-0 right-0 bottom-0 px-[60px] text-white">
          <img
            src={artistData?.thumbnailM}
            alt="thumbnailM"
            className="w-[140px] h-[140px] rounded-full"
          />
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-[65px] font-bold">{artistData?.name}</h1>
              <span className="bg-pink-600 p-2 rounded-full">
                <BsFillPlayFill size={40} />
              </span>
            </div>
            <div className="flex items-center gap-8">
              <h3 className="font-bold">
                {Math.round(artistData?.follow || 0).toLocaleString()} người
                quan tâm
              </h3>
              <button
                onClick={handleClickFollower}
                className="border p-1 bg-pink-500 hover:bg-opacity-70 uppercase text-xs flex items-center gap-2 px-5 rounded-r-full rounded-l-full"
              >
                <AiOutlineUserAdd />
                <span>{isFollowing ? "Đã quan tâm" : "Quan tâm"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[30px] px-[60px] w-full flex ">
        <div className="w-full flex-auto">
          <div className="flex items-center mb-5 justify-between w-full">
            <h3 className="text-xl font-bold ">
              {artistData?.sections?.[0]?.title}
            </h3>
            <Link
              // to={`${singer}/bai-hat`}
              className="text-xs hover:text-pink-500"
            >
              TẤT CẢ
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {artistData?.sections
              ?.find((item) => item.sectionType === "song")
              ?.items?.filter((item, index) => index < 6)
              ?.map((item) => (
                <ListItem
                  key={item.encodeId}
                  isHideAlbum={true}
                  isHideNode={true}
                  songData={item}
                />
              ))}
          </div>
        </div>
      </div>

      <div className="mt-[30px] px-[60px] w-full flex ">
        <div className="w-full flex-auto">
          <div className="flex items-center mb-5 justify-between w-full">
            <h3 className="text-xl font-bold ">
              {artistData?.sections?.[1]?.title}
            </h3>
            <Link
              // to={`${singer}/bai-hat`}
              className="text-xs hover:text-pink-500"
            >
              TẤT CẢ
            </Link>
          </div>
          <div className="flex gap-4 mt-4">
            {artistData?.sections
              ?.find((item) => item.sectionType === "playlist")
              ?.items?.filter((item, index) => index < 5)
              ?.map((item) => (
                <SectionItem
                  key={item.encodeId}
                  isHideAlbum={true}
                  isHideNode={true}
                  thumbnailM={item.thumbnailM}
                  title={item.title}
                  link={item.link}
                />
              ))}
          </div>
        </div>
      </div>

      <div className="px-[60px] mt-10">
        <h3 className="text-xl font-bold">
          {artistData?.sections?.[2]?.title}
        </h3>
        <div className="grid grid-cols-4 gap-20 mt-4">
          {artistData?.sections?.[2]?.items?.map((item) => (
            <SectionItem
              key={item.encodeId}
              isHideAlbum={true}
              isHideNode={true}
              thumbnailM={item.thumbnailM}
              title={item.title}
              link={item.link}
              sizeThumbnail="w-[205px] h-[205px]"
            />
          ))}
        </div>
      </div>

      <div className="px-[60px] mt-10">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-xl font-bold">
            {artistData?.sections?.[3]?.title}
          </h3>
          <button
            className="flex text-xs hover:text-pink-600"
            onClick={handleToggleShowAll}
          >
            {showAll ? "BỚT" : "TẤT CẢ"}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {artistData?.sections
            ?.find((item) => item.sectionType === "video")
            ?.items?.filter((item, index) => index < 3)
            ?.map((item) => (
              <SectionItem
                key={item.encodeId}
                isHideAlbum={true}
                isHideNode={true}
                thumbnailM={item.thumbnailM}
                title={item.title}
                link={item.link}
              />
            ))}
        </div>
      </div>

      <div className="px-[60px] mt-10">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-xl font-bold">
            {artistData?.sections?.[4]?.title}
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {artistData?.sections
            ?.find((item) => item.sectionId === "aPlaylist")
            ?.items?.filter((item, index) => index < 3)
            ?.map((item) => (
              <SectionItem
                key={item.encodeId}
                isHideAlbum={true}
                isHideNode={true}
                thumbnailM={item.thumbnailM}
                title={item.title}
                link={item.link}
              />
            ))}
        </div>
      </div>

      <div className="px-[60px] mt-10">
        <h3 className="text-xl font-bold">
          {artistData?.sections?.[5]?.title}
        </h3>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {artistData?.sections?.[5]?.items
            ?.filter((item, index) => index < 4)
            ?.map((item) => (
              <SectionItem
                key={item.encodeId}
                isHideAlbum={true}
                isHideNode={true}
                thumbnailM={item.thumbnailM}
                sizeThumbnail="w-[205px] h-[205px]"
                title={item.title}
                link={item.link}
                sortDescription={item.sortDescription}
              />
            ))}
        </div>
      </div>

      <div className="px-[60px] mt-10">
        <h3 className="text-xl font-bold">
          {artistData?.sections?.[6]?.title}
        </h3>
        <div className="grid grid-cols-5 gap-4 mt-4">
          {artistData?.sections?.[6]?.items
            ?.filter((item, index) => index < 5)
            ?.map((item) => (
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

      <div className="px-[60px] mt-12">
        <h2 className="text-2xl font-bold mb-4">Về {artistData?.name}</h2>
        <div className="flex">
          <div className="w-[40%]">
            <img
              src={artistData?.thumbnailM}
              alt="Profile"
              className="w-[320px] h-[290px] rounded-lg"
            />
          </div>

          <div className="w-[60%]">
            <p className="text-sm mb-4 mr-32 leading-relaxed text-gray-400">
              {artistData?.biography.slice(0, 500).replace(/<br>/g, "\n")}.....
              <span className="text-white text-xs font-bold cursor-pointer">
                {" "}
                XEM THÊM
              </span>
            </p>
            <div className="flex items-center space-x-8">
              <div className="text-start flex flex-col">
                <span className="text-2xl font-bold">
                  {artistData?.follow.toLocaleString()}
                </span>
                <span className="text-xs text-gray-400">Người quan tâm</span>
              </div>
              <div className="text-start">
                <span className="text-2xl font-bold">
                  {artistData?.awards?.length}
                </span>
                <p className="text-xs text-gray-400">Giải thưởng</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[120px]"></div>
    </div>
  );
}

export default ProfileSinger;
