import { useEffect, useState } from "react";
import HomePageNav from "../../Components/HomePageNav/HomePageNav.Component";
import NoDataCard from "../../Components/NoDataCard/NoDataCard.component";
import QuestionModel from "../../Components/QuestionModel/QuestionModel.Component";
import { Helmet } from "react-helmet";
import tokensRefresher from '../../helpers/tokensRefresher'
import "./questions-page.style.css";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  //handle delete function
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/questions/deletequestion/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          "access-token": `Bearer ${accessToken}`,
          "refresh-token": refreshToken,
        },
      });
      const newQuestions = questions.filter(
        (question) => question.question_id !== id
      );
      setQuestions(newQuestions);
    } catch (error) {
      alert("error");
    }
  };

  //fetching user questions
  let isMounted = true
  useEffect(() => {
    (async function () {
      const response = await fetch(
        "http://localhost:4000/questions/getquestions",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "access-token": `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      const data = await response.json();
      if(response.status === 400)return
      if(data.payload != undefined && isMounted) {setQuestions([...data.payload]);}
      tokensRefresher(data)
    })();
    // eslint-disable-next-line
    return ()=> isMounted=false
  }, []);
  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Questions</title>
        </Helmet>
      </div>
      <HomePageNav />
      <div className="questions-page-container">
        {questions.length === 0 ? <NoDataCard data={"Questions"} /> : null}
        {questions.map((question) => {
          return (
            <div key={question.question_id}>
              <QuestionModel
                isAnonymous={question.is_anonymous}
                recieverId={question.reciever_id}
                question={question.question}
                date={question.asked_date}
                questionId={question.question_id}
                handleDelete={() => handleDelete(question.question_id)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default QuestionsPage;
