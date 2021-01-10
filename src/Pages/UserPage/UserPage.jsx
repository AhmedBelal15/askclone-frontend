import AddQuestion from "../../Components/AddQuestion/AddQuestion.component.jsx";
import { useState, useEffect } from "react";
import AnswerModel from "../../Components/AnswerModel/AnswerModel.component.jsx";
import HomePageNav from "../../Components/HomePageNav/HomePageNav.Component.jsx";
import { useParams } from "react-router-dom";
import NoDataCard from '../../Components/NoDataCard/NoDataCard.component'
import "../ProfilePage/profile-page.style.css";

const UserPage = () => {
  const [question, setQuestion] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [answers, setAnswers] = useState([]);
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  const refreshToken = JSON.parse(localStorage.getItem("user")).refreshToken;
  const profileId = useParams().id;

  //handleSubmit for Asking a Question
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question === "") return;
    const response = await fetch(
      `http://localhost:4000/questions/askquestion/${profileId}`,
      {
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
      }
    );
    const data = await response.json();
    setQuestion("");

    if (data[1] !== undefined) {
      localStorage.setItem("user", JSON.stringify(data[1]));
    }
  };

  //Fetching user Answers
  useEffect(() => {
    (async function () {
      const response = await fetch(
        `http://localhost:4000/questions/getanswers/${profileId}`,
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
      if(data[0]==='error')return
      setAnswers(data);
    })();
// eslint-disable-next-line
  }, []);

  return (
    <>
      <HomePageNav />
      <div className="profile-page-container">
        <AddQuestion
          question={question}
          setQuestion={setQuestion}
          handleSubmit={handleSubmit}
          isAnonymous={isAnonymous}
          setIsAnonymous={setIsAnonymous}
        />
        {(answers.length !== 0) ? answers.map((answer) => {
          return (
            <div key={answer.question_id}>
              <AnswerModel
                question={answer.question}
                askedDate={answer.answered_date}
                answer={answer.answer}
              />
            </div>
          );
        }): <NoDataCard data = {'answers'} />}
      </div>
    </>
  );
};

export default UserPage;
