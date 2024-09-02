import {  SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation"; // Import Swiper Navigation styles
import "swiper/css/pagination"; // Import Swiper Pagination styles
import Slide from "@/shared/libraries/Slide";
import { SlideHomeConstants } from "./constances/SlideHomeConstants";

// Example public URL

const SlideHome = () => {
  const slides: any[] = SlideHomeConstants.ArrSlideImg();
  return (
    <Slide  slidesPerView={4}>
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="item">
          <div className="cause-entry">
            <a
              href="#"
              className="img"
              style={{
                backgroundImage: `url(${slide.img})`,
              }}
            />
            <div className="text p-3 p-md-4">
              <h3>
                <a href="#">{slide.title}</a>
              </h3>
              <p>{slide.description}</p>
              <span className="donation-time mb-3 d-block">
                {slide.donationTime}
              </span>
              <div className="progress custom-progress-success">
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: `${slide.progress}%` }}
                  aria-valuenow={slide.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <span className="fund-raised d-block">
                {slide.raised} raised of {slide.goal}
              </span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Slide>
  );
};

export default SlideHome;
