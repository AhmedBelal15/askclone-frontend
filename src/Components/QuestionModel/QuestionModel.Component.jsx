import { ReactComponent as DeleteIcon } from "../../Assets/questions-icons/delete-icon.svg";

import "./question-model.style.css";

const QuestionModel = ({question, date, handleDelete}) => {
  return (
    <div className="question-model">
      <div className="question-top">
        <DeleteIcon className="delete-icon" onClick={handleDelete} />
        <p className = 'question' dir='auto'> {question} </p>
      </div>
      <div className="question-bottom inline-between">
        <button>Answer {'>'}</button>
        <p className = 'from-period'>{date.substring(0,10)}</p>
      </div>
    </div>
  );
};

export default QuestionModel;
// question_id
// sender_id
// question
// is_anonymous
// asked_date