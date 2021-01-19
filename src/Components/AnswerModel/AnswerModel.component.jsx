import "./answer-model.style.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactComponent as Heart } from "../../Assets/questions-icons/heart.svg";
import tokensRefresher from "../../helpers/tokensRefresher";

const AnswerModel = ({
  question,
  answeredDate,
  answer,
  isAnonymous,
  likedBy,
  questionId,
  image

}) => {
  const [backgroundImage, setBackgroundImage] = useState(
    "https://d2halst20r4hcy.cloudfront.net/6b7/9fe81/3833/415d/8e93/389851cfad74/normal/55473.jpg"
  );
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [like, setLike] = useState(false);
  const [count, setCount] = useState(0)

  //likes visibility effect
  useEffect(() => {
    if (likedBy != undefined && likedBy.includes(userId)) {
      setLike(true)
    } else {
      setLike(false)
    }
  }, []);

  //likes count effect
  useEffect(()=>{
    if(likedBy != undefined){
      setCount(likedBy.length)
    }
  },[])


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
        setCount(currentCount => currentCount + 1)
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
        setCount(currentCount => currentCount - 1)
      }
    }
  };
  let visible;
  !isAnonymous ? (visible = "inline-block") : (visible = "none");
  return (
    <div className="answer-model">
      <div className="question-container">
        <p className="question">{question}</p>
        <div className="author" style={{ display: visible }}>
          <span
            style={{ backgroundImage: `url(${backgroundImage})` }}
            alt="placeholder"
            className="answer-image"
          ></span>
          <Link to="#" className="profile-link">
            profile name placeholder
          </Link>
        </div>
      </div>

      <span className="from-period">
        {" "}
        {answeredDate ? answeredDate.substring(0, 10) : "placeholder"}{" "}
      </span>

      <article className="answer">{answer}</article>
      {image?<img src={image} alt="answer-image"/>:null}
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
