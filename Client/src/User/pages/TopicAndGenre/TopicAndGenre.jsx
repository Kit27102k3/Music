import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getHome } from "../../../apis";
import Section from "../../components/Section";

function TopicAndGenre() {
  const { chill } = useSelector((state) => state.app);
  console.log(chill);

  return (
    <div className="px-[60px]">
      <div className="flex justify-center">
        {Array.isArray(chill) &&
          chill?.map((item, index) => (
            <img
              key={index}
              className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
              src={item.chill}
              alt=""
            />
          ))}
      </div>
      <h2 className="text-3xl font-bold mb-2 mt-10">Nổi Bật</h2>
      <div >
        <Section sectionData={chill}/>
      </div>
    </div>
  );
}

export default TopicAndGenre;
