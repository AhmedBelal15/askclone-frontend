import HomePageNav from "../../Components/HomePageNav/HomePageNav.Component";
import QuestionModel from "../../Components/QuestionModel/QuestionModel.Component";
import "./questions-page.style.css";

const QuestionsPage = () => {
  return (
    <>
      <HomePageNav />
      <div className="questions-page-container">
        <QuestionModel />
        <QuestionModel />
        <QuestionModel />

      </div>
    </>
  );
};

export default QuestionsPage;
