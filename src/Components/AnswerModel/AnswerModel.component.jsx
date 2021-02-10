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
  const [count, setCount] = useState(0);

  //likes count effect
  useEffect(() => {
    setCount(numberOfLikes);
  }, []);

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
        setLike(true);
        setCount((currentCount) => currentCount + 1);
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
        <p className="question">{question}</p>
        <div className="author" style={{ display: visible }}>
          <span
            style={{
              backgroundImage: `url('http://localhost:4000/${userImage}')`,
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
        <img src={`http://localhost:4000/${image}`} alt="answer-image" />
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
