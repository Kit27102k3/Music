import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { apiGetChartHome } from "../../apis";
import RankList from "./RankList";

const active =
  "text-[24px] text-white py-[15px] font-bold border-b-4 border-pink-500";
const notActive = "text-[24px] text-white py-[15px] font-bold";

function WeekRank() {
  const { pid } = useParams();
  const [weekCharts, setWeekCharts] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await apiGetChartHome();
        if (response?.data?.err === 0) {
          const chartsData = response.data.data?.weekChart;
          const chartsArray = chartsData ? Object.values(chartsData) : [];
          setWeekCharts(chartsArray);
        } else {
          console.error("API error:", response?.data?.msg);
        }
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div>
      <div className="mt-12 px-[59px]">
        <h3 className="text-[40px] font-bold bg-gradient-to-r from-[#5861c8] to-[#c51f88] text-transparent bg-clip-text">
          BẢNG XẾP HẠNG TUẦN
        </h3>
        <div className="flex gap-10 mt-5">
          {weekCharts.map((item) => (
            <NavLink
              to={item?.link.split(".")[0]} 
              className={({ isActive }) => (isActive ? active : notActive)}
              key={item?.chartId}
            >
              {item?.country === "vn"
                ? "VIỆT NAM"
                : item?.country === "us"
                ? "US-UK"
                : item?.country === "korea"
                ? "K-POP"
                : ""}
            </NavLink>
          ))}
        </div>
        <div className="mt-5">
          <RankList
            number={100}
            isHideButton={true}
            data={weekCharts.find((item) => item?.link.includes(pid))?.items}
          />
        </div>
      </div>
    </div>
  );
}

export default WeekRank;