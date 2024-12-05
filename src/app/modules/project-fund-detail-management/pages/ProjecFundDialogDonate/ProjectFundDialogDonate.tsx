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
import "./ProjectFundDialogDonate.scss";
import { createPayment } from "../../services/ProjectFundDialogDonate.service";
import {
  ToastMessage,
  ToastStatus,
} from "@/shared/libraries/message-log-component/MessageLog";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import { UserFields } from "@/app/modules/user-management/constants/User.interface";
import { memo } from "react";
interface ProjectFundDialogDonateProps {
  isOpenDialog: boolean;
  onClickDialogDonate: () => void;
  projectFundId: string | undefined;
}
const ProjectFundDialogDonate: React.FC<ProjectFundDialogDonateProps> = ({
  isOpenDialog,
  onClickDialogDonate,
  projectFundId,
}) => {
  const { dataUser } = useContextCommon();

  const formInputsInfoDonate: any[] =
    ProjectFundDialogDonateConst.formInputDonate; // form input donate
  const formInputsInfoDonateAmout =
    ProjectFundDialogDonateConst.formInputDonateAmout; // form input donate amount

  const handleGetInfoDonate = () => {
    return {
      [ProjectFundDialogDonateFields.USER_NAME]: dataUser?.[UserFields.FULL_NAME] ?? "",
      [ProjectFundDialogDonateFields.DECRIPTION]: "",
      [ProjectFundDialogDonateFields.USER_PHONE]: dataUser?.[UserFields.PHONE] ?? "",
      [ProjectFundDialogDonateFields.USER_ADDRESS]: dataUser?.[UserFields.ADDRESS] ?? "",
      [ProjectFundDialogDonateFields.DONATION_AMOUNT]: "10000",
    };
  };

  const validationSchema = createValidationSchema(handleGetInfoDonate());

  let initialValues: ProjectFundDialogDonateDTO | any = handleGetInfoDonate(); // biến gán init của form submit
  let formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any) => {
      const newValues = {
        [ProjectFundDialogDonateFields.PROJECT_FUND_ID]: projectFundId ?? "", 
        [ProjectFundDialogDonateFields.USER_NAME]:
          values?.[ProjectFundDialogDonateFields.USER_NAME] ?? "",
        [ProjectFundDialogDonateFields.DONATION_AMOUNT]:
          values?.[ProjectFundDialogDonateFields.DONATION_AMOUNT] ?? "",
        [ProjectFundDialogDonateFields.UserId]: dataUser?.[UserFields.ID] ?? "",
      };
      await handleCallApiCreatePayment(newValues);
    },
  }); // biến gán form submit
  const handleCallApiCreatePayment = async (values: any) => {
    const res: any = await createPayment(values);
    const data = res?.data?.data;
    if (data?.response?.ErrorCode !== 0) {
      ToastMessage.show(ToastStatus.error, data?.response?.LocalMessage);
    } else {
      window.location.href = data?.response?.PayUrl;
    }
  };
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
                  <div key={index}>
                    <div className="">
                      <span style={{ fontSize: "16px" }}>{item?.label}</span>
                      <LibSwitchInput item={item} formik={formik} />
                    </div>
                  </div>
                ))}
            </div>
            <div className="w-100">
              <BaseButton
                title="Ủng hộ"
                color={ButtonColor.Error}
                style={{ width: "100%", padding: "10px" }}
              />
            </div>
            <div className="clause">
              Chúng tôi xác nhận là bạn đã đồng ý với <span>Điều khoản</span>{" "}
              của chúng tôi
            </div>
          </form>
        </BaseDialog>
      )}
    </div>
  );
};

export default memo(ProjectFundDialogDonate);
