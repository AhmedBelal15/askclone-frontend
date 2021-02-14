import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import AddAnswerModel from "../../Components/AddAnswerModel/AddAnswerModel.component";
import HomePageNav from "../../Components/HomePageNav/HomePageNav.Component";
import { useHistory } from "react-router-dom";
import tokensRefresher from "../../helpers/tokensRefresher";
import useStore from '../../Zustand/AuthZustand'

import "./add-answer-page.style.css";
const AddAnswerPage = () => {
  //state
  const [answer, setAnswer] = useState('');
  const [questionData, setQuestionData] = useState({
    question: "",
    isAnonymous: true,
  });
  const [imagePath, setImagePath] = useState(null)
  //getting tokens for sending request
  const questionId = useParams().questionid;
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  const Logout = useStore(state => state.setLogout)
  const history = useHistory();

  //fetching the question data
  useEffect(() => {
    (async function () {
      const response = await fetch(
        `https://imcurious-backend.herokuapp.com/questions/getquestion/${questionId}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "access-token": `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      if(response.status === 401){
        localStorage.clear()
        Logout()
    }
      const data = await response.json();

      setQuestionData({
        question: data.payload.question,
        isAnonymous: data.payload.isAnonymous,
      });
      tokensRefresher(data);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answer.text === "") return;
    const response = await fetch(
      `https://imcurious-backend.herokuapp.com/questions/addanswer/${questionId}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "access-token": `Bearer ${accessToken}`,
          "refresh-token": refreshToken,
        },
        body: JSON.stringify({
          answer: answer,
          imagePath
        }),
      }
    );

    const data = await response.json();
    tokensRefresher(data);
    if (response.status === 200) {
      history.push("/profile");
    }
  };

  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Add Answer</title>
        </Helmet>
      </div>
      <HomePageNav />
      <div className="add-answer-container">
        <AddAnswerModel
          handleSubmit={handleSubmit}
          answer={answer.text}
          setAnswer={setAnswer}
          question={questionData.question}
          isAnonymous={questionData.isAnonymous}
          setImagePath={setImagePath}
        />
      </div>
    </>
  );
};

export default AddAnswerPage;
