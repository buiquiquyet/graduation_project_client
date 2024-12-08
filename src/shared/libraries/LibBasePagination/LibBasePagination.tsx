import { Pagination } from "@mui/material";
import "./LibBasePagination.scss";
import { memo } from "react";
interface Props {
  totalPage?: number;
  onClick?: (event: any, newPage: any) => void;
  totalRecords?: number;
  pageNumber?: number;
  isShowTotalRecord?: boolean; // xem có show tất cả dòng không
}

const LibBasePagination: React.FC<Props> = ({
  totalPage,
  onClick,
  totalRecords,
  pageNumber,
  isShowTotalRecord = true,
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-4 w-100 pagination">
      {isShowTotalRecord && (
        <div
          className=" total-item"
        >
          <span>Tất cả {totalRecords} bản ghi</span>
        </div>
      )}
      <Pagination
        count={totalPage}
        page={pageNumber}
        onChange={onClick}
        className={"custom-pagination-ul-class"}
      />
    </div>
  );
};

export default memo(LibBasePagination);
