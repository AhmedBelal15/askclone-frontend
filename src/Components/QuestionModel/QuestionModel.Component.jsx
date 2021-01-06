import { ReactComponent as DeleteIcon } from "../../Assets/questions-icons/delete-icon.svg";

import "./question-model.style.css";

const QuestionModel = () => {
  return (
    <div className="question-model">
      <div className="question-top">
        <DeleteIcon className="delete-icon" />
        <p className = 'question' dir='auto'>الكتابة بالعربي جامدة زوحليقة</p>
      </div>
      <div className="question-bottom inline-between">
        <button>Answer {'>'}</button>
        <p className = 'from-period'>date</p>
      </div>
    </div>
  );
};

export default QuestionModel;
