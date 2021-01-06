import AddQuestion from "../../Components/AddQuestion/AddQuestion.component.jsx";
import { useState } from "react";
import AnswerModel from "../../Components/AnswerModel/AnswerModel.component.jsx";
import HomePageNav from "../../Components/HomePageNav/HomePageNav.Component.jsx";
import "./profile-page.style.css";

const ProfilePage = () => {
  const [question, setQuestion] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  const refreshToken = JSON.parse(localStorage.getItem("user")).refreshToken;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question === "") return;
    const response = await fetch("http://localhost:4000/question/addquestion", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "access-token": `Bearer ${accessToken}`,
        "refresh-token": refreshToken,
      },
      body: JSON.stringify({
        reciever_id: "a61918b2-6898-4ea3-8dbd-9d55f03c3470",
        question,
        isAnonymous,
      }),
    });
    const data = await response.json();
    setQuestion("");

    if(data[1]!== undefined ){
      localStorage.setItem('user', JSON.stringify(data[1]))
    }

  };

  return (
    <>
      <HomePageNav />
      <div className="profile-page-container">
        <AddQuestion
          question={question}
          setQuestion={setQuestion}
          handleSubmit={handleSubmit}
          isAnonymous={isAnonymous}
          setIsAnonymous={setIsAnonymous}
        />
        <AnswerModel />
        <AnswerModel />
        <AnswerModel />
        <AnswerModel />
        <AnswerModel />
      </div>
    </>
  );
};

export default ProfilePage;
