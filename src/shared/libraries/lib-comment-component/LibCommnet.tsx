import { UserFields } from "@/app/modules/user-management/constants/User.interface";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import { getImgCommon } from "@/shared/user-const";
import "./LibComment.scss";
import LibSwitchInput from "../lib-switch-input-component/libSwitchInput";
import { useFormik } from "formik";
import { CommentDTO, CommentFields } from "./interfaces/LibComment.interface";
import { createValidationSchema } from "@/shared/validate";
import { Fragment, useState } from "react";
import { LibCommentConst } from "./constants/LibComment.const";
import BaseButton from "@/shared/component/base-button/BaseButton";
interface LibCommnetComponentProps {
  setContent?: any; // set nội dung bình luận
  dataContent?: any[]; // data của dữ liệu bình luận bài đăng
}
const LibCommentComponent: React.FC<LibCommnetComponentProps> = ({}) => {
  const { dataUser } = useContextCommon();
  const [formInputComment, setFormInputComment] = useState(
    LibCommentConst.arrInputComment
  ); // form input comment
  let initialValues: CommentDTO | any = {
    [CommentFields.CONTENT]: "",
  }; // biến gán init của form submit
  const validationSchema = createValidationSchema(initialValues);
  let formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any) => {},
  }); // biến gán form submit
  return (
    <div className="lib-comment w-100">
      <div className="content-comment"></div>
      <div className="input-comment">
        <form onSubmit={formik.handleSubmit} className="form-submit-comment">
          <div className="d-flex p-4">
            <img
              src={getImgCommon(dataUser?.[UserFields.AVATAR] ?? "")}
              alt=""
            />
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              {formInputComment.map((item, index) => (
                <Fragment key={index}>
                  <LibSwitchInput  item={item} formik={formik} />
                </Fragment>
              ))}
            </div>
          </div>
          <div className="button-submit">
            <BaseButton title="Bình luận"/>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LibCommentComponent;
