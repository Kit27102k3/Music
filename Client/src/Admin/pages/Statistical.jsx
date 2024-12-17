import React, { useEffect, useState } from "react";
import axios from "axios";

function Statistical() {
  const [totalFeedback, setTotalFeedback] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSongs, setTotalSongs] = useState(0);
  const [totalPlaylists, setTotalPlaylists] = useState(0);
  const [totalSingers, setTotalSingers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feedbackResponse = await axios.get(
          "http://localhost:3000/api/contact/totalFeedback"
        );
        setTotalFeedback(feedbackResponse.data.totalFeedback);

        const revenueResponse = await axios.get(
          "http://localhost:3000/api/payment/totalRevenue"
        );
        setTotalRevenue(revenueResponse.data.totalRevenue);

        const usersResponse = await axios.get(
          "http://localhost:3000/api/user/totalUsers"
        );
        setTotalUsers(usersResponse.data.totalUsers);

        const songsResponse = await axios.get(
          "http://localhost:3000/api/song/totalSongs"
        );
        setTotalSongs(songsResponse.data.totalSongs);

        const playlistsResponse = await axios.get(
          "http://localhost:3000/api/playlist/totalPlaylists"
        );
        setTotalPlaylists(playlistsResponse.data.totalPlaylists);

        const singersResponse = await axios.get(
          "http://localhost:3000/api/singer/totalSingers"
        );
        setTotalSingers(singersResponse.data.totalSingers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3 className="text-3xl mb-5">THỐNG KÊ</h3>
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-8 shadow rounded-lg">
          <h2 className="text-lg text-zinc-700">Tổng Số Người Dùng</h2>
          <p className="text-3xl text-blue-500">{totalUsers}</p>
        </div>
        <div className="bg-white p-8 shadow rounded-lg">
          <h2 className="text-lg text-zinc-700">Tổng Bài Hát Yêu Thích</h2>
          <p className="text-3xl text-blue-500">{totalSongs}</p>
        </div>
        <div className="bg-white p-8 shadow rounded-lg">
          <h2 className="text-lg text-zinc-700">Tổng Playlist/Album</h2>
          <p className="text-3xl text-blue-500">{totalPlaylists}</p>
        </div>
        <div className="bg-white p-8 shadow rounded-lg">
          <h2 className="text-lg text-zinc-700">Tổng Ca Sĩ Yêu Thích</h2>
          <p className="text-3xl text-blue-500">{totalSingers}</p>
        </div>
        <div className="bg-white p-8 shadow rounded-lg">
          <h2 className="text-lg text-zinc-700">Phản Hồi Và Góp Ý</h2>
          <p className="text-3xl text-blue-500">{totalFeedback}</p>
        </div>
        <div className="bg-white p-8 shadow rounded-lg">
          <h2 className="text-lg text-zinc-700">Tổng Doanh Thu</h2>
          <p className="text-3xl text-green-500">
            {totalRevenue.toFixed(3)} VNĐ
          </p>
        </div>
      </div>
    </div>
  );
}

export default Statistical;
