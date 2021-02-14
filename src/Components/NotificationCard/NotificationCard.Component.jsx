import {Link} from 'react-router-dom';
import "./notifocation-card.style.css";

const NotificationCard = ({notificationType, notificationSenderName, notificationDate, notificationSenderImage, isQuestionAnonymous, notificationSender, questionId, notificationId, handleNotificationClick}) => {

  if(notificationType === 'Question' && isQuestionAnonymous === true){
    notificationSenderName = 'Anonymous User'
    notificationSenderImage = 'images/anonymous-user.png'
    notificationSender = '#'
  }
  const imageStyle = {
    background: `url('https://imcurious-backend.herokuapp.com/${notificationSenderImage}')`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  return (
    <div className="notification-card">
        <Link to={notificationSender}>
      <div className="notification-image" style={imageStyle}></div>
      </Link>

      <div className="notification">
        
        <div onClick={()=>{handleNotificationClick(notificationId)}} className="notification-description">
            <Link to={notificationType === 'Question'? `/answerquestion/${questionId}`: `/answer/${questionId}`} className='notification-link'>
          you got a <span>{notificationType}</span> from <span>{notificationSenderName}</span>
          </Link>
        </div>

        <div className="from-period" style={{cursor: 'text'}}>{notificationDate.substring(0, 10)}</div>

      </div>
    </div>
  );
};

export default NotificationCard;
