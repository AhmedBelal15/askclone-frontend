import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddAnswerModel from "../../Components/AddAnswerModel/AddAnswerModel.component";
import HomePageNav from "../../Components/HomePageNav/HomePageNav.Component";
import "./add-answer-page.style.css";
const AddAnswerPage = () => {
  const [answer, setAnswer] = useState("");
  const [questionData, setQuestionData] = useState({
    question: "",
    isAnonymous: true,
  });
  const questionId = useParams().questionid;
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  const refreshToken = JSON.parse(localStorage.getItem("user")).refreshToken;

  useEffect(() => {
    (async function () {
      const response = await fetch(
        `http://localhost:4000/questions/getquestion/${questionId}`,
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
     
      setQuestionData({
        question: data.question,
        isAnonymous: data.isAnonymous,
      });
    })();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
    const refreshToken = JSON.parse(localStorage.getItem("user")).refreshToken;
    const response = await fetch(
      `http://localhost:4000/questions/addanswer/${questionId}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "access-token": `Bearer ${accessToken}`,
          "refresh-token": refreshToken,
        },
        body: JSON.stringify({
          questionId: answer,
          answer: questionId,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <HomePageNav />
      <div className="add-answer-container">
        <AddAnswerModel
          handleSubmit={handleSubmit}
          answer={answer}
          setAnswer={setAnswer}
          question = {questionData.question}
          isAnonymous = {questionData.isAnonymous}
        />
      </div>
    </>
  );
};

export default AddAnswerPage;
