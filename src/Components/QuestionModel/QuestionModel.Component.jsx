import { ReactComponent as DeleteIcon } from "../../Assets/questions-icons/delete-icon.svg";
import { Link } from "react-router-dom";
import "./question-model.style.css";

const QuestionModel = ({ question, date, handleDelete, questionId }) => {
  return (
    <div className="question-model">
      <div className="question-top">
        <DeleteIcon className="delete-icon" onClick={handleDelete} />
        <p className="question" dir="auto">
          {question}
        </p>
      </div>
      <div className="question-bottom inline-between">
        <Link to={`/answerquestion/${questionId}`}>
          <button>Answer {">"}</button>
        </Link>
        <p className="from-period">{date.substring(0, 10)}</p>
      </div>
    </div>
  );
};

export default QuestionModel;
