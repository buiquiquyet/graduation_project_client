// export default ImageModal;
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Modal from "react-modal";
import "./Gallery.scss";
import { getImgCommon } from "@/shared/user-const";
// Đặt phần tử root cho modal
Modal.setAppElement("#root");

interface ImageModalProps {
  imgSrcList: string[]; // Danh sách các ảnh
  imgAlt?: string;
  indexImg?: number;
  className?: string
}

const ImageModal: React.FC<ImageModalProps> = ({
  imgSrcList,
  imgAlt = "Image",
  indexImg = 0,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Trạng thái cho chỉ số ảnh hiện tại

  const openModal = (index: number) => {
    setCurrentIndex(index); // Đặt chỉ số ảnh khi mở modal
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imgSrcList.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imgSrcList.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  return (
    <>
      {/* Danh sách ảnh có thể nhấn vào để mở modal */}
      <div
        // style={{ display: 'flex', flexWrap: 'wrap' }}
        // style={{ width: "100%", height: "100%", zIndex: 999 }}
        onClick={() => openModal(indexImg)}
        className={`${className} div-modal`}
      ></div>

      {/* Modal hiển thị ảnh phóng to */}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            padding: 0,
            border: "none",
            background: "transparent",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
        onAfterClose={closeModal}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
          onClick={closeModal} // Đóng modal khi nhấn vào phần bên ngoài ảnh
        >
          {/* Nút trước */}
          {imgSrcList && imgSrcList?.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // Ngăn chặn sự kiện click truyền vào modal
                goToPrevious();
              }}
              style={{
                left: "15px",
              }}
              className="button-gallery"
            >
              <FaChevronLeft color="white" style={{width:'40px', height:'40px'}} /> {/* Biểu tượng mũi tên trái */}
            </button>
          )}
          {/* Ảnh được hiển thị ở giữa modal với kích thước cố định */}
          <img
            src={getImgCommon(imgSrcList[currentIndex])} // Hiển thị ảnh dựa trên chỉ số hiện tại
            alt={imgAlt}
            style={{
              width: "80vw",
              height: "80vh",
              objectFit: "contain",
              maxWidth: "80vw", // Đảm bảo kích thước ảnh không vượt quá màn hình
              maxHeight: "80vh",
            }}
          />

          {/* Nút tiếp theo */}
          {imgSrcList && imgSrcList?.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // Ngăn chặn sự kiện click truyền vào modal
                goToNext();
              }}
              className="button-gallery"
              style={{
                right: "15px",
              }}
            >
              <FaChevronRight  color="white" style={{width:'40px', height:'40px'}}/> {/* Biểu tượng mũi tên phải */}
            </button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ImageModal;
