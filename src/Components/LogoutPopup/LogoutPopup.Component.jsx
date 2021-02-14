import "./logout-popup.style.css";
import useStore from "../../Zustand/AuthZustand";
import socket from "../../WebSockets/WebsocketConnection";
const LogoutPopup = ({ isVisible, handleVisibility }) => {
  const setLogout = useStore((state) => state.setLogout);
  const handleLogout = () => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));

    localStorage.clear();
    setLogout();
    socket.disconnect();
    fetch("https://imcurious-backend.herokuapp.com/auth/logout", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        "access-token": `Bearer ${accessToken}`,
        "refresh-token": refreshToken,
      },
    });
  };
  return (
    <div
      className={`logout-popup ${isVisible ? "popup-visible" : "popup-hidden"}`}
    >
      <div className="logout-header">
        <p>Logout</p>
      </div>
      <div className="logout-body">
        <p>Are you sure you want to logout?</p>
        <div className="logout-buttons">
          <button className="logout-yes" onClick={handleLogout}>
            Yes
          </button>{" "}
          <button className="logout-no" onClick={handleVisibility}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
