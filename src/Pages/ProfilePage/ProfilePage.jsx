import AddQuestion from "../../Components/AddQuestion/AddQuestion.component.jsx";
import { useState, useEffect } from "react";
import AnswerModel from "../../Components/AnswerModel/AnswerModel.component.jsx";
import HomePageNav from "../../Components/HomePageNav/HomePageNav.Component.jsx";
import NoDataCard from "../../Components/NoDataCard/NoDataCard.component";
import { Helmet } from "react-helmet";
import "./profile-page.style.css";
import ProfileBoxHeader from "../../Components/ProfileBoxHeader/ProfileBoxHeader.component.jsx";

const ProfilePage = () => {
  const [question, setQuestion] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [image, setImage] = useState(
    "https://d2halst20r4hcy.cloudfront.net/6b7/9fe81/3833/415d/8e93/389851cfad74/normal/55473.jpg"
  );
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));

  useEffect(() => {
    (async function () {
      const response = await fetch(
        "http://localhost:4000/questions/getyouranswers",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "access-token": `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      const data = await response.json();
      if (data.length === 0) return;
      setAnswers(data);
    })();
    // eslint-disable-next-line
  }, []);
  //handle question submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question === "") return;
    const response = await fetch("http://localhost:4000/question/askyourself", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "access-token": `Bearer ${accessToken}`,
        "refresh-token": refreshToken,
      },
      body: JSON.stringify({
        question,
        isAnonymous,
      }),
    });
    const data = await response.json();
    setQuestion("");

  };

  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Profile</title>
        </Helmet>
      </div>
      <HomePageNav />
      <div className="profile-page-container">
        <ProfileBoxHeader image={image} isVisible="none" />
        <AddQuestion
          question={question}
          setQuestion={setQuestion}
          handleSubmit={handleSubmit}
          isAnonymous={isAnonymous}
          setIsAnonymous={setIsAnonymous}
        />
        {answers.map((answer) => {
          return (
            <div key={answer.question_id}>
              <AnswerModel
                question={answer.question}
                answeredDate={answer.answered_date}
                answer={answer.answer}
                isAnonymous={answer.is_anonymous}
                likedBy={answer.liked_by}
              />
            </div>
          );
        })}
        {!answers ? <NoDataCard data="answers" /> : null}
      </div>
    </>
  );
};

export default ProfilePage;
