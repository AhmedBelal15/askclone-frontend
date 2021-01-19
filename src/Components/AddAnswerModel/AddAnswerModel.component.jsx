import "./add-answer-model.style.css";
import tokensRefresher from '../../helpers/tokensRefresher'
const AddAnswerModel = ({
  handleSubmit,
  answer,
  setAnswer,
  question,
  setImagePath
}) => {

  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  
  const handleImageUpload = async(event) => {
    const formData = new FormData()
    formData.append('image', event.target.files[0])

    const response = await fetch('http://localhost:4000/upload/image', {
    method: 'post',
    headers: {
      "access-token": `Bearer ${accessToken}`,
      "refresh-token": refreshToken,
    },
    body: formData
    })
    const data = await response.json()
    if(response.status === 200){
      setImagePath(data.payload)
      tokensRefresher(data)
    }
  }

  return (
    <form
      className="add-answer-model-container"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div className="question-text" dir="auto">
        <p>{question}</p>
      </div>
      <div className="answer-area">
        <textarea
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
          name="answer-area"
          id="answer-area"
          dir="auto"
        ></textarea>
      </div>
      <div className="inline-between add-answer-footer">
        <button className="answer-button">Answer</button>
        <div>
          <input
            type="file"
            id="upload-image"
            accept="image/*"
            className="upload-image-button"
            onChange={(e)=> handleImageUpload(e)}
          />
          <label htmlFor="upload-image" className="upload-label">
            Upload an Image
          </label>
        </div>
      </div>
    </form>
  );
};

export default AddAnswerModel;
