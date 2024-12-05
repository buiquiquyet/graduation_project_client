import { UserFields } from "@/app/modules/user-management/constants/User.interface";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import { convertDate, getImgCommon } from "@/shared/user-const";
import "./LibComment.scss";
import LibSwitchInput from "../lib-switch-input-component/libSwitchInput";
import { useFormik } from "formik";
import { CommentDTO, CommentFields } from "./interfaces/LibComment.interface";
import { createValidationSchema } from "@/shared/validate";
import { Fragment, useEffect, useState } from "react";
import { LibCommentConst } from "./constants/LibComment.const";
import BaseButton from "@/shared/component/base-button/BaseButton";
import {
  createComment,
  deleteComment,
  getListComments,
} from "./services/LibComment.service";
import {
  handleCheckSuccessResponse,
  handleResponseInterceptor,
} from "@/shared/constants/base.constants";
import { Page } from "@/shared/ultils/Page";
import { ApiResponseTable } from "@/shared/constants/api-response-table";
import LibBasePagination from "../LibBasePagination/LibBasePagination";
import { RoleUser } from "@/helper/ContextCommon/ContextCommon.enum";
interface LibCommnetComponentProps {
  projectFundId: string; // id của từ thiện item
  userId: string; // id của người dùng
}
const LibCommentComponent: React.FC<LibCommnetComponentProps> = ({
  userId,
  projectFundId,
}) => {
  const { dataUser, setLoading } = useContextCommon();
  const [dataComments, setDataComments] = useState<ApiResponseTable>({
    currentPage: 1,
    datas: [],
    message: "",
    totalPages: 0,
    totalRecords: 0,
  }); // data trả về
  let pages: Page = new Page();
  const [page, setPages] = useState(pages); // page của table
  const formInputComment = LibCommentConst.arrInputComment;
  let initialValues: CommentDTO | any = {
    [CommentFields.CONTENT]: "",
  }; // biến gán init của form submit
  const validationSchema = createValidationSchema(initialValues);
  let formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any) => {
      const newValues = {
        ...values,
        [CommentFields.PROJECT_FUND_ID]: projectFundId, // nội dung comment
        [CommentFields.USER_ID]: userId, // nội dung comment
      };
      setLoading(true);
      const res: any = await createComment(newValues);
      setLoading(false);
      if (handleResponseInterceptor(res)) {
        // set lại form rỗng khi submit thành công
        formik.resetForm();
        handleCallApiCommentList(projectFundId, page); // gọi lại api list
      }
    },
  }); // biến gán form submit
  const handleCallApiCommentList = async (
    projectFundId: string,
    page: Page
  ) => {
    setLoading(true);
    page = { ...page, pageSize: page.perPageOptions[0] };
    const res: any = await getListComments(page, projectFundId);
    setLoading(false);
    if (handleCheckSuccessResponse(res)) {
      setDataComments(res?.data);
    }else {
      setDataComments({
        currentPage: 1,
        datas: [],
        message: "",
        totalPages: 0,
        totalRecords: 0,
      });
    }
  };
  // change page table
  const handleChangePage = (event: any, newPage: any) => {
    setPages({
      ...page,
      pageNumber: newPage,
    });
  };
  // Delete comment
  const handleCallApiDeleteComment = async (idComment: string) => {
    setLoading(true);
    const res: any = await deleteComment(idComment);
    setLoading(false);
    if (handleResponseInterceptor(res)) {
      handleCallApiCommentList(projectFundId, page);
    }
  };
  useEffect(() => {
    if (projectFundId || page) {
      handleCallApiCommentList(projectFundId, page);
    }
  }, [projectFundId, page]);
  return (
    <>
      {(dataComments?.datas?.length > 0 || userId) && (
        <div className="lib-comment w-100">
          <div className="mb-4">
            <div className="content-comment">
              {dataComments &&
                dataComments.datas?.length > 0 &&
                dataComments?.datas?.map((item: any, index: number) => (
                  <div key={index} className="item-info w-100">
                    <div className="item-avatar">
                      <img
                        src={getImgCommon(item?.[CommentFields.USER_AVATAR])}
                        alt=""
                      />
                    </div>
                    <div className="item-content ">
                      <div className="item-name d-flex align-items-center">
                        <span className="item-name-text">
                          {item?.[CommentFields.USER_NAME]}
                        </span>
                        <span className="item-date ml-3">
                          {convertDate(item?.[CommentFields.UPDATED_AT])}
                        </span>
                        {dataUser &&
                          dataUser?.[UserFields.ROLE] === RoleUser.ADMIN && (
                            <span
                              className="ml-4 d-flex delete-comment"
                              onClick={() =>
                                handleCallApiDeleteComment(
                                  item?.[CommentFields.ID]
                                )
                              }
                            >
                              Xóa
                            </span>
                          )}
                      </div>
                      <div className="item-text ">
                        <span>{item?.[CommentFields.CONTENT]}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {dataComments.datas &&
              dataComments.totalRecords > page.perPageOptions[0] && (
                <LibBasePagination
                  totalPage={dataComments.totalPages}
                  onClick={(event, newPage) => handleChangePage(event, newPage)}
                  totalRecords={dataComments.totalRecords}
                  pageNumber={page.pageNumber}
                  isShowTotalRecord={false}
                />
              )}
          </div>
          {userId && (
            <div className="input-comment">
              <form
                onSubmit={formik.handleSubmit}
                className="form-submit-comment"
              >
                <div className="d-flex" style={{ gap: "10px" }}>
                  <img
                    src={getImgCommon(dataUser?.[UserFields.AVATAR] ?? "")}
                    alt=""
                  />
                  <div className="  w-100">
                    {formInputComment.map((item, index) => (
                      <Fragment key={index}>
                        <LibSwitchInput item={item} formik={formik} />
                      </Fragment>
                    ))}
                  </div>
                </div>
                <div className="button-submit">
                  <BaseButton title="Bình luận" />
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default LibCommentComponent;
