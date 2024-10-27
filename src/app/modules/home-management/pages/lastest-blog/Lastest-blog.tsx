import { MyContext } from "@/App";
import LazyLoadComponent from "@/shared/libraries/lazy-load-component/LayzyComponent";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function LastestBlog() {
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
                <h2 className="mb-4">BLOG GẦN ĐÂY</h2>
                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind texts.
                </p>
              </div>
            </div>
          </LazyLoadComponent>
          <LazyLoadComponent>
            <div className="row d-flex">
              <div className="col-md-4 d-flex ">
                <div className="blog-entry align-self-stretch">
                  <Link
                    to={""}
                    className="block-20"
                    style={{
                      backgroundImage: `url(${
                        publicUrl + "/images/image_1.jpg"
                      })`,
                    }}
                  ></Link>
                  <div className="text p-4 d-block">
                    <div className="meta mb-3">
                      <div>
                        <Link to={""}>Sept 10, 2018</Link>
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
                    <h3 className="heading mt-3">
                      <Link to={""}>Hurricane Irma has devastated Florida</Link>
                    </h3>
                    <p>
                      A small river named Duden flows by their place and
                      supplies it with the necessary regelialia.
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
                        publicUrl + "/images/image_2.jpg"
                      })`,
                    }}
                  ></Link>
                  <div className="text p-4 d-block">
                    <div className="meta mb-3">
                      <div>
                        <Link to={""}>Sept 10, 2018</Link>
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
                    <h3 className="heading mt-3">
                      <Link to={""}>Hurricane Irma has devastated Florida</Link>
                    </h3>
                    <p>
                      A small river named Duden flows by their place and
                      supplies it with the necessary regelialia.
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
                        publicUrl + "/images/image_3.jpg"
                      })`,
                    }}
                  ></Link>
                  <div className="text p-4 d-block">
                    <div className="meta mb-3">
                      <div>
                        <Link to={""}>Sept 10, 2018</Link>
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
                    <h3 className="heading mt-3">
                      <Link to={""}>Hurricane Irma has devastated Florida</Link>
                    </h3>
                    <p>
                      A small river named Duden flows by their place and
                      supplies it with the necessary regelialia.
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
