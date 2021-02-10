import AddQuestion from "../../Components/AddQuestion/AddQuestion.component.jsx";
import { useState, useEffect } from "react";
import useStore from "../../Zustand/AuthZustand";
import AnswerModel from "../../Components/AnswerModel/AnswerModel.component.jsx";
import HomePageNav from "../../Components/HomePageNav/HomePageNav.Component.jsx";
import NoDataCard from "../../Components/NoDataCard/NoDataCard.component";
import { Helmet } from "react-helmet";
import ProfileBoxHeader from "../../Components/ProfileBoxHeader/ProfileBoxHeader.component.jsx";
import tokensRefresher from "../../helpers/tokensRefresher";
import "./profile-page.style.css";

const ProfilePage = () => {
  const [question, setQuestion] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [userData, setUserData] = useState({
    userName: "",
    userImage: "",
  });

  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  const Logout = useStore((state) => state.setLogout);
  useEffect(() => {
    (async function () {
      const response = await fetch(
        "http://localhost:4000/questions/getyouranswers",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "access-token": `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      if (response.status === 401) {
        localStorage.clear();
        Logout();
      }

      const data = await response.json();
      if (data === 0) return;
      tokensRefresher(data);
      setAnswers(data.payload);
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async function () {
      const userId = JSON.parse(localStorage.getItem("userId"));
      const response = await fetch(
        `http://localhost:4000/user/getuserandimage/${userId}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "access-token": `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      const data = (await response.json()).payload[0];
      let newData;
      if (data.user_image != null) {
        newData = data.user_image;
      } else {
        newData = "";
      }

      setUserData({
        userName: data.user_name,
        userImage: newData,
      });
    })();
    // eslint-disable-next-line
  }, []);
  //handle question submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question === "") return;
    const response = await fetch("http://localhost:4000/question/askyourself", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "access-token": `Bearer ${accessToken}`,
        "refresh-token": refreshToken,
      },
      body: JSON.stringify({
        question,
        isAnonymous,
      }),
    });
    const data = await response.json();
    tokensRefresher(data);
    setQuestion("");
  };
  //Handle answer delete
  //handle delete function
  const handleAnswerDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this answer?\n note that the question will be returned to question page"
      )
    ) {
      try {
        await fetch(`http://localhost:4000/questions/removeAnswer/${id}`, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            "access-token": `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        });
        const newAnswers = answers.filter((answer) => answer.question_id !== id);
        setAnswers(newAnswers);
      } catch (error) {
        alert("error");
      }
    }
  };

  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Profile</title>
        </Helmet>
      </div>
      <HomePageNav />
      <div className="profile-page-container">
        <ProfileBoxHeader
          image={`http://localhost:4000/${userData.userImage}`}
          isFollowVisible="none"
          profilename={userData.userName}
        />
        <AddQuestion
          question={question}
          setQuestion={setQuestion}
          handleSubmit={handleSubmit}
          isAnonymous={isAnonymous}
          setIsAnonymous={setIsAnonymous}
        />
        {answers.map((answer) => {
          return (
            <div key={answer.question_id}>
              <AnswerModel
                question={answer.question}
                answeredDate={answer.answered_date}
                answer={answer.answer}
                isAnonymous={answer.is_anonymous}
                likedBy={answer.liked_by}
                numberOfLikes={answer.liked_by? answer.liked_by.length : 0}
                questionId={answer.question_id}
                image={answer.answer_image}
                senderId={answer.sender_id}
                deleteHidden={false}
                handleAnswerDelete={handleAnswerDelete}
                userName={answer.user_name}
                userImage={answer.user_image}
              />
            </div>
          );
        })}
        {!answers ? <NoDataCard data="answers" /> : null}
      </div>
    </>
  );
};

export default ProfilePage;
