import HomePageNav from "../../Components/HomePageNav/HomePageNav.Component";
import AnswerModel from "../../Components/AnswerModel/AnswerModel.component";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./get-answer-page.style.css";
const GetAnswerPage = () => {
  const [answer, setAnswer] = useState({});
  const questionId = useParams().answerid;
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));

  useEffect(() => {
    (async function () {
      const response = await fetch(
        `http://localhost:4000/questions/getoneanswer/${questionId}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "access-token": `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );

      const data = (await response.json()).payload;
      setAnswer(data);
        
    })();
  }, []);
  console.log(answer);
  return (
    <>
      <Helmet>
        <title>Answer</title>
      </Helmet>
      <HomePageNav />
      <div className="answer-page-container">
        <div className='one-answer'>
        <AnswerModel
          question={answer.question}
          answeredDate={answer.answered_date}
          answer={answer.answer}
          isAnonymous={answer.is_anonymous}
          likedBy={answer.liked_by}
          questionId={answer.question_id}
          image={answer.answer_image}
          senderId={answer.sender_id}
          userName= {answer.user_name}
          userImage = {answer.user_image}
          deleteHidden={true}
        />
        </div>
      </div>
    </>
  );
};

export default GetAnswerPage;
