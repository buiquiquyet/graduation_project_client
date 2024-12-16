import { Input } from "antd";

interface Props {
  placeholder?: string;
  style?: React.CSSProperties;
  onChange?: (value: any) => void;
  // valueSearch?: string
}
const LibBaseSearch: React.FC<Props> = ({ placeholder, style, onChange }) => {
  return (
    <div className="d-flex">
      <Input
        type="text"
        placeholder={placeholder ?? "Tìm kiếm"}
        onChange={onChange}
        // value={valueSearch}
        aria-label="Search"
        aria-describedby="basic-addon1"
        style={{
          width: "300px",
          borderRadius: "10px",
          ...style,
        }}
      />
    </div>
  );
};

export default LibBaseSearch;
