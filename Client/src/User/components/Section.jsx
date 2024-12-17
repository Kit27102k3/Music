import { memo, useState, useEffect } from "react";
import SectionItem from "./SectionItem";
import Loading from "../components/Loaded-Spinner/Loading";

const Section = ({ sectionData, number, isHide, sizeThumbnail }) => {
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const n = showAll ? sectionData?.items?.length : number || 5;

  useEffect(() => {
    if (sectionData && sectionData.items) {
      setIsLoading(false);
    }
  }, [sectionData]);

  return (
    <div className="mt-12 px-[59px] flex flex-col gap-5">
      {isLoading ? (
        <div className="flex items-center justify-center h-40">
          <Loading />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            {!isHide && (
              <h3 className="text-[20px] font-bold">{sectionData?.title}</h3>
            )}
            {!isHide && (
              <span
                className="text-xs cursor-pointer hover:text-pink-500"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "ẨN BỚT" : "TẤT CẢ"}
              </span>
            )}
          </div>
          <div className="grid grid-cols-5 gap-[28px]">
            {sectionData &&
              sectionData.items
                ?.filter((item, index) => index < n)
                .map((item) => (
                  <SectionItem
                    title={item.title}
                    link={item.link}
                    sortDescription={item.sortDescription}
                    thumbnailM={item.thumbnailM}
                    key={item.encodeId}
                    sectionData={item}
                    sizeThumbnail={sizeThumbnail}
                  />
                ))}
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Section);
