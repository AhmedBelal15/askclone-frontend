import "./answer-model.style.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactComponent as Heart } from "../../Assets/questions-icons/heart.svg";
import tokensRefresher from "../../helpers/tokensRefresher";
import { ReactComponent as DeleteIcon } from "../../Assets/questions-icons/delete-icon.svg";

const AnswerModel = ({
  question,
  answeredDate,
  answer,
  isAnonymous,
  likedBy,
  numberOfLikes,
  questionId,
  image,
  senderId,
  deleteHidden,
  userImage,
  userName,
  handleAnswerDelete,
}) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [like, setLike] = useState(false);
  const [count, setCount] = useState(numberOfLikes);

  //likes visibility effect
  useEffect(() => {
    if (likedBy != undefined && likedBy.includes(userId)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, []);

  const handleLike = async () => {
    //handleLike
    if (!like) {
      const response = await fetch(
        `https://imcurious-backend.herokuapp.com/questions/addlike/${questionId}`,
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
        setLike(true);
        setCount((currentCount) => currentCount + 1);
      }
    } else {
      const response = await fetch(
        `https://imcurious-backend.herokuapp.com/questions/removelike/${questionId}`,
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
        setLike(false);
        setCount((currentCount) => currentCount - 1);
      }
    }
  };

  let visible;
  !isAnonymous ? (visible = "inline-block") : (visible = "none");
  return (
    <div className="answer-model">
      <DeleteIcon
        onClick={() => handleAnswerDelete(questionId)}
        className={`delete-answer ${deleteHidden ? "hidden" : null}`}
      />
      <div className="question-container">
        <div className='question-text-container'>
        <p className="question">{question}</p>
        </div>
        <div className="author" style={{ display: visible }}>
          <span
            style={{
              backgroundImage: `url('https://imcurious-backend.herokuapp.com/${userImage}')`,
            }}
            alt="user-image"
            className="answer-image"
          ></span>
          <Link to={`/user/${senderId}`} className="profile-link">
            {userName}
          </Link>
        </div>
      </div>
      <Link to={`/answer/${questionId}`} className="decoration-none">
        <span className="from-period">
          {answeredDate ? answeredDate.substring(0, 10) : null}
        </span>
      </Link>
      <article className="answer">{answer}</article>
      {image ? (
        <img src={`https://imcurious-backend.herokuapp.com/${image}`} alt="answer" />
      ) : null}
      <div className="answer-likes">
        <Heart
          onClick={handleLike}
          className={`heart-icon ${like ? "fill-red" : "fill-gray"}`}
        />
        <p className="likes-count">{count}</p>
      </div>
    </div>
  );
};

export default AnswerModel;
