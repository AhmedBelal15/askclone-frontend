import { ReactComponent as LogoutIcon } from "../../Assets/nav-icons/logout-icon.svg";
import { useState } from "react";
import "./logout-button.style.css";
const LogoutButton = () => {
  const [modal, setModal] = useState(false);
  const handleClick = () => {
    setModal(!modal);
  };
  return (
    <>
      <LogoutIcon
        className="nav-icon logout-icon"
        title="Logout"
        onClick={handleClick}
      />
    </>
  );
};

export default LogoutButton;
