import BaseDialog from "@/shared/component/base-dialog-file/BaseDialog";
import { useFormik } from "formik";
import {
  ProjectFundDialogDonateDTO,
  ProjectFundDialogDonateFields,
} from "../../interfaces/ProjectFundDialogDonate.interface";
import { createValidationSchema } from "@/shared/validate";
import BaseButton from "@/shared/component/base-button/BaseButton";
import { ButtonColor } from "@/shared/constants/button.const";
import { ProjectFundDialogDonateConst } from "../../constants/ProjectFundDialogDonate.const";
import LibSwitchInput from "@/shared/libraries/lib-switch-input-component/libSwitchInput";
import { Input } from "antd";
import './ProjectFundDialogDonate.scss'
interface ProjectFundDialogDonateProps {
  isOpenDialog: boolean;
  onClickDialogDonate: () => void;
}
const ProjectFundDialogDonate: React.FC<ProjectFundDialogDonateProps> = ({
  isOpenDialog,
  onClickDialogDonate,
}) => {
  const formInputsInfoDonate: any[] =
    ProjectFundDialogDonateConst.formInputDonate; // form input donate
    const formInputsInfoDonateAmout =  ProjectFundDialogDonateConst.formInputDonateAmout; // form input donate amount
  const handleGetInfoDonate = () => {
    return {
      [ProjectFundDialogDonateFields.USER_NAME]: "",
      [ProjectFundDialogDonateFields.USER_EMAIL]: "",
      [ProjectFundDialogDonateFields.USER_PHONE]: "",
      [ProjectFundDialogDonateFields.USER_ADDRESS]: "",
      [ProjectFundDialogDonateFields.DONATION_AMOUNT]: "",
    };
  };

  const validationSchema = createValidationSchema(handleGetInfoDonate());

  let initialValues: ProjectFundDialogDonateDTO | any = handleGetInfoDonate(); // biến gán init của form submit
  let formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any) => {
      //   setLoading(true);
      //   const res: any = await updateUser(dataUser?.[ProjectFundDialogDonateFields.ID] ?? "", {
      //     ...(dataUser ?? {}),
      //     ...values,
      //   });
      //   setLoading(false);
      //   if (handleResponseInterceptor(res)) {
      //   }
    },
  }); // biến gán form submit
  return (
    <div className="project-dialog-donate">
      {isOpenDialog && (
        <BaseDialog
          onClickHideDialog={onClickDialogDonate}
          label="Thông tin ủng hộ"
          style={{
            width: "700px",
          }}
        >
          <form
            onSubmit={formik.handleSubmit}
            className="container d-flex flex-column align-items-center"
          >
            <div className="row w-100">
              {formInputsInfoDonate &&
                formInputsInfoDonate.length > 0 &&
                formInputsInfoDonate.map((item, index) => (
                  <div
                    key={index}
                    className="col-12 col-sm-12 col-md-12 col-lg-6 mb-4"
                  >
                    <div className="">
                      <span style={{ fontSize: "16px" }}>{item?.label}</span>
                      <LibSwitchInput item={item} formik={formik} />
                    </div>
                  </div>
                ))}
            </div>
            <div
              className="d-flex justify-content-between w-100 align-items-center mt-5 mb-5"
              style={{
                padding: "25px 15px",
                borderBottom: "1px solid rgb(233 233 233)",
                borderTop: "1px solid rgb(233 233 233)",
              }}
            >
              <span>Số tiền ủng hộ</span>
              {formInputsInfoDonateAmout &&
                formInputsInfoDonateAmout.length > 0 &&
                formInputsInfoDonateAmout.map((item, index) => (
                  <div
                    key={index}
                  >
                    <div className="">
                      <span style={{ fontSize: "16px" }}>{item?.label}</span>
                      <LibSwitchInput item={item} formik={formik} />
                    </div>
                  </div>
                ))}
             
            </div>
            <div className="w-100">
              <BaseButton title="Ủng hộ" color={ButtonColor.Error} style={{width: '100%', padding: '10px'}} />
            </div>
            <div className="clause">
                Chúng tôi xác nhận là bạn đã đồng ý với <span>Điều khoản</span> của chúng tôi
            </div>
          </form>
        </BaseDialog>
      )}
    </div>
  );
};

export default ProjectFundDialogDonate;
