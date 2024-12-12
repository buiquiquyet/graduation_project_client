import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import { memo } from "react";
import "./LibTable.scss";
import { ETableColumnType } from "./constants/LibTable.enum";
import BaseOptionSettings from "./base-options-setting/BaseOptionSetting";
import { MyContext } from "@/App";
import ImageModal from "../gallery-component/Gallery";
import { convertDate, formatCurrency, getImgCommon } from "@/shared/user-const";
import { TabListProjectFundProcessing } from "@/app/modules/user-modules/project-fund-user-management/constants/Project-fund-user.enum";
import LibBaseSearch from "../lib-search-component/LibSearchComponent";

interface PropsTable {
  columns: any[];
  data: any[];
  itemOptions?: any[];
  setRowIdSelects?: any;
  rowIdSelects?: any;
  onClickShowOptios?: (key: string, id: string) => void;
  onClickOpenFile?: (id: string) => void;
  onClickOpenNote?: (id: string) => void;
  onRowClick?: (id: string) => void;
}
const LibTable: React.FC<PropsTable> = ({
  columns,
  data,
  itemOptions,
  setRowIdSelects,
  rowIdSelects,
  onClickShowOptios,
  onClickOpenFile,
  onClickOpenNote,
  onRowClick,
}) => {
  const context = useContext(MyContext);
  if (!context) {
    return null;
  }
  const { publicUrl } = context;
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const handleSelectAllChange = (event: any) => {
    if (data) {
      const isChecked = event.target.checked;
      setSelectAll(isChecked);
      const selectedRowIndexes = isChecked ? data?.map((item) => item.Id) : [];
      setSelectedRows(selectedRowIndexes);
      setRowIdSelects(selectedRowIndexes);
    }
  };

  const handleCheckboxChange = (event: any, rowIndex: string) => {
    const isChecked = event.target.checked;
    let newSelectedRows = [...selectedRows];
    if (isChecked) {
      newSelectedRows.push(rowIndex);
    } else {
      newSelectedRows = newSelectedRows.filter((index) => index !== rowIndex);
    }
    setSelectedRows(newSelectedRows);
    setRowIdSelects(newSelectedRows);
    setSelectAll(newSelectedRows.length === data.length);
  };
  // trạng thái item
  const getStatusItem = (status: TabListProjectFundProcessing): any => {
    if (status === TabListProjectFundProcessing.PROCESSING)
      return { label: "Chờ duyệt", value: "#BB8D0B" };
    else if (status === TabListProjectFundProcessing.APPROVED)
      return { label: "Đã duyệt", value: "#0079C1" };
    return { label: "Từ chối duyệt", value: "#F87171" };
  };
  useEffect(() => {
    if (rowIdSelects && rowIdSelects.length === 0) {
      setSelectAll(false);
      setSelectedRows([]);
    }
  }, [rowIdSelects]);
  return (
    <div>
      <LibBaseSearch style={{ marginBottom: "30px" }} />
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              {columns?.map((column, index) => (
                <TableCell
                  key={index}
                  style={{
                    borderRight: "1px solid #ddd",
                    background: "#e5e5e5",
                    fontWeight: "bold",
                  }}
                >
                  {column.type === ETableColumnType.CHECKBOX_ACTION ? (
                    <Checkbox
                      onChange={handleSelectAllChange}
                      checked={selectAll}
                    />
                  ) : column.type === ETableColumnType.ICON ? (
                    <div
                      onClick={(event) => {
                        event.stopPropagation(); // Ngừng sự kiện lan truyền khi click vào row
                      }}
                    >
                      <SVG src={publicUrl + "/icons/setting.svg"} />
                    </div>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length > 0 ? (
              data?.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  onClick={(event) => {
                    onRowClick && onRowClick(row.Id); // Gọi hàm khi click vào row
                    event.stopPropagation(); // Ngừng sự kiện lan truyền khi click vào row
                  }}
                  style={{ cursor: "pointer" }} // Thêm con trỏ "pointer" khi hover
                >
                  {columns.map((column, colIndex) => (
                    <TableCell
                      key={colIndex}
                      style={{
                        borderRight: "1px solid #ddd",
                        width:
                          column.type === ETableColumnType.NOTE ? "150px" : "",
                      }}
                    >
                      {(() => {
                        switch (column.type) {
                          case ETableColumnType.CHECKBOX_ACTION:
                            return (
                              <div style={{ textAlign: "center" }}>
                                <Checkbox
                                  checked={selectedRows.includes(row.Id)}
                                  onChange={(event) => {
                                    handleCheckboxChange(event, row.Id);
                                  }}
                                  onClick={(event) => event.stopPropagation()}
                                />
                              </div>
                            );

                          case ETableColumnType.ICON:
                            return (
                              <div
                                onClick={(event) => {
                                  event.stopPropagation(); // Ngừng sự kiện lan truyền khi click vào row
                                }}
                                style={{ textAlign: "center" }}
                              >
                                <BaseOptionSettings
                                  idItem={row.Id}
                                  onClick={onClickShowOptios}
                                  icon={
                                    <SVG
                                      src={publicUrl + "/icons/moreSetting.svg"}
                                    ></SVG>
                                  }
                                  items={itemOptions}
                                />
                              </div>
                            );

                          case ETableColumnType.FILE:
                            return (
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  Number(row[column.accessor]) > 0
                                    ? onClickOpenFile?.(row.Id)
                                    : null
                                }
                              >
                                {`(${row[column.accessor]} file)`}
                              </div>
                            );

                          case ETableColumnType.IMAGE:
                            return (
                              <div
                                style={{
                                  cursor: "pointer",
                                  position: "relative",
                                  textAlign: "center",
                                }}
                                onClick={(event) => event.stopPropagation()}
                              >
                                <img
                                  className="img-table"
                                  src={
                                    Array.isArray(row[column.accessor])
                                      ? getImgCommon(row[column.accessor]?.[0]) // Nếu là mảng, lấy phần tử đầu tiên
                                      : getImgCommon(row[column.accessor]) // Nếu là chuỗi, sử dụng chuỗi trực tiếp
                                  }
                                />
                                <ImageModal
                                  className="img-table-modal"
                                  imgSrcList={
                                    Array.isArray(row[column.accessor])
                                      ? row[column.accessor].map(
                                          (img: string) => img
                                        ) // Nếu là mảng, xử lý từng phần tử
                                      : [row[column.accessor]] // Nếu là string, chuyển thành mảng với 1 phần tử
                                  }
                                ></ImageModal>
                              </div>
                            );
                          case ETableColumnType.VIDEO:
                            return (
                              <div
                                style={{
                                  cursor: "pointer",
                                  position: "relative",
                                  textAlign: "center",
                                }}
                                onClick={(event) => event.stopPropagation()}
                              >
                                {/* Hiển thị video thay vì hình ảnh */}
                                {row[column.accessor] ? (
                                  <video
                                    className="video-table"
                                    style={{
                                      width: "70px", // Điều chỉnh kích thước video cho phù hợp
                                      height: "70px",
                                      objectFit: "cover", // Cắt video nếu cần thiết để không bị mờ
                                    }}
                                    src={
                                      Array.isArray(row[column.accessor])
                                        ? getImgCommon(
                                            row[column.accessor]?.[0]
                                          ) // Nếu là mảng, lấy phần tử đầu tiên
                                        : getImgCommon(row[column.accessor]) // Nếu là chuỗi, sử dụng chuỗi trực tiếp
                                    }
                                    controls // Hiển thị các điều khiển video (play, pause, volume, v.v.)
                                    autoPlay={false} // Tùy chọn tự động phát, bạn có thể thay đổi nếu cần
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                            );
                          case ETableColumnType.NOTE:
                          case ETableColumnType.NUMBER:
                            return (
                              <div
                                className="text-note "
                                style={{
                                  padding:
                                    row[column.accessor] === "" ? "20px" : "",
                                }}
                              >
                                {column.type === ETableColumnType.NUMBER
                                  ? formatCurrency(row[column.accessor])
                                  : row[column.accessor]}
                              </div>
                            );

                          case ETableColumnType.TEXT_QUILL:
                            return (
                              <div
                                className="text-note "
                                dangerouslySetInnerHTML={{
                                  __html: row[column.accessor],
                                }}
                              ></div>
                            );

                          case ETableColumnType.STATUS:
                            return (
                              <div>
                                <div
                                  className="status-col"
                                  style={{
                                    minWidth: "120px",
                                    background: getStatusItem(
                                      row[column.accessor]
                                    )?.value,
                                  }}
                                >
                                  {getStatusItem(row[column.accessor])?.label}
                                </div>
                              </div>
                            );

                          case ETableColumnType.DATE:
                            return (
                              <div>{convertDate(row[column.accessor])}</div>
                            );

                          default:
                            return (
                              <div className="text-note">
                                {row[column.accessor]}
                              </div>
                            );
                        }
                      })()}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="w-100 p-3">
                  Không có dữ liệu!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default memo(LibTable);
