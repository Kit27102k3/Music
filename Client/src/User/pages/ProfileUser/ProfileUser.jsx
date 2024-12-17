import React, { useEffect, useState } from "react";
import MyMusicList from "./MyMusicList";
import FavoriteSong from "./MyFavoriteSong";
import FavoritePlaylist from "./MyFavoritePlaylist";
import SingerDetail from "./FollowerSinger";

export default function ProfileUser() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) {
      setAccount(JSON.parse(storedAccount));
    }
  }, []);

  return (
    <div className="h-screen px-[60px] mt-10 rounded-lg">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center w-full mb-2">
          <img
            className="w-24 h-24 rounded-full"
            src={account ? account.picture : "https://via.placeholder.com/150"}
            alt="User Profile Picture"
          />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">
            {account ? account.name : "Chưa đăng nhập"}
          </h2>
        </div>
      </div>

      <div className="mt-4">
        <MyMusicList />
      </div>
      <div className="mt-6">
        <FavoriteSong />
      </div>
      <div className="mt-6">
        <FavoritePlaylist />
      </div>
      <div className="mt-4">
        <SingerDetail />
      </div>
      <div className="h-[100px] w-full"></div>
    </div>
  );
}
