import HomePageNav from "../../Components/HomePageNav/HomePageNav.Component";
import AnswerModelWithAuthor from "../../Components/AnswerModelWithAuthor/AnswerModelWithAuthor.Component";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import tokensRefresher from '../../helpers/tokensRefresher'
import "./get-answer-page.style.css";
const GetAnswerPage = () => {
  const [answer, setAnswer] = useState({});
  const questionId = useParams().answerid;
  const [likeStatus, setLikeStatus] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  const userId = JSON.parse(localStorage.getItem('userId'))
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
      if(data.liked_by){
        if(data.liked_by.includes(userId)){
          setLikeStatus(true)
        }
        setLikesCount(data.liked_by.length)
      }
    })();
  }, []);
//Handle Like

const handleLike = async () => {
  //handleLike
  if (!likeStatus) {
    const response = await fetch(
      `http://localhost:4000/questions/addlike/${questionId}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "access-token": `Bearer ${accessToken}`,
          "refresh-token": refreshToken,
        },
      }
    );
    const data = await response.json();
    tokensRefresher(data);
    if (response.status === 200) {
      setLikeStatus(true);
      setLikesCount((currentCount) => currentCount + 1);
    }
  } else {
    const response = await fetch(
      `http://localhost:4000/questions/removelike/${questionId}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "access-token": `Bearer ${accessToken}`,
          "refresh-token": refreshToken,
        },
      }
    );
    const data = await response.json();
    tokensRefresher(data);
    if (response.status === 200) {
      setLikeStatus(false);
      setLikesCount((currentCount) => currentCount - 1);
    }
  }
};

  return (
    <>
      <Helmet>
        <title>Answer</title>
      </Helmet>
      <HomePageNav />
      <div className="answer-page-container">
        <div className='one-answer'>
        <AnswerModelWithAuthor
          answer={answer.answer}
          answerImage={answer.answer_image}
          answeredDate={answer.answered_date}
          authorImage={answer.author_image}
          authorName={answer.author_name}
          isQuestionAnonymous={answer.is_anonymous}
          likedBy={answer.liked_by}
          question={answer.question}
          questionId={answer.question_id}
          questionerName= {answer.questioner_name}
          questionerImage = {answer.questioner_image}
          senderId={answer.sender_id}
          recieverId={answer.reciever_id}
          likeStatus={likeStatus}
          setLikeStatus={setLikeStatus}
          handleLike={handleLike}
          likesCount={likesCount}
          setLikesCount={setLikesCount}
        />
        </div>
      </div>
    </>
  );
};

export default GetAnswerPage;
