import HomePageNav from "../../Components/HomePageNav/HomePageNav.Component";
import { Helmet } from "react-helmet";
import NewsFeedAnswerModel from '../../Components/NewsFeedAnswerModel/NewsFeedAnswerModel.Component'
import {useEffect, useState} from 'react'
import "./news-feed-page.style.css";

const NewsFeedPage = () => {
const [answers, setAnswers] = useState([])
const accessToken = JSON.parse(localStorage.getItem("accessToken"));
const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
const userId = JSON.parse(localStorage.getItem('userId'))
useEffect(()=>{
  (async function(){
    const response = await fetch(`http://localhost:4000/newsfeed`, {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        "access-token": `Bearer ${accessToken}`,
        "refresh-token": refreshToken,
      },
    })
    const data = (await response.json()).payload
    if(data.length === 0){return}
    setAnswers(data)
  })()
}, [])
  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>News Feed</title>
        </Helmet>
      </div>
      <HomePageNav />
      <div className="home-page">
        <div style={{ height: "50px" }}></div>
        
       {answers.length? answers.map(answer=>{
         return(
         <div key={answer.question_id}>
          <NewsFeedAnswerModel
          answer = {answer.answer}
          answerImage = {answer.answer_image}
          answeredDate = {answer.answered_date}
          isQuestionAnonymous = {answer.is_anonymous}
          question = {answer.question}
          questionId={answer.question_id}
          likeStatus = {answer.liked_by? answer.liked_by.includes(userId): false}
          questionerName = {answer.questioner_name}
          questionerImage = {answer.questioner_image}
          senderId = {answer.sender_id}
          recieverId = {answer.reciever_id}
          numberOfLikes = {answer.liked_by? answer.liked_by.length: 0}
        />
         </div>
         )
       }):  <div className='no-data-card'> <p>No answers available now <br/> Make sure to invite your friends and follow them</p> </div>}
      </div>
    </>
  );
};

export default NewsFeedPage;
