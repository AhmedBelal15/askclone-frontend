import React from "react";
import logo from "../../Assets/ask-logo.png";
import AppStore from "../../Assets/app-store.png";
import GooglePlay from "../../Assets/google-play.png";
import AppGallery from "../../Assets/app-gallery.png";
import { ReactComponent as AskLogo } from "../../Assets/social-icons/askfm.svg";
import { ReactComponent as FacebookLogo } from "../../Assets/social-icons/facebook.svg";
import { ReactComponent as GithubLogo } from "../../Assets/social-icons/github.svg";
import { ReactComponent as InstagramLogo } from "../../Assets/social-icons/instagram.svg";
import { ReactComponent as TwitterLogo } from "../../Assets/social-icons/twitter.svg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./main-page.style.css";
const MainPage = () => {
  return (
    <React.Fragment>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home Page</title>
        </Helmet>
      </div>
      <div className="main-page">
        <div className="top">
          <img src={logo} alt="Ask fm Logo" className="ask-logo" />
          <h1>
            Curious? <strong> Just ask! </strong> <br />{" "}
            <strong>Openly or anonymously.</strong>{" "}
          </h1>
          <Link to="/register">
            <button className="register-button">Register</button>
          </Link>
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
        </div>
        <div className="stores">
          <img src={AppStore} alt="App Store" className="store" />
          <img src={GooglePlay} alt="Google Play" className="store" />
          <img src={AppGallery} alt="App Gallery" className="store" />
        </div>
      </div>
      <footer className="main-page-footer">
        <h2>Side Project By: Ahmed Belal</h2>
        <ul>
          <li>
            <Link to="/">About ASKfm</Link>
          </li>
          <li>
            <Link to="/">Safety center</Link>
          </li>
          <li>
            <Link to="/">Help</Link>
          </li>
          <li>
            <Link to="/">Community Guidelines</Link>
          </li>
          <li>
            <Link to="/">Terms of use</Link>
          </li>
          <li>
            <Link to="/">Privacy policy</Link>
          </li>
          <li>
            <Link to="/"> Cookies policy</Link>
          </li>
          <li>
            <Link to="/">Advertising</Link>
          </li>
          <li>
            <Link to="/">Professionals</Link>
          </li>
        </ul>
        <hr />
        <div className="languages-socials">
          <div className="language">
            <span>
              Language: <span>English</span>{" "}
            </span>
          </div>
          <div className="socials">
            <AskLogo className="social-logo" />
            <FacebookLogo className="social-logo" />
            <InstagramLogo className="social-logo" />
            <GithubLogo className="social-logo" />
            <TwitterLogo className="social-logo" />
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default MainPage;
