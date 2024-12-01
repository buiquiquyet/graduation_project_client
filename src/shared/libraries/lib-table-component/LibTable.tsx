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
import config from "@/shared/ultils/config";
import ImageModal from "../gallery-component/Gallery";
import { convertDate, getImgCommon } from "@/shared/user-const";

interface PropsTable {
  columns: any[];
  data: any[];
  itemOptions?: any[];
  setRowIdSelects?: any;
  rowIdSelects?: any;
  onClickShowOptios?: (key: any, id: any) => void;
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
  useEffect(() => {
    if (rowIdSelects && rowIdSelects.length === 0) {
      setSelectAll(false);
      setSelectedRows([]);
    }
  }, [rowIdSelects]);
  return (
    <div>
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
                    <SVG src={publicUrl + "/icons/setting.svg"}></SVG>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? (
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
                      {column.type === ETableColumnType.CHECKBOX_ACTION ? (
                        <div style={{ textAlign: "center" }}>
                          <Checkbox
                            checked={selectedRows.includes(row.Id)}
                            onChange={(event) => {
                              handleCheckboxChange(event, row.Id);
                            }}
                            onClick={(event) => event.stopPropagation()}
                          />
                        </div>
                      ) : column.type === ETableColumnType.ICON ? (
                        <div style={{ textAlign: "center" }}>
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
                      ) : column.type === ETableColumnType.FILE ? (
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            Number(row[column.accessor]) > 0
                              ? onClickOpenFile?.(row.Id)
                              : null
                          }
                        >
                          {`(${row[column.accessor]}  file)`}
                        </div>
                      ) : column.type === ETableColumnType.IMAGE ? (
                        <div
                          style={{ cursor: "pointer", position: "relative" }}
                          onClick={(event) => event.stopPropagation()}
                        >
                          <img
                            className="img-table"
                            src={
                              Array.isArray(row[column.accessor])
                                ? config.FILE_URL + row[column.accessor]?.[0] // Nếu là mảng, lấy phần tử đầu tiên
                                : config.FILE_URL + row[column.accessor] // Nếu là chuỗi, sử dụng chuỗi trực tiếp
                            }
                          />
                          <ImageModal
                            className="img-table-modal"
                            imgSrcList={
                              Array.isArray(row[column.accessor])
                                ? row[column.accessor].map((img: string) =>
                                    getImgCommon(img)
                                  ) // Nếu là mảng, xử lý từng phần tử
                                : [getImgCommon(row[column.accessor])] // Nếu là string, chuyển thành mảng với 1 phần tử
                            }
                          ></ImageModal>
                        </div>
                      ) : column.type === ETableColumnType.NOTE ? (
                        <div
                          className="text-note "
                          style={{
                            padding: row[column.accessor] === "" ? "20px" : "",
                          }}
                          onClick={() => {
                            row[column.accessor]
                              ? onClickOpenNote?.(row.Id)
                              : null;
                          }}
                        >
                          {row[column.accessor]}{" "}
                        </div>
                      ) : column.type === ETableColumnType.TEXT_QUILL ? (
                        <div
                          className="text-note "
                          dangerouslySetInnerHTML={{
                            __html: row[column.accessor],
                          }}
                        ></div>
                      ) : column.type === ETableColumnType.STATUS ? (
                        <div>
                          <div
                            className="status-col"
                            style={{
                              minWidth: "120px",
                              background:
                                row[column.accessor] === "0" ||
                                row[column.accessor] === ""
                                  ? "#94b8b8"
                                  : row[column.accessor] === "1"
                                  ? "#33ff33"
                                  : "red",
                            }}
                          >
                            {row[column.accessor] === "0" ||
                            row[column.accessor] === ""
                              ? "Chờ duyệt"
                              : row[column.accessor] === "1"
                              ? "Đã duyệt"
                              : "Không duyệt"}
                          </div>
                        </div>
                      ) : column.type === ETableColumnType.DATE ? (
                        <div>
                          <div>{convertDate(row[column.accessor])}</div>
                        </div>
                      ) : (
                        <div className="text-note">{row[column.accessor]}</div>
                      )}
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
