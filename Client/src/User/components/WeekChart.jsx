import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function WeekChart() {
  const { weekchart } = useSelector((state) => state.app);

  return (
    <div>
      <div className="flex items-center px-[43px] p w-full mt-12">
        {weekchart?.map((item, index) => (
          <Link
            to={item?.link?.split(".")[0]}
            key={index}
            className="flex-1 px-4"
          >
            <img
              className="w-full object-cover rounded-md h-[100px]"
              src={item.cover}
              alt="cover"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default WeekChart;
