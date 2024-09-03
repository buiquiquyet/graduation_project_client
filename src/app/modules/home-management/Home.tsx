import "./Home.scss";
import SlideHome from "./slide-management/SlideHome";
import { MyContext } from "@/App";
import { useContext } from "react";
function Home() {
  const  context = useContext(MyContext)
  if (!context) {
      return null;
    }
  const { publicUrl } = context;
  return (
    <>
      <section className="ftco-counter ftco-intro" id="section-counter">
        <div className="container">
          <div className="row no-gutters">
            <div className="col-md-5 d-flex justify-content-center counter-wrap ">
              <div className="block-18 color-1 align-items-stretch">
                <div className="text">
                  <span>Served Over</span>
                  <strong className="number" data-number={1432805}>
                    0
                  </strong>
                  <span>Children in 190 countries in the world</span>
                </div>
              </div>
            </div>
            <div className="col-md d-flex justify-content-center counter-wrap ">
              <div className="block-18 color-2 align-items-stretch">
                <div className="text">
                  <h3 className="mb-4">Donate Money</h3>
                  <p>
                    Even the all-powerful Pointing has no control about the
                    blind texts.
                  </p>
                  <p>
                    <a href="#" className="btn btn-white px-3 py-2 mt-2">
                      Donate Now
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md d-flex justify-content-center counter-wrap ">
              <div className="block-18 color-3 align-items-stretch">
                <div className="text">
                  <h3 className="mb-4">Be a Volunteer</h3>
                  <p>
                    Even the all-powerful Pointing has no control about the
                    blind texts.
                  </p>
                  <p>
                    <a href="#" className="btn btn-white px-3 py-2 mt-2">
                      Be A Volunteer
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ftco-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4 d-flex align-self-stretch ">
              <div className="media block-6 d-flex services p-3 py-4 d-block">
                <div className="icon d-flex mb-3">
                  <span className="flaticon-donation-1" />
                </div>
                <div className="media-body pl-4">
                  <h3 className="heading">Make Donation</h3>
                  <p>
                    Even the all-powerful Pointing has no control about the
                    blind texts it is an almost unorthographic.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex align-self-stretch ">
              <div className="media block-6 d-flex services p-3 py-4 d-block">
                <div className="icon d-flex mb-3">
                  <span className="flaticon-charity" />
                </div>
                <div className="media-body pl-4">
                  <h3 className="heading">Become A Volunteer</h3>
                  <p>
                    Even the all-powerful Pointing has no control about the
                    blind texts it is an almost unorthographic.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex align-self-stretch ">
              <div className="media block-6 d-flex services p-3 py-4 d-block">
                <div className="icon d-flex mb-3">
                  <span className="flaticon-donation" />
                </div>
                <div className="media-body pl-4">
                  <h3 className="heading">Sponsorship</h3>
                  <p>
                    Even the all-powerful Pointing has no control about the
                    blind texts it is an almost unorthographic.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ftco-section bg-light">
        <div className="container-fluid">
          <div className="row justify-content-center mb-5 pb-3">
            <div className="col-md-5 heading-section  text-center">
              <h2 className="mb-4">Our Causes</h2>
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts.
              </p>
            </div>
          </div>
          {/* slide */}
          <SlideHome />
        </div>
      </section>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center mb-5 pb-3">
            <div className="col-md-7 heading-section  text-center">
              <h2 className="mb-4">Latest Donations</h2>
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts.
              </p>
            </div>
          </div>
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
                      <a href="teacher-single.html">Ivan Jacobson</a>
                    </h3>
                    <span className="position">Donated Just now</span>
                    <div className="text">
                      <p>
                        Donated <span>$150</span> for{" "}
                        <a href="#">Children Needs Food</a>
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
                      <a href="teacher-single.html">Ivan Jacobson</a>
                    </h3>
                    <span className="position">Donated Just now</span>
                    <div className="text">
                      <p>
                        Donated <span>$250</span> for{" "}
                        <a href="#">Children Needs Food</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ftco-gallery">
        <div className="d-md-flex">
          <a
            href="assets/layout/images/cause-2.jpg"
            className="gallery image-popup d-flex justify-content-center align-items-center img "
            style={{
              backgroundImage: `url(${publicUrl + "/images/cause-2.jpg"})`,
            }}
          >
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search" />
            </div>
          </a>
          <a
            href="assets/layout/images/cause-3.jpg"
            className="gallery image-popup d-flex justify-content-center align-items-center img "
            style={{
              backgroundImage: `url(${publicUrl + "/images/cause-3.jpg"})`,
            }}
          >
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search" />
            </div>
          </a>
          <a
            href="assets/layout/images/cause-4.jpg"
            className="gallery image-popup d-flex justify-content-center align-items-center img "
            style={{
              backgroundImage: `url(${publicUrl + "/images/cause-4.jpg"})`,
            }}
          >
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search" />
            </div>
          </a>
          <a
            href="assets/layout/images/cause-5.jpg"
            className="gallery image-popup d-flex justify-content-center align-items-center img "
            style={{
              backgroundImage: `url(${publicUrl + "/images/cause-5.jpg"})`,
            }}
          >
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search" />
            </div>
          </a>
        </div>
        <div className="d-md-flex">
          <a
            href="assets/layout/images/cause-6.jpg"
            className="gallery image-popup d-flex justify-content-center align-items-center img "
            style={{
              backgroundImage: `url(${publicUrl + "/images/cause-6.jpg"})`,
            }}
          >
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search" />
            </div>
          </a>
          <a
            href="assets/layout/images/image_3.jpg"
            className="gallery image-popup d-flex justify-content-center align-items-center img "
            style={{
              backgroundImage: `url(${publicUrl + "/images/image_3.jpg"})`,
            }}
          >
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search" />
            </div>
          </a>
          <a
            href="assets/layout/images/image_1.jpg"
            className="gallery image-popup d-flex justify-content-center align-items-center img "
            style={{
              backgroundImage: `url(${publicUrl + "/images/image_1.jpg"})`,
            }}
          >
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search" />
            </div>
          </a>
          <a
            href="assets/layout/images/image_2.jpg"
            className="gallery image-popup d-flex justify-content-center align-items-center img "
            style={{
              backgroundImage: `url(${publicUrl + "/images/image_2.jpg"})`,
            }}
          >
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search" />
            </div>
          </a>
        </div>
      </section>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center mb-5 pb-3">
            <div className="col-md-7 heading-section  text-center">
              <h2 className="mb-4">Recent from blog</h2>
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts.
              </p>
            </div>
          </div>
          <div className="row d-flex">
            <div className="col-md-4 d-flex ">
              <div className="blog-entry align-self-stretch">
                <a
                  href="blog-single.html"
                  className="block-20"
                  style={{
                    backgroundImage: `url(${
                      publicUrl + "/images/image_1.jpg"
                    })`,
                  }}
                ></a>
                <div className="text p-4 d-block">
                  <div className="meta mb-3">
                    <div>
                      <a href="#">Sept 10, 2018</a>
                    </div>
                    <div>
                      <a href="#">Admin</a>
                    </div>
                    <div>
                      <a href="#" className="meta-chat">
                        <span className="icon-chat" /> 3
                      </a>
                    </div>
                  </div>
                  <h3 className="heading mt-3">
                    <a href="#">Hurricane Irma has devastated Florida</a>
                  </h3>
                  <p>
                    A small river named Duden flows by their place and supplies
                    it with the necessary regelialia.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex ">
              <div className="blog-entry align-self-stretch">
                <a
                  href="blog-single.html"
                  className="block-20"
                  style={{
                    backgroundImage: `url(${
                      publicUrl + "/images/image_2.jpg"
                    })`,
                  }}
                ></a>
                <div className="text p-4 d-block">
                  <div className="meta mb-3">
                    <div>
                      <a href="#">Sept 10, 2018</a>
                    </div>
                    <div>
                      <a href="#">Admin</a>
                    </div>
                    <div>
                      <a href="#" className="meta-chat">
                        <span className="icon-chat" /> 3
                      </a>
                    </div>
                  </div>
                  <h3 className="heading mt-3">
                    <a href="#">Hurricane Irma has devastated Florida</a>
                  </h3>
                  <p>
                    A small river named Duden flows by their place and supplies
                    it with the necessary regelialia.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex ">
              <div className="blog-entry align-self-stretch">
                <a
                  href="blog-single.html"
                  className="block-20"
                  style={{
                    backgroundImage: `url(${
                      publicUrl + "/images/image_3.jpg"
                    })`,
                  }}
                ></a>
                <div className="text p-4 d-block">
                  <div className="meta mb-3">
                    <div>
                      <a href="#">Sept 10, 2018</a>
                    </div>
                    <div>
                      <a href="#">Admin</a>
                    </div>
                    <div>
                      <a href="#" className="meta-chat">
                        <span className="icon-chat" /> 3
                      </a>
                    </div>
                  </div>
                  <h3 className="heading mt-3">
                    <a href="#">Hurricane Irma has devastated Florida</a>
                  </h3>
                  <p>
                    A small river named Duden flows by their place and supplies
                    it with the necessary regelialia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row justify-content-center mb-5 pb-3">
            <div className="col-md-7 heading-section  text-center">
              <h2 className="mb-4">Our Latest Events</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 d-flex ">
              <div className="blog-entry align-self-stretch">
                <a
                  href="blog-single.html"
                  className="block-20"
                  style={{
                    backgroundImage: `url(${
                      publicUrl + "/images/event-1.jpg"
                    })`,
                  }}
                ></a>
                <div className="text p-4 d-block">
                  <div className="meta mb-3">
                    <div>
                      <a href="#">Sep. 10, 2018</a>
                    </div>
                    <div>
                      <a href="#">Admin</a>
                    </div>
                    <div>
                      <a href="#" className="meta-chat">
                        <span className="icon-chat" /> 3
                      </a>
                    </div>
                  </div>
                  <h3 className="heading mb-4">
                    <a href="#">World Wide Donation</a>
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
                    <a href="event.html">
                      Join Event <i className="ion-ios-arrow-forward" />
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex ">
              <div className="blog-entry align-self-stretch">
                <a
                  href="blog-single.html"
                  className="block-20"
                  style={{
                    backgroundImage: `url(${
                      publicUrl + "/images/event-2.jpg"
                    })`,
                  }}
                ></a>
                <div className="text p-4 d-block">
                  <div className="meta mb-3">
                    <div>
                      <a href="#">Sep. 10, 2018</a>
                    </div>
                    <div>
                      <a href="#">Admin</a>
                    </div>
                    <div>
                      <a href="#" className="meta-chat">
                        <span className="icon-chat" /> 3
                      </a>
                    </div>
                  </div>
                  <h3 className="heading mb-4">
                    <a href="#">World Wide Donation</a>
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
                    <a href="event.html">
                      Join Event <i className="ion-ios-arrow-forward" />
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex ">
              <div className="blog-entry align-self-stretch">
                <a
                  href="blog-single.html"
                  className="block-20"
                  style={{
                    backgroundImage: `url(${
                      publicUrl + "/images/event-3.jpg"
                    })`,
                  }}
                ></a>
                <div className="text p-4 d-block">
                  <div className="meta mb-3">
                    <div>
                      <a href="#">Sep. 10, 2018</a>
                    </div>
                    <div>
                      <a href="#">Admin</a>
                    </div>
                    <div>
                      <a href="#" className="meta-chat">
                        <span className="icon-chat" /> 3
                      </a>
                    </div>
                  </div>
                  <h3 className="heading mb-4">
                    <a href="#">World Wide Donation</a>
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
                    <a href="event.html">
                      Join Event <i className="ion-ios-arrow-forward" />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="ftco-section-3 img"
        style={{ backgroundImage: `url(${publicUrl + "/images/bg_3.jpg"})` }}
      >
        <div className="overlay" />
        <div className="container">
          <div className="row d-md-flex">
            <div className="col-md-6 d-flex ">
              <div
                className="img img-2 align-self-stretch"
                style={{
                  backgroundImage: `url(${publicUrl + "/images/bg_4.jpg"})`,
                }}
              />
            </div>
            <div className="col-md-6 volunteer pl-md-5 ">
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
                    defaultValue={""}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    defaultValue="Send Message"
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

export default Home;
