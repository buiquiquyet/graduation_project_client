import {  Dropdown } from "antd";
import './BaseOptionSetting.scss'
interface Props {
  items?: any[];
  onClick?: (key: string, id: string) => void;
  icon?: any;
  idItem?: any
}
const BaseOptionSettings: React.FC<Props> = ({ items, onClick, icon, idItem  }) => {
    const handleItemClick = (key: any) => {
        if (onClick) {
          onClick(key, idItem); 
        }
      };
  return (
    <Dropdown
      menu={{
        items,
        onClick: handleItemClick,
      }}
      trigger={['click']}
      placement="bottomLeft"
      arrow={{
        pointAtCenter: true,
      }}
      className="base-option-setting"
    >
      <div>{icon}</div>
    </Dropdown>
  );
};

export default BaseOptionSettings;
