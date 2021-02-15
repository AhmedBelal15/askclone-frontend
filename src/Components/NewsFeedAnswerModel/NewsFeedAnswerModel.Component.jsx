import { Link } from "react-router-dom";
import { ReactComponent as Heart } from "../../Assets/questions-icons/heart.svg";
import { useState, useEffect } from "react";
import handleLike from "../../helpers/handleLike";

const NewsFeedAnswerModel = ({
  answer,
  answerImage,
  answeredDate,
  isQuestionAnonymous,
  question,
  likeStatus,
  questionerName,
  questionerImage,
  senderId,
  recieverId,
  numberOfLikes,
  questionId,
}) => {
  const [userData, setUserData] = useState({
    userName: "",
    userImage: "",
  });
  const [isLiked, setIsLiked] = useState(likeStatus);
  const [likesCount, setLikesCount] = useState(numberOfLikes);

  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));

  useEffect(() => {
    (async function () {
      const response = await fetch(
        `http://localhost:4000/user/getuserandimage/${recieverId}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "access-token": `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      const data = (await response.json()).payload[0];
      setUserData({
        userName: data.user_name,
        userImage: data.user_image,
      });
    })();
  }, []);

  let visible;
  !isQuestionAnonymous ? (visible = "inline-block") : (visible = "none");
  return (
    <div className="answer-model">
      <div className="question-container">
        <div className="question-text-container">
          <p className="question">{question}</p>
        </div>
        <div className="author" style={{ display: visible }}>
          <span
            style={{
              backgroundImage: `url('http://localhost:4000/${questionerImage}')`,
            }}
            className="answer-image"
          ></span>
          <Link to={`/user/${senderId}`} className="profile-link">
            {questionerName}
          </Link>
        </div>
        <div className="answer-author"></div>
      </div>
      <Link className="decoration-none" to={`/answer/${questionId}`}>
        <span className="from-period">
          {answeredDate ? answeredDate.substring(0, 10) : null}
        </span>
      </Link>
      <div className="answer-author">
        <span
          className="author-image"
          style={{
            backgroundImage: `url("http://localhost:4000/${userData.userImage}")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></span>
        <Link className="decoration-none" to={`/user/${recieverId}`}>
          <span>{userData.userName}</span>
        </Link>
      </div>
      <article className="answer">{answer}</article>
      {answerImage ? (
        <img src={`http://localhost:4000/${answerImage}`} alt="answer" />
      ) : null}
      <div className="answer-likes">
        <Heart
          onClick={()=>handleLike(isLiked, setIsLiked, setLikesCount, questionId)}
          className={`heart-icon ${isLiked ? "fill-red" : "fill-gray"}`}
        />
        <p className="likes-count">{likesCount}</p>
      </div>
    </div>
  );
};

export default NewsFeedAnswerModel;
