import { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import icons from "../../ultis/icons";
import SongItems from "../../components/SongItems";
import Loading from "../../components/Loaded-Spinner/Loading";
import { useSelector } from "react-redux";
import _ from "lodash";
const { BsFillPlayFill } = icons;
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import ListChart from "./ListChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function Zingchart() {
  const { chart, promotes } = useSelector((state) => state.app);
  const [data, setData] = useState(null);
  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  });
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const chartRef = useRef();

  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: "rgba(255,255,255,0.1)", drawTicks: false },
        min: chart.minScore,
        max: chart.maxScore,
        border: { dash: [3, 4] },
      },
      x: {
        ticks: { color: "white" },
        grid: { color: "transparent" },
      },
    },
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
        external: ({ tooltip }) => {
          if (!chartRef || !chartRef.current) return;
          if (tooltip.opacity === 0) {
            if (tooltipState.opacity !== 0)
              setTooltipState((prev) => ({ ...prev, opacity: 0 }));
            return;
          }

          const counters = [];
          for (let i = 0; i < 3; i++) {
            counters.push({
              data: chart?.chart?.items[Object.keys(chart?.chart?.items)[i]]
                ?.filter((item) => +item.hour % 2 === 0)
                ?.map((item) => item.counter),
              encodeId: Object.keys(chart?.chart?.items)[i],
            });
          }
          const rs = counters.find((i) =>
            i.data.some(
              (n) => n === +tooltip.body[0]?.lines[0]?.replace(".", "")
            )
          );
          setSelected(rs?.encodeId);
          const newTooltipData = {
            opacity: 1,
            left: tooltip.caretX,
            top: tooltip.caretY,
          };
          if (!_.isEqual(tooltipState, newTooltipData))
            setTooltipState(newTooltipData);
        },
      },
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
  };

  useEffect(() => {
    setIsLoading(true); 
    setIsLoading(true); // Start loading
    const labels = chart?.chart?.times
      ?.filter((item) => +item.hour % 2 === 0)
      ?.map((item) => `${item.hour}:00`);
    const datasets = [];
    if (chart?.chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chart?.chart?.items[Object.keys(chart?.chart?.items)[i]]
            ?.filter((item) => +item.hour % 2 === 0)
            ?.map((item) => item.counter),
          borderColor: i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          tension: 0.3,
          borderWidth: 2,
          pointHoverRadius: 5,
          pointBackgroundColor: "white",
          pointHitRadius: 5,
          pointBorderColor:
            i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          animation: false,
          pointHoverBorderWidth: 5,
        });
      }
      setData({ labels, datasets });
    }

    setIsLoading(false); 
    setIsLoading(false); // Stop loading
  }, [chart]);
  

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="mt-8 px-[60px] w-full h-full">
      <div className="flex flex-col px-4 md:px-8 lg:px-16">
        <div className="flex items-center gap-2">
        <h3 className="text-[40px] font-bold bg-gradient-to-r from-[#5861c8] to-[#c51f88] text-transparent bg-clip-text">
            #zingchart
          </h3>
          <span className="p-2 rounded-full bg-black text-white cursor-pointer hover:bg-purple-900 hover:bg-opacity-50">
            <BsFillPlayFill size={20} />
          </span>
        </div>
        <div className="w-full h-[100%] md:h-[400px] lg:h-[500px]">
          {data && <Line data={data} ref={chartRef} options={options} />}
          <div
            className="tooltip"
            style={{
              top: tooltipState.top,
              left: tooltipState.left,
              opacity: tooltipState.opacity,
              position: "absolute",
              transform: "translate(-0%, 50%)",
            }}
          >
            <SongItems
              thumbnail={
                promotes?.items?.find((i) => i?.encodeId === selected)
                  ?.thumbnail
              }
              title={
                <span className="text-black">
                  {
                    promotes?.items?.find((i) => i?.encodeId === selected)
                      ?.title
                  }
                </span>
              }
              artists={
                <span className="text-black">
                  {
                    promotes?.items?.find((i) => i?.encodeId === selected)
                      ?.artistsNames
                  }
                </span>
              }
              sid={
                promotes?.items?.find((i) => i?.encodeId === selected)?.encodeId
              }
              style="bg-white"
            />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <ListChart />
      </div>
    </div>
  );
}
