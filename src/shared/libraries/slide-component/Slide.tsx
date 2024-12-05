import { Swiper } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation"; // Import Swiper Navigation styles
import "swiper/css/pagination"; // Import Swiper Pagination styles
import { Autoplay, Pagination } from "swiper/modules";
import { memo } from "react";

// Example public URL
interface PropsSlide {
  slidesPerView: number;
  autoPlay?: number,
  children: React.ReactNode
}
const Slide: React.FC<PropsSlide> = ({ slidesPerView, autoPlay = 2500, children }) => {
  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 5,
    },
    480: {
      slidesPerView: Math.min(2, slidesPerView), // Đảm bảo không vượt quá slidesPerView truyền vào
      spaceBetween: 10,
    },
    768: {
      slidesPerView: Math.min(3, slidesPerView), // Đảm bảo không vượt quá slidesPerView truyền vào
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: Math.min(4, slidesPerView), // Đảm bảo không vượt quá slidesPerView truyền vào
      spaceBetween: 20,
    },
    // Bạn có thể thêm nhiều breakpoints khác nếu cần
    1200: {
      slidesPerView: slidesPerView, // Trực tiếp sử dụng giá trị slidesPerView cho màn hình lớn
      spaceBetween: 30,
    },
  };

  return (
    <Swiper
    style={{zIndex: '998'}}
      spaceBetween={10}
      slidesPerView={slidesPerView} // Show 4 slides at once
      pagination={{ clickable: true }} // Add pagination
      autoplay={{ delay: autoPlay, disableOnInteraction: false }} // Auto-slide with delay
      loop // Enable infinite loop
      modules={[Pagination, Autoplay]} // Include necessary modules
      className="carousel-cause"
      breakpoints={breakpoints}
    >
      {children}
    </Swiper>
  );
};

export default memo(Slide);
