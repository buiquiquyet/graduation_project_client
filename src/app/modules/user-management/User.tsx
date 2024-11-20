import { MyContext } from "@/App";
import "./User.scss";
import { useContext, useEffect } from "react";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import { UserFields } from "./constants/User.interface";
import UserEdit from "./pages/User-edit";


export default function User() {
  const context = useContext(MyContext);
  if (!context) {
    return null;
  }
  const { publicUrl } = context;
  // check useContext
  const { dataUser } = useContextCommon();
  
  useEffect(() => {}, [dataUser]);
  return (
    <div className="user-container">
      <div className="user-wrapper">
        <div className="user-avatar">
          <div
            style={{
              backgroundImage: `url(${publicUrl + "/images/avatar.png"})`,
            }}
            className="user-head"
          >
            <span className="user-name">
              {dataUser && dataUser?.[UserFields.FULL_NAME]}
            </span>
          </div>
        </div>
        <UserEdit/>
      </div>
    </div>
  );
}
