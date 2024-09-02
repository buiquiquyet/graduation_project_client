import { Swiper } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation"; // Import Swiper Navigation styles
import "swiper/css/pagination"; // Import Swiper Pagination styles
import { Autoplay, Pagination } from "swiper/modules";

// Example public URL
interface PropsSlide {
  slidesPerView: number;
  autoPlay?: number,
  children: React.ReactNode
}
const Slide: React.FC<PropsSlide> = ({ slidesPerView = 4, autoPlay = 2500, children }) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={slidesPerView} // Show 4 slides at once
      pagination={{ clickable: true }} // Add pagination
      autoplay={{ delay: autoPlay, disableOnInteraction: false }} // Auto-slide with delay
      loop // Enable infinite loop
      modules={[Pagination, Autoplay]} // Include necessary modules
      className="carousel-cause"
      breakpoints={{
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        // when window width is >= 1024px
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      }}
    >
      {children}
    </Swiper>
  );
};

export default Slide;
