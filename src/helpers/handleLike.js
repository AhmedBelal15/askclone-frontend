import tokensRefresher from './tokensRefresher'

const handleLike = async (
  likeStatus,
  setLikeStatus,
  setLikesCount,
  questionId
) => {
  //handleLike
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  if (!likeStatus) {
    const response = await fetch(
      `https://imcurious-backend.herokuapp.com/questions/addlike/${questionId}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "access-token": `Bearer ${accessToken}`,
          "refresh-token": refreshToken,
        },
      }
    );
    const data = await response.json();
    tokensRefresher(data);
    if (response.status === 200) {
      setLikeStatus(true);
      setLikesCount((currentCount) => currentCount + 1);
    }
  } else {
    const response = await fetch(
      `https://imcurious-backend.herokuapp.com/questions/removelike/${questionId}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "access-token": `Bearer ${accessToken}`,
          "refresh-token": refreshToken,
        },
      }
    );
    const data = await response.json();
    tokensRefresher(data);
    if (response.status === 200) {
      setLikeStatus(false);
      setLikesCount((currentCount) => currentCount - 1);
    }
  }
};

export default handleLike;
