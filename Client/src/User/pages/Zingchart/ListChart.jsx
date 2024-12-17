import { useEffect, useState } from "react";
import { apiGetChartHome } from "../../../apis";
import RankList from "../../components/RankList";
import Loading from "../../components/Loaded-Spinner/Loading";
import icons from "../../ultis/icons";

const { BsFillPlayFill } = icons;

function ListChart() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await apiGetChartHome();
        if (response.data.err === 0) {
          setChartData(response.data.data);
        } else {
          setError("Error fetching data: " + response.data.msg);
        }
      } catch (error) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchChartData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full mt-10">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!chartData) {
    return <div className="text-center mt-10">No data available</div>;
  }

  return (
    <div className="w-full px-4 md:px-8 lg:px-16">
      <div className="mt-6 min-h-screen">
        <div>
          <RankList data={chartData?.RTChart?.items} number={10} />
        </div>
        <div>
          <div className="gap-2 mt-10">
            <h3 className="text-[40px] font-bold bg-gradient-to-r from-[#5861c8] to-[#c51f88] text-transparent bg-clip-text">
              BẢNG XẾP HẠNG TUẦN
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {Object.entries(chartData?.weekChart)?.map((item, index) => (
                <div
                  className="flex flex-col bg-purple-700 bg-opacity-20 rounded-md p-4"
                  key={index}
                >
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg md:text-xl">
                      {item[0] === "vn"
                        ? "VIỆT NAM"
                        : item[0] === "us"
                        ? "US-UK"
                        : item[0] === "korea"
                        ? "K-POP"
                        : ""}
                    </h3>
                    <span className="bg-pink-500 p-2 rounded-full">
                      <BsFillPlayFill size={20} />
                    </span>
                  </div>
                  <div className="mt-2">
                    <RankList
                      data={item[1]?.items}
                      number={5}
                      link={item[1]?.link}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-[120px] md:h-[120px] w-full"></div>
      </div>
    </div>
  );
}

export default ListChart;
