import image1 from "../../../assets/vite.svg";
import image2 from "../../../assets/background-theme/backroundThemes/1.jpg";
import image3 from "../../../assets/background-theme/backroundThemes/2.jpg";
import image4 from "../../../assets/background-theme/backroundThemes/3.jpg";
import image5 from "../../../assets/background-theme/backroundThemes/4.jpg";
import image6 from "../../../assets/background-theme/backroundThemes/5.jpg";
import image7 from "../../../assets/background-theme/backroundThemes/6.jpg";
import image8 from "../../../assets/background-theme/backroundThemes/7.jpg";

function Notifications({ onChangeBackground }) {
  const topics = [
    { src: image1, alt: "DNC Music Awards", label: "DNC Music Awards" },
    { src: image2, alt: "Tháp Eiffel", label: "Tháp Eiffel" },
  ];

  const singers = [
    { src: image3, alt: "Rose", label: "Rose" },
    { src: image4, alt: "IU", label: "IU" },
    { src: image5, alt: "Ji Chang Wook", label: "Ji Chang Wook" },
    { src: image6, alt: "Lisa", label: "Lisa" },
    { src: image7, alt: "Jennie Kim", label: "Jennie Kim" },
    { src: image8, alt: "Jisoo", label: "Jisoo" },
  ];

  const handleClick = (src) => {
    if (onChangeBackground) {
      onChangeBackground(src);
    }
  };

  return (
    <div className="w-[900px] bg-purple-700 text-white rounded-lg shadow-lg p-2">
      <div className="p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-primary">Giao diện</h2>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Chủ đề</h3>
          <div className="flex space-x-4 mt-2">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="px-4 py-1 rounded-lg cursor-pointer"
                onClick={() => handleClick(topic.src)}
              >
                <img
                  src={topic.src}
                  alt={topic.alt}
                  className="rounded-md w-[126px] h-[84px] mb-1"
                />
                <p className="text-center text-xs">{topic.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Nghệ Sĩ</h3>
            <div className="grid grid-cols-5 mt-2">
              {singers.map((singer, index) => (
                <div
                  key={index}
                  className="px-4 py-1 rounded-lg cursor-pointer"
                  onClick={() => handleClick(singer.src)}
                >
                  <img
                    src={singer.src}
                    alt={singer.alt}
                    className="rounded-md w-[126px] h-[84px] mb-1"
                  />
                  <p className="text-center text-xs">{singer.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
