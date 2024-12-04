import "./LibCategoryAbsolute.scss";
interface LibCategoryAbsoluteProps {
  value: any; // giá trị truyền vào
}
const LibCategoryAbsolute: React.FC<LibCategoryAbsoluteProps> = ({ value }) => {
  return (
    <>
      {value && (
        <div className="absolute-category">
          <span>{value}</span>
        </div>
      )}
    </>
  );
};
export default LibCategoryAbsolute;
