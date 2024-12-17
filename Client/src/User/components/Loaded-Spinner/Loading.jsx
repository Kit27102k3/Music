import { Triangle, RotatingLines } from "react-loader-spinner";
import { memo } from "react";

const Loading = () => {
  return (
    <Triangle
      height="80"
      with="80"
      color="black"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );
};

export default memo(Loading);

