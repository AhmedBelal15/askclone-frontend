import HomePageNav from "../../Components/HomePageNav/HomePageNav.Component";
import AddQuestion from "../../Components/AddQuestion/AddQuestion.component";
import AnswerModel from "../../Components/AnswerModel/AnswerModel.component";
import { Helmet } from "react-helmet";
import "./home-page.style.css";

const HomePage = () => {

  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home Page</title>
        </Helmet>
      </div>
      <HomePageNav />
      <div className="home-page">
        <AddQuestion />
        <div style={{ height: "50px" }}></div>
        <AnswerModel />
      </div>
    </>
  );
};

export default HomePage;
