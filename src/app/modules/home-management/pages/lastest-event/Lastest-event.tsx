import { MyContext } from "@/App";
import LazyLoadComponent from "@/shared/libraries/lazy-load-component/LayzyComponent";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function LastestEvent() {
  const context = useContext(MyContext);
  if (!context) {
    return null;
  }
  const { publicUrl } = context;
  return (
    <section className="ftco-section bg-light">
      <div className="container">
        <LazyLoadComponent>
          <div className="row justify-content-center mb-5 pb-3">
            <div className="col-md-7 heading-section  text-center">
              <h2 className="mb-4">SỰ KIỆN MỚI NHẤT</h2>
            </div>
          </div>
        </LazyLoadComponent>
        <LazyLoadComponent>
          <div className="row">
            <div className="col-md-4 d-flex ">
              <div className="blog-entry align-self-stretch">
                <Link
                  to={""}
                  className="block-20"
                  style={{
                    backgroundImage: `url(${
                      publicUrl + "/images/event-1.jpg"
                    })`,
                  }}
                ></Link>
                <div className="text p-4 d-block">
                  <div className="meta mb-3">
                    <div>
                      <Link to={""}>Sep. 10, 2018</Link>
                    </div>
                    <div>
                      <Link to={""}>Admin</Link>
                    </div>
                    <div>
                      <Link to={""} className="meta-chat">
                        <span className="icon-chat" /> 3
                      </Link>
                    </div>
                  </div>
                  <h3 className="heading mb-4">
                    <Link to={""}>World Wide Donation</Link>
                  </h3>
                  <p className="time-loc">
                    <span className="mr-2">
                      <i className="icon-clock-o" /> 10:30AM-03:30PM
                    </span>{" "}
                    <span>
                      <i className="icon-map-o" /> Venue Main Campus
                    </span>
                  </p>
                  <p>
                    A small river named Duden flows by their place and supplies
                    it with the necessary regelialia.
                  </p>
                  <p>
                    <Link to={""}>
                      Join Event <i className="ion-ios-arrow-forward" />
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex ">
              <div className="blog-entry align-self-stretch">
                <Link
                  to={""}
                  className="block-20"
                  style={{
                    backgroundImage: `url(${
                      publicUrl + "/images/event-2.jpg"
                    })`,
                  }}
                ></Link>
                <div className="text p-4 d-block">
                  <div className="meta mb-3">
                    <div>
                      <Link to={""}>Sep. 10, 2018</Link>
                    </div>
                    <div>
                      <Link to={""}>Admin</Link>
                    </div>
                    <div>
                      <Link to={""} className="meta-chat">
                        <span className="icon-chat" /> 3
                      </Link>
                    </div>
                  </div>
                  <h3 className="heading mb-4">
                    <Link to={""}>World Wide Donation</Link>
                  </h3>
                  <p className="time-loc">
                    <span className="mr-2">
                      <i className="icon-clock-o" /> 10:30AM-03:30PM
                    </span>{" "}
                    <span>
                      <i className="icon-map-o" /> Venue Main Campus
                    </span>
                  </p>
                  <p>
                    A small river named Duden flows by their place and supplies
                    it with the necessary regelialia.
                  </p>
                  <p>
                    <Link to={""}>
                      Join Event <i className="ion-ios-arrow-forward" />
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex ">
              <div className="blog-entry align-self-stretch">
                <Link
                  to={""}
                  className="block-20"
                  style={{
                    backgroundImage: `url(${
                      publicUrl + "/images/event-3.jpg"
                    })`,
                  }}
                ></Link>
                <div className="text p-4 d-block">
                  <div className="meta mb-3">
                    <div>
                      <Link to={""}>Sep. 10, 2018</Link>
                    </div>
                    <div>
                      <Link to={""}>Admin</Link>
                    </div>
                    <div>
                      <Link to={""} className="meta-chat">
                        <span className="icon-chat" /> 3
                      </Link>
                    </div>
                  </div>
                  <h3 className="heading mb-4">
                    <Link to={""}>World Wide Donation</Link>
                  </h3>
                  <p className="time-loc">
                    <span className="mr-2">
                      <i className="icon-clock-o" /> 10:30AM-03:30PM
                    </span>{" "}
                    <span>
                      <i className="icon-map-o" /> Venue Main Campus
                    </span>
                  </p>
                  <p>
                    A small river named Duden flows by their place and supplies
                    it with the necessary regelialia.
                  </p>
                  <p>
                    <Link to={""}>
                      Join Event <i className="ion-ios-arrow-forward" />
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </LazyLoadComponent>
      </div>
    </section>
  );
}
