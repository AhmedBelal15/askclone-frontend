import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./profile-box-header.style.css";
const ProfileBoxHeader = ({ image, isFollowVisible, profilename }) => {
  //Initialize State for the values of the button
  const [followed, setFollowed] = useState(false);
  //get data from localstorage
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  //required user
  const userId = useParams().id;

  // check following status
  useEffect(() => {
    if(isFollowVisible === 'none'){return}
    (async function () {
      const response = await fetch(
        `https://imcurious-backend.herokuapp.com/checkfollow/${userId}`,
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
      if (response.status === 200 && data === "success") {
        setFollowed(true);
      } else if (
        response.status === 200 &&
        data === "User 1 isn't following user 2"
      ) {
        setFollowed(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  //handle Following/ Unfollowing
  const handleClick = async () => {
    if (followed) {
      const response = await fetch(`https://imcurious-backend.herokuapp.com/unfollow/${userId}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          "access-token": `Bearer ${accessToken}`,
          "refresh-token": refreshToken,
        },
      });
      const data = await response.json();

      if (response.status === 200 && data === "unfollowed") {
        setFollowed(false);
      }
    } else {
      const response = await fetch(`https://imcurious-backend.herokuapp.com/follow/${userId}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "access-token": `Bearer ${accessToken}`,
          "refresh-token": refreshToken,
        },
      });
      const data = await response.json();

      if (response.status === 200 && data === "followed") {
        setFollowed(true);
      }
    }
  };

  return (
    <div className="profile-header">
      <div className="profilebox">
        <span className="profilebox-name">{profilename}</span>
        <button onClick={handleClick} style={{ display: isFollowVisible }}>
          {followed ? "Unfollow" : "Follow"}
        </button>
      </div>
      <span
        className="profilebox-image"
        style={{ backgroundImage: `url(${image})` }}
      ></span>
    </div>
  );
};

export default ProfileBoxHeader;
