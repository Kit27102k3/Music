import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getArrSlider } from "../../ultis/fn";
import { useNavigate } from "react-router-dom";
import Section from "../../components/Section";
import NewRelease from "../../components/NewRelease";
import WeekChart from "../../components/WeekChart";
import NewReleaseCharts from "../../components/newReleaseChart";
import ChartSection from "../../components/ChartSection";
import Loading from "../../components/Loaded-Spinner/Loading";
import Radio from "../Radio/Radio";
import * as actions from "../../Store/Action";

export default function Discover() {
  const { banner, friday, chill, top100, hotAlbum } = useSelector(
    (state) => state.app
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const sliderEls = document.getElementsByClassName("slider-item");
    let min = 0;
    let max = 0;
    const intervalId = setInterval(() => {
      const list = getArrSlider(min, max, sliderEls.length - 1);
      for (let i = 0; i < sliderEls.length; i++) {
        sliderEls[i]?.classList?.remove(
          "animate-slide-right",
          "order-last",
          "z-20"
        );
        sliderEls[i]?.classList?.remove(
          "animate-slide-left",
          "order-first",
          "z-10"
        );
        sliderEls[i]?.classList?.remove(
          "animate-slide-left2",
          "order-2",
          "z-10"
        );

        if (list.some((item) => item === i)) {
          sliderEls[i].style.cssText = `display: block`;
        } else {
          sliderEls[i].style.cssText = `display: none`;
        }
      }
      list.forEach((item) => {
        if (item === max) {
          sliderEls[item]?.classList?.add(
            "animate-slide-right",
            "order-last",
            "z-20"
          );
        } else if (item === min) {
          sliderEls[item]?.classList?.add(
            "animate-slide-left",
            "order-first",
            "z-10"
          );
        } else {
          sliderEls[item]?.classList?.add(
            "animate-slide-left2",
            "order-2",
            "z-10"
          );
        }
      });
      min = min === sliderEls.length - 1 ? 0 : min + 1;
      max = max === sliderEls.length - 1 ? 0 : max + 1;
    }, 3000);
    if (banner ) {
      setIsLoading(false);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleClickBanner = (item) => {
    if (item?.type === 1) {
      const curSongId = item.encodeId;
      dispatch(actions.setCurSongId(curSongId));
      dispatch(actions.play(true));
      dispatch(actions.setPlaylist(null));
    } else if (item?.type === 4) {
      const albumPath = item?.link?.split(".")[0];
      navigate(albumPath);
    } else {
      dispatch(actions.setPlaylist(null));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="w-full overflow-hidden px-[59px]">
        <div className="flex w-full gap-8 pt-8">
          {banner?.map((item, index) => (
            <img
              key={item.encodeId}
              onClick={() => handleClickBanner(item)}
              src={item.banner}
              className={`slider-item flex-1 object-contain cursor-pointer w-[30%] rounded-lg ${
                index < 1 ? "block" : "hidden"
              }`}
            />
          ))}
        </div>
      </div>

      <Section sectionData={friday} />
      <Section sectionData={chill} />
      <NewReleaseCharts />
      <ChartSection />
      <WeekChart />
      <Section sectionData={top100} />
      <NewRelease />
      <Section sectionData={hotAlbum} />
      <Radio isHideAll={true} />
    </>
  );
}
