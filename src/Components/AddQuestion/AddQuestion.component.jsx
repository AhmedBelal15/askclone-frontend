//150 * 500
import { useState } from "react";
import Switch from "../Switch/Switch.Component";
import "./add-question.style.css";

const AddQuestion = () => {

  const [question, setQuestion] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(question);
    setQuestion('')
  }
  return (
    <form className="add-question-form" onSubmit={handleSubmit}>
      <div className="add-question-input-container">
        <input type="textarea" className="add-question-input" value={question} onChange={(e)=> setQuestion(e.target.value)} />
      </div>
      <div className="add-question-button-container">
        <div>
          <span>Ask anonymously</span>
          <Switch />
        </div>
        <button type="submit" className='add-question-buton'>Ask</button>
      </div>
    </form>
  );
};

export default AddQuestion;
