import { Link } from "react-router-dom";
import { ReactComponent as Heart } from "../../Assets/questions-icons/heart.svg";
import "./answer-model-with-author.style.css";
const AnswerModelWithAuthor = ({
  answer,
  answerImage,
  answeredDate,
  authorImage,
  authorName,
  isQuestionAnonymous,
  question,
  likeStatus,
  questionerName,
  questionerImage,
  senderId,
  recieverId,
  handleLike,
  likesCount
}) => {
    


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
              backgroundImage: `url('https://imcurious-backend.herokuapp.com/${questionerImage}')`,
            }}
            className="answer-image"
          ></span>
          <Link to={`/user/${senderId}`} className="profile-link">
            {questionerName}
          </Link>
        </div>
        <div className="answer-author"></div>
      </div>

      <span className="from-period">
        {answeredDate ? answeredDate.substring(0, 10) : null}
      </span>
      <div className="answer-author">
        <span
          className="author-image"
          style={{
            backgroundImage: `url("https://imcurious-backend.herokuapp.com/${authorImage}")`,
            backgroundPosition: 'center',
            backgroundSize: "cover",
          }}
        ></span>
        <Link className="decoration-none" to={`/user/${recieverId}`}>
          <span>{authorName}</span>
        </Link>
      </div>
      <article className="answer">{answer}</article>
      {answerImage ? (
        <img src={`https://imcurious-backend.herokuapp.com/${answerImage}`} alt="answer" />
      ) : null}
      <div className="answer-likes">
        <Heart
          onClick={handleLike}
          className={`heart-icon ${likeStatus ? "fill-red" : "fill-gray"}`}
        />
        <p className="likes-count">{likesCount}</p>
      </div>
    </div>
  );
};

export default AnswerModelWithAuthor;
