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
import "./main-page.style.css";
const MainPage = () => {
  return (
    <React.Fragment>
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
        <h2>pictures placeholder</h2>
        <ul>
          <li>
            <a href="#">About ASKfm</a>
          </li>
          <li>
            <a href="#">Safety center</a>
          </li>
          <li>
            <a href="#">Help</a>
          </li>
          <li>
            <a href="#">Community Guidelines</a>
          </li>
          <li>
            <a href="#">Terms of use</a>
          </li>
          <li>
            <a href="#">Privacy policy</a>
          </li>
          <li>
            <a href="#"> Cookies policy</a>
          </li>
          <li>
            <a href="#">Advertising</a>
          </li>
          <li>
            <a href="#">Professionals</a>
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
