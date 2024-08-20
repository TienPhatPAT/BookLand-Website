// import "./slick.scss";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import React, { useState, useEffect } from "react";

// const HomeSlider = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const url = "http://localhost:4000/banner"; // URL của API bạn muốn fetch

//     const fetchData = async () => {
//       try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []); // Mảng rỗng nghĩa là useEffect chỉ chạy một lần khi component mount

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div className="image-slider-container">
//       <Slider {...settings}>
//         {data.map((item, index) => (
//           <div
//             key={index}
//             className="slider-img"
//             style={{
//               "--background-url": `url(${item.imageUrl})`,
//             }}
//           >
//             {/* <img src={item.imageUrl} alt={`Slide ${index}`} /> */}
//             <div
//               style={{
//                 "--background-url": `url(${item.imageUrl})`,
//               }}
//             />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default HomeSlider;
import "./slick.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as Icon from "../../../../components/Icon";
import React, { useState, useEffect } from "react";
import { fetchApi, getApiEnv } from "../../../../utils/api";
import { Link } from "react-router-dom";

const HomeSlider = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const slider = React.useRef(null);

  useEffect(() => {
    // const url = "http://localhost:4000/banner"; // URL của API bạn muốn fetch
    fetchApi(getApiEnv() + "/banner")
      .then((data) => {
        console.log("Fetched data:", data); // Logging dữ liệu để kiểm tra
        setData(data?.data);
      })
      .catch((error) => {
        console.error("Fetch error:", error); // Logging lỗi để kiểm tra
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // Mảng rỗng nghĩa là useEffect chỉ chạy một lần khi component mount

  const Settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    draggable: true,
    arrows: false,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No data available</div>; // Kiểm tra dữ liệu trước khi render
  }

  return (
    <div className="image-slider-container">
      <button
        className="slider-arrow slider-arrow--left"
        onClick={() => slider?.current?.slickPrev()}
      >
        <Icon.Arrowright />
      </button>

      <Slider ref={slider} {...Settings}>
        {data.map((item, index) => {
          return (
            <Link to={item.url} key={index} className="slider-img">
              {/* <img src="https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner_web_v2/0/0/0/3403.jpg?v=1&w=1920&h=600" /> */}
              <div
                style={{
                  "--background-url": `url("${item.image}")`,
                }}
              />
            </Link>
          );
        })}
      </Slider>

      <button
        className="slider-arrow slider-arrow--right"
        onClick={() => slider?.current?.slickNext()}
      >
        <Icon.Arrowleft />
      </button>
    </div>
  );
};

export default HomeSlider;
