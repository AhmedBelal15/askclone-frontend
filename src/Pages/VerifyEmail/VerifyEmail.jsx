import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoginRegisterNav from "../../Components/LoginRegisterNav/LoginRegisterNav.Component";
import { Helmet } from "react-helmet";
import "./verify-email.style.css";
const VerifyEmail = () => {
  const [content, setContent] = useState("");
  const { verifyToken } = useParams();
  useEffect(() => {
    (async function () {
      const response = await fetch(
        `https://imcurious-backend.herokuapp.com/auth/verifyemail/${verifyToken}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setContent(data);
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Verify Email</title>
      </Helmet>
      <div>
        <LoginRegisterNav />
        <div className="verify-email-container">
          <h1>{content}</h1>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
