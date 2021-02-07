import AddQuestion from "../../Components/AddQuestion/AddQuestion.component.jsx";
import { useState, useEffect } from "react";
import AnswerModel from "../../Components/AnswerModel/AnswerModel.component.jsx";
import HomePageNav from "../../Components/HomePageNav/HomePageNav.Component.jsx";
import { useParams, useHistory } from "react-router-dom";
import NoDataCard from "../../Components/NoDataCard/NoDataCard.component";
import { Helmet } from "react-helmet";
import tokensRefresher from '../../helpers/tokensRefresher'
import ProfileBoxHeader from "../../Components/ProfileBoxHeader/ProfileBoxHeader.component.jsx";
import useStore from '../../Zustand/AuthZustand'
import "../ProfilePage/profile-page.style.css";

const UserPage = () => {
  const [question, setQuestion] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [userData, setUserData] = useState({
    userName:'',
    imagePath: '',
    isFollowed: true,
  })
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  const Logout = useStore(state => state.setLogout)
  const profileId = useParams().id;
  const history = useHistory()
  if(profileId === JSON.parse(localStorage.getItem('userId'))){history.push('/profile')}

  //handleSubmit for Asking a Question
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question === "") return;
    const response = await fetch(
      `http://localhost:4000/questions/askquestion/${profileId}`,
      {
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
      }
    );
    const data = await response.json();
    tokensRefresher(data)
    setQuestion("");

    if (data[1] !== undefined) {
      localStorage.setItem("user", JSON.stringify(data[1]));
    }
  };

  //Fetching user data
  useEffect(()=>{
    (async function(){
      const userResponse = await fetch(`http://localhost:4000/user/getuserandimage/${profileId}`, {
        method: 'get',
        headers: {
          "Content-Type": "application/json",
          "access-token": `Bearer ${accessToken}`,
          "refresh-token": refreshToken,
        }
      })
      const userData = (await userResponse.json()).payload[0]
      if(userData.user_image != null){
        var userImage = userData.user_image;
      }
      const userName = userData.user_name
      setUserData({userName,imagePath: `http://localhost:4000/${userImage}`,isFollowed: true})
    })()
  }, [])


  //Fetching user Answers
  let isMounted = true
  useEffect(() => {
    (async function () {
      const response = await fetch(
        `http://localhost:4000/questions/getanswers/${profileId}`,
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
      setAnswers(data.payload)
      tokensRefresher(data)
      if (response.status === 400) return;
      if(response.status === 401){
        localStorage.clear()
        Logout()
    }
        if(isMounted){setAnswers(data.payload);}
    })();
    //preventing memory leak
    return()=> {isMounted = false}
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{userData.userName} profile</title>
      </Helmet>
      <HomePageNav />
      <div className="profile-page-container">
        <ProfileBoxHeader
        profilename = {userData.userName}
        image = {userData.imagePath}
        isFollowed = {userData.isFollowed}
        />
        <AddQuestion
          question={question}
          setQuestion={setQuestion}
          handleSubmit={handleSubmit}
          isAnonymous={isAnonymous}
          setIsAnonymous={setIsAnonymous}
        />
        {answers.length !== 0 ? (
          answers.map((answer) => {
            return (
              <div key={answer.question_id}>
                <AnswerModel
                question={answer.question}
                answeredDate={answer.answered_date}
                answer={answer.answer}
                isAnonymous={answer.is_anonymous}
                likedBy={answer.liked_by}
                questionId={answer.question_id}
                image={answer.answer_image}
                senderId = {answer.sender_id}
                userName={answer.user_name}
                userImage={answer.user_image}
                deleteHidden={true}
                />
              </div>
            );
          })
        ) : (
          <NoDataCard data={"answers"} />
        )}
      </div>
    </>
  );
};

export default UserPage;
