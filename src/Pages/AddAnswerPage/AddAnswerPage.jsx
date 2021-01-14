import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import AddAnswerModel from "../../Components/AddAnswerModel/AddAnswerModel.component";
import HomePageNav from "../../Components/HomePageNav/HomePageNav.Component";
import {useHistory} from 'react-router-dom'
import tokensRefresher from '../../helpers/tokensRefresher'
import "./add-answer-page.style.css";
const AddAnswerPage = () => {
  const [answer, setAnswer] = useState("");
  const [questionData, setQuestionData] = useState({
    question: "",
    isAnonymous: true,
  });
  const questionId = useParams().questionid;
  const accessToken = JSON.parse(localStorage.getItem("accessToken"))
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"))
  const history = useHistory()
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
        question: data.payload.question,
        isAnonymous: data.payload.isAnonymous,
      });
      tokensRefresher(data)
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          answer,
        }),
      }
    );
    const data = await response.json();
    tokensRefresher(data)
    if(response.status === 200){history.push('/profile')}
  };

  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Add Answer</title>
        </Helmet>
      </div>
      <HomePageNav />
      <div className="add-answer-container">
        <AddAnswerModel
          handleSubmit={handleSubmit}
          answer={answer}
          setAnswer={setAnswer}
          question={questionData.question}
          isAnonymous={questionData.isAnonymous}
        />
      </div>
    </>
  );
};

export default AddAnswerPage;
