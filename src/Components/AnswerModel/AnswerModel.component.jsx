import "./answer-model.style.css";
import { Link } from "react-router-dom";
import {useState} from 'react'
import { ReactComponent as Heart } from "../../Assets/questions-icons/heart.svg";
const AnswerModel = () => {
    const [like, setLike] = useState(false)
    const [backgroundImage, setBackgroundImage] = useState('https://d2halst20r4hcy.cloudfront.net/6b7/9fe81/3833/415d/8e93/389851cfad74/normal/55473.jpg')
    const handleLike = () => {
        setLike(!like)
    }
  return (
    <div className="answer-model">
      <div className="question-container">
        <p className="question">
          question placeholder Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
        <div className="author">
          <span style={{backgroundImage: `url(${backgroundImage})`}} alt="placeholder" className='answer-image'></span>
          <Link to="#" className="profile-link">profile name placeholder</Link>
        </div>
      </div>

      <span className="from-period"> from 2 days </span>

      <article className="answer">
        answer placeholder Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Accusantium aliquam iure, beatae cumque nemo ad fugiat, debitis
        quisquam nostrum suscipit voluptas exercitationem sit amet ea qui, quasi
        odio aspernatur recusandae.
      </article>

      <div className="answer-likes">
        <Heart onClick={handleLike} className={`heart-icon ${like? 'fill-red': 'fill-gray'}`} />
        <p className='likes-count'>5</p>
      </div>
    </div>
  );
};

export default AnswerModel;