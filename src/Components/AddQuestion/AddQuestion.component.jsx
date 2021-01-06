import Switch from "../Switch/Switch.Component";
import "./add-question.style.css";

const AddQuestion = ({handleSubmit, question, setQuestion, isAnonymous, setIsAnonymous}) => {


  return (
    <form className="add-question-form" 
    onSubmit={handleSubmit}
    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
    >
      <div className="add-question-input-container">
        <input type="textarea" className="add-question-input" value={question} onChange={(e)=> setQuestion(e.target.value)} />
      </div>
      <div className="add-question-button-container">
        <div>
          <span>Ask anonymously</span>
          <Switch
          isAnonymous={isAnonymous}
          setIsAnonymous={setIsAnonymous}
          />
        </div>
        <button type="submit" className='add-question-buton'>Ask</button>
      </div>
    </form>
  );
};

export default AddQuestion;
