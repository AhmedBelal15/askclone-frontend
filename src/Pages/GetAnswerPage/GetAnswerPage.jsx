import HomePageNav from "../../Components/HomePageNav/HomePageNav.Component";
import AnswerModelWithAuthor from "../../Components/AnswerModelWithAuthor/AnswerModelWithAuthor.Component";
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

  return (
    <>
      <Helmet>
        <title>Answer</title>
      </Helmet>
      <HomePageNav />
      <div className="answer-page-container">
        <div className='one-answer'>
        <AnswerModelWithAuthor
          question={answer.question}
          answeredDate={answer.answered_date}
          answer={answer.answer}
          isAnonymous={answer.is_anonymous}
          likedBy={answer.liked_by}
          numberOfLikes={answer.liked_by? answer.liked_by.length : 0}
          questionId={answer.question_id}
          image={answer.answer_image}
          senderId={answer.sender_id}
          userName= {answer.user_name}
          userImage = {answer.user_image}
          deleteHidden={true}
          handleAnswerDelete={()=>null}
        />
        </div>
      </div>
    </>
  );
};

export default GetAnswerPage;
