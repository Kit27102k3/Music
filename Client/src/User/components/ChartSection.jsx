import { memo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BgChart from "../../assets/bg-chart.jpg";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import SongItems from "./SongItems";
import _ from "lodash";
import { Link } from "react-router-dom";
import icons from "../ultis/icons";

const { BsFillPlayFill } = icons;

function ChartSection() {
  const [data, setData] = useState(null);
  const { chart, promotes } = useSelector((state) => state.app);
  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  });

  const [selected, setSelected] = useState(null);
  const chartRef = useRef();
  const navigate = useNavigate();
  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRadio: false,
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
            {
              counters.push({
                data: chart?.chart?.items[Object.keys(chart?.chart?.items)[i]]
                  ?.filter((item) => +item.hour % 2 === 0)
                  ?.map((item) => item.counter),
                encodeId: Object.keys(chart?.chart?.items)[i],
              });
            }
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
  }, [chart]);

  return (
    <div className="px-[59px] mt-12 relative max-h-[380px]">
      <img
        src={BgChart}
        alt="bg-chart"
        className="w-full max-h-[380px] object-cover rounded-md"
      />
      <div className="absolute top-0 left-[59px] bg-[rgba(51,16,76,0.95)] right-[59px] bottom-0 z-10 rounded-lg"></div>
      <div className="absolute top-0 left-[59px] right-[59px] bottom-0 z-50 p-5 flex flex-col gap-8 rounded-md">
        <Link to={"/zing-chart"} className="flex items-center gap-2">
          <h3 className="text-[40px] font-bold bg-gradient-to-r from-[#5861c8] to-[#c51f88] text-transparent bg-clip-text">
            #zingchart
          </h3>
          <span className="p-1 rounded-full bg-black">
            <BsFillPlayFill />
          </span>
        </Link>
        <div className="flex gap-4 h-full">
          <div className="flex-4 flex items-center flex-col h-2 gap-4 text-xs">
            {chart?.items
              ?.filter((i, index) => index < 3)
              ?.map((item, index) => (
                <SongItems
                  key={item.id || index}
                  thumbnail={item.thumbnail}
                  title={item.title}
                  artists={item.artistsNames}
                  sid={item.encodeId}
                  order={index + 1}
                  percent={Math.round(
                    (+item.score * 100) / +chart?.chart?.totalScore
                  )}
                  percentSize="items-center justify-between"
                  style="text-white bg-[hsla(0, 0%, 100%, .07)] hover:bg-purple-900 hover:bg-opacity-50"
                />
              ))}
            <Link
              className="w-[118px] h-[33px] border text-center p-2 rounded-full border-white font-bold cursor-pointer"
              to={"/zing-chart"}
            >
              <span>Xem thêm</span>
            </Link>
          </div>
          <div className="flex-6 h-[100%] relative">
            {data && <Line data={data} ref={chartRef} options={options} />}
            <div
              className="tooltip"
              style={{
                top: tooltipState.top,
                left: tooltipState.left,
                opacity: tooltipState.opacity,
                position: "absolute",
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
                  promotes?.items?.find((i) => i?.encodeId === selected)
                    ?.encodeId
                }
                style="bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ChartSection);
