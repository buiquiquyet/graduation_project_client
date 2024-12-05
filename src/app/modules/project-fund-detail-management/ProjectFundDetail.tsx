import { MyContext } from "@/App";
import BaseButton from "@/shared/component/base-button/BaseButton";
import { memo, useContext, useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import "./ProjectFundDetail.scss";
import { useParams } from "react-router-dom";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import { getProjectFund } from "../project-admin-management/services/Project-fund.services";
import { ProjectFundFields } from "../project-admin-management/constants/Project-fund.interface";
import { formatCurrency, getImgCommon } from "@/shared/user-const";
import { ButtonColor } from "@/shared/constants/button.const";
import ImageModal from "@/shared/libraries/gallery-component/Gallery";
import ProjectFundDialogDonate from "./pages/ProjecFundDialogDonate/ProjectFundDialogDonate";
import { handleCheckSuccessResponse } from "@/shared/constants/base.constants";
import ProjectFundContentAndList from "./pages/ProjectFundContentAndList/ProjectFundContentAndList";
import LazyLoadComponent from "@/shared/libraries/lazy-load-component/LayzyComponent";
import LibCategoryAbsolute from "@/shared/libraries/LibCategoryAbsolute/LibCategoryAbsolute";
import SlideHomeComponent from "@/app/modules/home-management/slide-management/SlideHome";
const ProjectFundDetailComponent = () => {
  const context = useContext(MyContext);
  if (!context) {
    return null;
  }
  const { setLoading } = useContextCommon();
  const { projectFundId } = useParams();
  const [dataDetailProjectFund, setDataDetailProjectFund] = useState<any>(); // dữ liệu detail project fund
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false); // open dialog từ thiện
  const [fileRes, setFileRes] = useState<any>(); // dữ liệu detail file
  // CALL API DETAIL PROJECT FUND
  const handleCallApiProjectFundDetail = async (projectFundId: string) => {
    setLoading(true);
    const res: any = await getProjectFund(projectFundId);
    setLoading(false);
    if (handleCheckSuccessResponse(res)) {
      const data = res?.data?.data;
      setDataDetailProjectFund(data);
      setFileRes(data?.[ProjectFundFields.IMAGES][0]);
    }
  };

  // set fileName
  const handleChangeFileRes = (fileName: string) => {
    setFileRes(fileName);
  };
  // show dialog donate
  const onClickDialogDonate = () => {
    setIsOpenDialog(!isOpenDialog);
  };
  useEffect(() => {
    if (projectFundId) {
      handleCallApiProjectFundDetail(projectFundId);
    }
  }, [projectFundId]);
  const topElementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Cuộn đến phần tử đầu tiên khi component được render lại
    if (topElementRef.current) {
      topElementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);  // Mảng phụ thuộc rỗng, chỉ chạy một lần khi component được mount

  return (
    <div className="project-fund-detail" ref={topElementRef}>
      <div className="w-100">
        <div className="w-100">
          <LazyLoadComponent>
            <div className="container p-5  detail-project-head">
              {dataDetailProjectFund && (
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-5">
                    <div className="project-fund-images">
                      <img className="w-100 " src={getImgCommon(fileRes)} />
                      <ImageModal
                        className="img-table-modal"
                        imgSrcList={
                          dataDetailProjectFund?.[ProjectFundFields.IMAGES] // Nếu là string, chuyển thành mảng với 1 phần tử
                        }
                      ></ImageModal>
                      <LibCategoryAbsolute
                        value={
                          dataDetailProjectFund?.[
                            ProjectFundFields.CATEGORY_NAME
                          ]
                        }
                      />
                    </div>
                    <div className="mt-3 d-flex w-100 justify-content-between">
                      {dataDetailProjectFund?.[ProjectFundFields.IMAGES]
                        ?.length > 0 &&
                        dataDetailProjectFund?.[ProjectFundFields.IMAGES]?.map(
                          (image: string, index: number) => (
                            <div
                              key={index}
                              className="image-item"
                              style={{ cursor: "pointer", width: "25%" }}
                              onClick={() =>
                                handleChangeFileRes(
                                  dataDetailProjectFund?.[
                                    ProjectFundFields.IMAGES
                                  ][index]
                                )
                              }
                            >
                              <img
                                style={{
                                  width: "90%",
                                  height: "100%",
                                  borderRadius: "10px",
                                }}
                                src={getImgCommon(image)}
                              />
                            </div>
                          )
                        )}
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-7 d-flex flex-column project-fund-right-head">
                    <div className="w-100 right-head-title">
                      <h2 className="">
                        {dataDetailProjectFund?.[ProjectFundFields.NAME]}
                      </h2>
                    </div>
                    <div className="right-box-info">
                      <div className="right-box-content">
                        <div className="right-box-images container p-0 align-items-center">
                          <div className="row w-100" style={{ gap: "10px" }}>
                            <img
                              src={getImgCommon(
                                dataDetailProjectFund?.[
                                  ProjectFundFields.IMAGES_FUND
                                ]
                              )}
                              className="mb-2"
                            />
                            <span className="text-main">
                              {
                                dataDetailProjectFund?.[
                                  ProjectFundFields.FUND_NAME
                                ]
                              }
                            </span>
                          </div>
                        </div>
                        <div className="container p-0 align-items-center">
                          <div className="row align-items-center justify-content-end">
                            <FaUser />
                            <div className="ml-2 pt-1">
                              {dataDetailProjectFund?.[
                                ProjectFundFields.NUMBER_OF_DONATE
                              ] + " "}{" "}
                              người ủng hộ
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="right-box-content">
                        <span>Mục tiêu dự án</span>
                        <span style={{ fontWeight: "bold", color: "#647887" }}>
                          {formatCurrency(
                            dataDetailProjectFund?.[
                              ProjectFundFields.TARGET_AMOUNT
                            ]
                          )}
                        </span>
                      </div>
                      <div
                        className="progress custom-progress-success"
                        style={{ height: "0.4rem" }}
                      >
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{
                            width: `${parseFloat(
                              dataDetailProjectFund?.[ProjectFundFields.PERCENT]
                            )}%`,
                          }}
                          aria-valuenow={parseFloat(
                            dataDetailProjectFund?.[ProjectFundFields.PERCENT]
                          )}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <div className="right-box-content">
                        <span>Đã đạt được</span>
                        <span
                          className="text-main"
                          style={{ fontSize: "26px", fontWeight: "bold" }}
                        >
                          {formatCurrency(
                            dataDetailProjectFund?.[
                              ProjectFundFields.CURRENT_AMOUNT
                            ]
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="container  " style={{ gap: "10px" }}>
                      <div className="row justify-content-between align-items-center">
                        <div className="d-flex align-items-center mt-2  col-12 col-sm-12 col-md-4 col-lg-4">
                          {/* <span>VNĐ</span>
                          <Input
                            style={{ marginLeft: "6px", width: "200px" }}
                            maxLength={10}
                            type="number"
                          /> */}
                        </div>
                        <div
                          className="d-flex justify-content-end col-12 col-sm-12 col-md-12 col-lg-12 "
                          style={{ gap: "10px" }}
                        >
                          <BaseButton
                            color={ButtonColor.Error}
                            onClick={onClickDialogDonate}
                            title="Ủng hộ ngay"
                          />
                          <BaseButton title="Trở thành sứ giả" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </LazyLoadComponent>
          {dataDetailProjectFund && (
            <ProjectFundContentAndList
              idFund={dataDetailProjectFund?.[ProjectFundFields.FUND_ID] ?? ""}
              projectFundDescription={
                dataDetailProjectFund?.[ProjectFundFields.DESCRIPTION]
              }
              projectFundId={projectFundId}
            />
          )}
        </div>
        {/* danh sách list các dự án khác */}
        <div className="container-more-project">
          <div className="container">
            <div className="pt-5 w-100">
              <div className="p-5 w-100 d-flex flex-column align-items-center ">
                <div className="other-project mb-4">Các dự án khác</div>
                <div className="w-100">
                  {" "}
                  <SlideHomeComponent slidesPerView={3}/>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        {isOpenDialog && (
          <ProjectFundDialogDonate
            onClickDialogDonate={onClickDialogDonate}
            isOpenDialog={isOpenDialog}
            projectFundId={projectFundId}
          />
        )}
      </div>
    </div>
  );
};
export default memo(ProjectFundDetailComponent);
