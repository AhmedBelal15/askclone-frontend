import "./add-answer-model.style.css";

const AddAnswerModel = ({handleSubmit, answer, setAnswer, question, isAnonymous}) => {
  return (
    <form className="add-answer-model-container" onSubmit={handleSubmit}>
      <div className="question-text" dir='auto'> <p>{question}</p></div>
      <div className="answer-area">
        <textarea
        value={answer}
        onChange={(e)=>{setAnswer(e.target.value)}}
        name="answer-area" id="answer-area" dir='auto'></textarea>
      </div>
      <div className="inline-between add-answer-footer">
        <button className ='answer-button'>Answer</button>
        <input type="file" accept="image/*" />
      </div>
    </form>
  );
};

export default AddAnswerModel;