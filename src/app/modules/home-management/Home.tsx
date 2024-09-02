import { environment } from "@/shared/environment/Environment";
import "./Home.scss";
import SlideHome from "./slide-management/SlideHome";
function Home() {
  
  const publicUrl = environment.publicUrl;

  return (
    <div className="home">
      <nav
        className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
        id="ftco-navbar"
      >
        <div className="container">
          <a className="navbar-brand">Welfare</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="oi oi-menu" /> Menu
          </button>
          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a href="index.html" className="nav-link">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="about.html" className="nav-link">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a href="causes.html" className="nav-link">
                  Causes
                </a>
              </li>
              <li className="nav-item">
                <a href="donate.html" className="nav-link">
                  Donate
                </a>
              </li>
              <li className="nav-item">
                <a href="blog.html" className="nav-link">
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a href="gallery.html" className="nav-link">
                  Gallery
                </a>
              </li>
              <li className="nav-item">
                <a href="event.html" className="nav-link">
                  Events
                </a>
              </li>
              <li className="nav-item">
                <a href="contact.html" className="nav-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* END nav */}
      <div
        className="hero-wrap"
        style={{ backgroundImage: `url(${publicUrl + "/images/bg_7.jpg"})` }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay" />
        <div className="container">
          <div
            className="row no-gutters slider-text align-items-center justify-content-center"
            data-scrollax-parent="true"
          >
            <div
              className="col-md-7  text-center"
              data-scrollax=" properties: { translateY: '70%' }"
            >
              <h1
                className="mb-4"
                data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"
              >
                Doing Nothing is Not An Option of Our Life
              </h1>
              <p
                className="mb-5"
                data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"
              >
                Created by <a href="#">Colorlib.com</a>
              </p>
              <p data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">
                <a
                  href="https://vimeo.com/45830194"
                  className="btn btn-white btn-outline-white px-4 py-3 popup-vimeo"
                >
                  <span className="icon-play mr-2" />
                  Watch Video
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
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
          <SlideHome/>
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
            style={{  backgroundImage: `url(${publicUrl + "/images/cause-3.jpg"})`,}}
          >
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search" />
            </div>
          </a>
          <a
            href="assets/layout/images/cause-4.jpg"
            className="gallery image-popup d-flex justify-content-center align-items-center img "
            style={{  backgroundImage: `url(${publicUrl + "/images/cause-4.jpg"})`, }}
          >
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search" />
            </div>
          </a>
          <a
            href="assets/layout/images/cause-5.jpg"
            className="gallery image-popup d-flex justify-content-center align-items-center img "
            style={{  backgroundImage: `url(${publicUrl + "/images/cause-5.jpg"})`, }}
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
            style={{  backgroundImage: `url(${publicUrl + "/images/cause-6.jpg"})`, }}
          >
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search" />
            </div>
          </a>
          <a
            href="assets/layout/images/image_3.jpg"
            className="gallery image-popup d-flex justify-content-center align-items-center img "
            style={{ backgroundImage: `url(${publicUrl + "/images/image_3.jpg"})`, }}
          >
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search" />
            </div>
          </a>
          <a
            href="assets/layout/images/image_1.jpg"
            className="gallery image-popup d-flex justify-content-center align-items-center img "
            style={{ backgroundImage: `url(${publicUrl + "/images/image_1.jpg"})` }}
          >
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search" />
            </div>
          </a>
          <a
            href="assets/layout/images/image_2.jpg"
            className="gallery image-popup d-flex justify-content-center align-items-center img "
            style={{ backgroundImage: `url(${publicUrl + "/images/image_2.jpg"})` }}
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
                   backgroundImage: `url(${publicUrl + "/images/image_1.jpg"})`
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
                   backgroundImage: `url(${publicUrl + "/images/image_2.jpg"})`
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
                    backgroundImage: `url(${publicUrl + "/images/image_3.jpg"})`
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
                    backgroundImage: `url(${publicUrl + "/images/event-1.jpg"})`
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
                    backgroundImage: `url(${publicUrl + "/images/event-2.jpg"})`
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
                    backgroundImage: `url(${publicUrl + "/images/event-3.jpg"})`
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
                 backgroundImage: `url(${publicUrl + "/images/bg_4.jpg"})`
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
      <footer className="ftco-footer ftco-section img">
        <div className="overlay" />
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-3">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">About Us</h2>
                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind texts.
                </p>
                <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                  <li className="">
                    <a href="#">
                      <span className="icon-twitter" />
                    </a>
                  </li>
                  <li className="">
                    <a href="#">
                      <span className="icon-facebook" />
                    </a>
                  </li>
                  <li className="">
                    <a href="#">
                      <span className="icon-instagram" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">Recent Blog</h2>
                <div className="block-21 mb-4 d-flex">
                  <a
                    className="blog-img mr-4"
                    style={{
                     backgroundImage: `url(${publicUrl + "/images/image_1.jpg"})`
                    }}
                  />
                  <div className="text">
                    <h3 className="heading">
                      <a href="#">
                        Even the all-powerful Pointing has no control about
                      </a>
                    </h3>
                    <div className="meta">
                      <div>
                        <a href="#">
                          <span className="icon-calendar" /> July 12, 2018
                        </a>
                      </div>
                      <div>
                        <a href="#">
                          <span className="icon-person" /> Admin
                        </a>
                      </div>
                      <div>
                        <a href="#">
                          <span className="icon-chat" /> 19
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="block-21 mb-4 d-flex">
                  <a
                    className="blog-img mr-4"
                    style={{
                      backgroundImage: `url(${publicUrl + "/images/image_2.jpg"})`
                    }}
                  />
                  <div className="text">
                    <h3 className="heading">
                      <a href="#">
                        Even the all-powerful Pointing has no control about
                      </a>
                    </h3>
                    <div className="meta">
                      <div>
                        <a href="#">
                          <span className="icon-calendar" /> July 12, 2018
                        </a>
                      </div>
                      <div>
                        <a href="#">
                          <span className="icon-person" /> Admin
                        </a>
                      </div>
                      <div>
                        <a href="#">
                          <span className="icon-chat" /> 19
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="ftco-footer-widget mb-4 ml-md-4">
                <h2 className="ftco-heading-2">Site Links</h2>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="py-2 d-block">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="py-2 d-block">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="py-2 d-block">
                      Donate
                    </a>
                  </li>
                  <li>
                    <a href="#" className="py-2 d-block">
                      Causes
                    </a>
                  </li>
                  <li>
                    <a href="#" className="py-2 d-block">
                      Event
                    </a>
                  </li>
                  <li>
                    <a href="#" className="py-2 d-block">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">Have a Questions?</h2>
                <div className="block-23 mb-3">
                  <ul>
                    <li>
                      <span className="icon icon-map-marker" />
                      <span className="text">
                        203 Fake St. Mountain View, San Francisco, California,
                        USA
                      </span>
                    </li>
                    <li>
                      <a href="#">
                        <span className="icon icon-phone" />
                        <span className="text">+2 392 3929 210</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="icon icon-envelope" />
                        <span className="text">info@yourdomain.com</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <p>
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                Copyright © All rights reserved | This template is made with{" "}
                <i className="icon-heart" aria-hidden="true" /> by{" "}
                <a href="https://colorlib.com" target="_blank">
                  Colorlib
                </a>
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              </p>
            </div>
          </div>
        </div>
      </footer>
      {/* loader */}
      {/* <div id="ftco-loader" className="show fullscreen">
          <svg className="circular" width="48px" height="48px">
            <circle
              className="path-bg"
              cx={24}
              cy={24}
              r={22}
              fill="none"
              strokeWidth={4}
              stroke="#eeeeee"
            />
            <circle
              className="path"
              cx={24}
              cy={24}
              r={22}
              fill="none"
              strokeWidth={4}
              strokeMiterlimit={10}
              stroke="#F96D00"
            />
          </svg>
        </div> */}
    </div>
  );
}

export default Home;
