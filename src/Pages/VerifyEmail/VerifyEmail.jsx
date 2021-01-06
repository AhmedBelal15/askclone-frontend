import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoginRegisterNav from "../../Components/LoginRegisterNav/LoginRegisterNav.Component";
import './verify-email.style.css'
const VerifyEmail = () => {
document.title('Email Verification')
  const [content, setContent] = useState("");
  const { verifyToken } = useParams();
  useEffect(() => {
    (async function () {
      const response = await fetch(
        `http://localhost:4000/auth/verifyemail/${verifyToken}`,
        {
          method: "put",
          headers: {
              "Content-Type": "application/json"
          }
        }
      );
      const data = await response.json();
      setContent(data);
    })();
  }, []);

  return (
    <div>
      <LoginRegisterNav />
      <div className='verify-email-container'>
      <h1>{content}</h1>
      </div>
    </div>
  );
};

export default VerifyEmail;
