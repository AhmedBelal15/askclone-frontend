import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import FollowedUserCard from "../../Components/FollowedUserCard/FollowedUserCard.Component";
import HomePageNav from "../../Components/HomePageNav/HomePageNav.Component";
import NoDataCard from "../../Components/NoDataCard/NoDataCard.component";
import RedirectToHome from "../../helpers/redirectToHome";
import "./friends-page.style.css";

const FriendsPage = () => {
    //if not logged in
    RedirectToHome()
    
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  const [userData, setUserData] = useState({
    username: "",
    imagePath: "",
    userId: "",
  });
  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:4000/getfollowing", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "access-token": `Bearer ${accessToken}`,
          "refresh-token": refreshToken,
        },
      });
      const data = (await response.json()).payload;
      setUserData(data)
    })();
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Following</title>
      </Helmet>
      <HomePageNav />
      <div className="friends-page-container">
          {userData.length? 
          userData.map(user => {
              return(
                  <div key={user.is_following}>
                      <FollowedUserCard username={user.user_name} userImage={user.user_image} userId={user.is_following} />
                  </div>
              )
          })
          : <NoDataCard data="users" />}
      </div>
    </>
  );
};

export default FriendsPage;
