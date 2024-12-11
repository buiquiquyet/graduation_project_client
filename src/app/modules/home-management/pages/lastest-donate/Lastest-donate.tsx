import { MyContext } from "@/App";
import { ProjectFundDialogDonateFields } from "@/app/modules/project-fund-detail-management/interfaces/ProjectFundDialogDonate.interface";
import { getTop3Donors } from "@/app/modules/project-fund-detail-management/services/ProjectFundContentAndList.service";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import { handleCheckSuccessResponse } from "@/shared/constants/base.constants";
import LazyLoadComponent from "@/shared/libraries/lazy-load-component/LayzyComponent";
import { formatCurrency, getImgCommon } from "@/shared/user-const";
import { memo, useContext, useEffect, useState } from "react";

function LastestDonate() {
  const context = useContext(MyContext);
  if (!context) {
    return null;
  }
  const { publicUrl } = context;

  const { setLoading } = useContextCommon();

  const [data3Donors, setData3Donors] = useState([]); // list 3 người donate nhiều nhất
  const handleCallApiGetTop3Donors = async () => {
    setLoading(true);
    const res: any = await getTop3Donors();
    setLoading(false);
    if (handleCheckSuccessResponse(res)) {
      let datas = res?.data?.data?.topDonors;
      setData3Donors(datas);
    }
  };
  useEffect(() => {
    handleCallApiGetTop3Donors();
  }, []);
console.log(publicUrl);

  return (
    <>
      {data3Donors?.length > 0 && (
        <section className="ftco-section">
          <div className="container">
            <LazyLoadComponent>
              <div className="row justify-content-center mb-5 pb-3 d-flex">
                <div className="col-md-7 heading-section  text-center">
                  <h2 className="mb-4">THÀNH VIÊN HOẠT ĐỘNG TÍCH CỰC</h2>
                  <h5>
                    Khi ta giúp đỡ người khác, ta cũng đang giúp chính mình trở
                    nên giàu có hơn về tinh thần.
                  </h5>
                </div>
              </div>
            </LazyLoadComponent>
            <LazyLoadComponent>
              <div className="container">
                <div className="row d-flex">
                  {data3Donors?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className={`col-12 col-sm-12 col-md-6 col-lg-${
                        12 / data3Donors?.length
                      }  mb-sm-4`}
                    >
                      <div className="staff">
                        <div className="d-flex mb-4">
                          <div
                            className="img"
                            style={{
                              backgroundImage: `url(${
                                item?.[ProjectFundDialogDonateFields.AVATAR]
                                  ? getImgCommon(
                                      item?.[
                                        ProjectFundDialogDonateFields.AVATAR
                                      ]
                                    )
                                  : publicUrl + "/images/avatar.png"
                              })`,
                            }}
                          />
                          <div className="info ml-4">
                            <h5>
                              {item?.[
                                ProjectFundDialogDonateFields.USER_NAME
                              ] ?? "Người hảo tâm ẩn danh"}
                            </h5>
                            <div className="text mt-3">
                              <p>
                                Đã quyên góp tổng{" "}
                                <span>
                                  {" "}
                                  {formatCurrency(
                                    item?.[
                                      ProjectFundDialogDonateFields
                                        .DONATION_AMOUNT
                                    ]
                                  )}
                                </span>{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </LazyLoadComponent>
          </div>
        </section>
      )}
    </>
  );
}
export default memo(LastestDonate);
