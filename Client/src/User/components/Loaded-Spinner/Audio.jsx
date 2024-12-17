import { memo } from "react";
import { Audio } from "react-loader-spinner";

const AudioComponent = () => {
  return (
    <Audio
      height="40"
      width="40"
      color="white"
      ariaLabel="audio-loading"
      wrapperStyle={{}}
      wrapperClass="wrapper-class"
      visible={true}
    />
  );
};

export default memo(AudioComponent);
