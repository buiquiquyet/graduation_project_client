import { MyContext } from "@/App";
import LazyLoadComponent from "@/shared/libraries/lazy-load-component/LayzyComponent";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function LastestDonate() {
  const context = useContext(MyContext);
  if (!context) {
    return null;
  }
  const { publicUrl } = context;
  return (
    <section className="ftco-section">
        <div className="container">
          <LazyLoadComponent>
            <div className="row justify-content-center mb-5 pb-3">
              <div className="col-md-7 heading-section  text-center">
                <h2 className="mb-4">QUYÊN GÓP NHIỀU NHẤT</h2>
                <p>
                  Khi ta giúp đỡ người khác, ta cũng đang giúp chính mình trở
                  nên giàu có hơn về tinh thần.
                </p>
              </div>
            </div>
          </LazyLoadComponent>
          <LazyLoadComponent>
            <div className="row">
              <div className="col-lg-4 d-flex mb-sm-4 ">
                <div className="staff">
                  <div className="d-flex mb-4">
                    <div
                      className="img"
                      style={{
                        backgroundImage: `url(${
                          publicUrl + "/images/person_1.jpg"
                        })`,
                      }}
                    />
                    <div className="info ml-4">
                      <h3>
                        <Link to={""}>Ivan Jacobson</Link>
                      </h3>
                      <span className="position">Donated Just now</span>
                      <div className="text">
                        <p>
                          Donated <span>$300</span> for{" "}
                          <Link to={""}>Children Needs Food</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 d-flex mb-sm-4 ">
                <div className="staff">
                  <div className="d-flex mb-4">
                    <div
                      className="img"
                      style={{
                        backgroundImage: `url(${
                          publicUrl + "/images/person_2.jpg"
                        })`,
                      }}
                    />
                    <div className="info ml-4">
                      <h3>
                        <Link to={""}>Ivan Jacobson</Link>
                      </h3>
                      <span className="position">Donated Just now</span>
                      <div className="text">
                        <p>
                          Donated <span>$150</span> for{" "}
                          <Link to={""}>Children Needs Food</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 d-flex mb-sm-4 ">
                <div className="staff">
                  <div className="d-flex mb-4">
                    <div
                      className="img"
                      style={{
                        backgroundImage: `url(${
                          publicUrl + "/images/person_3.jpg"
                        })`,
                      }}
                    />
                    <div className="info ml-4">
                      <h3>
                        <Link to={""}>Ivan Jacobson</Link>
                      </h3>
                      <span className="position">Donated Just now</span>
                      <div className="text">
                        <p>
                          Donated <span>$250</span> for{" "}
                          <Link to={""}>Children Needs Food</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </LazyLoadComponent>
        </div>
      </section>
  );
}
