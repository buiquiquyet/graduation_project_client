import { MyContext } from "@/App";
import { useContext } from "react";
import { DonateConst } from "./constants/Donate.const";

function Donate() {
  const context = useContext(MyContext);
  if (!context) {
    return null;
  }
  const { publicUrl } = context;
  return (
    <>
      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row">
            {Array(9)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="col-lg-4 d-flex mb-sm-4">
                  <div className="staff">
                    <div className="d-flex mb-4">
                      <div
                        className="img"
                        style={{
                          backgroundImage: `url(${
                            publicUrl + DonateConst.arrImgDonate(index + 1)
                          }`,
                        }}
                      ></div>
                      <div className="info ml-4">
                        <h3>
                          <a href="teacher-single.html">Ivan Jacobson</a>
                        </h3>
                        <span className="position">Donated Just now</span>
                        <div className="text">
                          <p>
                            Donated <span>$300</span> for{" "}
                            <a href="#">Children Needs Food</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="row mt-5">
            <div className="col text-center">
              <div className="block-27">
                <ul>
                  <li>
                    <a href="#">&lt;</a>
                  </li>
                  <li className="active">
                    <span>1</span>
                  </li>
                  <li>
                    <a href="#">2</a>
                  </li>
                  <li>
                    <a href="#">3</a>
                  </li>
                  <li>
                    <a href="#">4</a>
                  </li>
                  <li>
                    <a href="#">5</a>
                  </li>
                  <li>
                    <a href="#">&gt;</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="ftco-section-3 img"
        style={{ backgroundImage: `url(${publicUrl + "images/bg_3.jpg);"})` }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row d-md-flex">
            <div className="col-md-6 d-flex ftco-animate">
              <div
                className="img img-2 align-self-stretch"
                style={{
                  backgroundImage: `url(${publicUrl + "images/bg_4.jpg);"})`,
                }}
              ></div>
            </div>
            <div className="col-md-6 volunteer pl-md-5 ftco-animate">
              <h3 className="mb-3">Be a volunteer</h3>
              <form action="#" className="volunter-form">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Email"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name=""
                    id=""
                    cols={30}
                    rows={3}
                    className="form-control"
                    placeholder="Message"
                  ></textarea>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Send Message"
                    className="btn btn-white py-3 px-5"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Donate;
