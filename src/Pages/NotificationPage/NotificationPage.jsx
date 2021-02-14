import { useState, useEffect } from "react";
import HomePageNav from "../../Components/HomePageNav/HomePageNav.Component";
import Helmet from "react-helmet";
import "./notification-page.style.css";
import NotificationCard from "../../Components/NotificationCard/NotificationCard.Component";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));

  useEffect(() => {
    (async function () {
      const response = await fetch(
        `https://imcurious-backend.herokuapp.com/users/notifications`,
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
      setNotifications(data.payload);
    })();
  }, []);

  //Handle NotificationClick
  const handleNotificationClick = async (id) => {
    await fetch(`https://imcurious-backend.herokuapp.com/users/marknotificationread/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "access-token": `Bearer ${accessToken}`,
        "refresh-token": refreshToken,
      },
    });
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title> Notifications </title>
      </Helmet>
      <HomePageNav />
      <div className="notificatons-page-contatiner">
        {notifications.map((notification) => {
          return (
            <div key={notification.notification_id}>
              <NotificationCard
                notificationType={notification.notification_type}
                notificationSenderName={notification.user_name}
                notificationSenderImage={notification.user_image}
                notificationDate={notification.notification_date}
                isQuestionAnonymous={notification.is_anonymous}
                notificationSender={`/user/${notification.notification_sender}`}
                questionId={notification.question_id}
                notificationId={notification.notification_id}
                handleNotificationClick={handleNotificationClick}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NotificationPage;
