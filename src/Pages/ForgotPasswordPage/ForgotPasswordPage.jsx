import { useState } from "react";
import { Helmet } from "react-helmet";
import "./forgot-password-page.style.css";
import LoginRegisterNav from "../../Components/LoginRegisterNav/LoginRegisterNav.Component";
const ForgotPasswordPage = () => {
  const [values, setValues] = useState({
    email: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://imcurious-backend.herokuapp.com/auth/forgotpassword", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: values.email,
      }),
    });
    const data = await response.json();
    alert(data);
  };

  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Forgot Password</title>
        </Helmet>
      </div>
      <div className="login-register-page">
        <LoginRegisterNav />
        <form
          className="login-register-form forgot-form"
          onSubmit={handleSubmit}
        >
          <div>
            <h1>Password recovery</h1>
          </div>
          <div className="form-element">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              required
            />
          </div>
          <button type="submit">Proceed</button>
          <p>
            We will send you a recovery link <br />{" "}
            <span>Check your junk or spam folders for a message</span>
          </p>
        </form>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
