import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../App.css";
import { img1, img2, img3, img4 } from "../assets/Images/img";

const Banner = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div className="w-full hidden md:block h-[400px] lgl:h-[600px] relative">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="w-full h-full"
      >
        <div className="absolute inset-0 bg-[#33333386] rounded-3xl z-10"></div>
        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={img1}
              alt="img1"
              className="w-full h-full object-contain rounded-3xl"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={img2}
              alt="img2"
              className="w-full h-full object-contain rounded-3xl"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={img3}
              alt="img3"
              className="w-full h-full object-contain rounded-3xl"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={img4}
              alt="img4"
              className="w-full h-full object-contain rounded-3xl"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
        </SwiperSlide>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
};

export default Banner;
