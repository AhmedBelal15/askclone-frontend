import { useState } from "react";
import "./forgot-password-page.style.css";
import LoginRegisterNav from "../../Components/Nav/LoginRegisterNav.Component";
const ForgotPasswordPage = () => {
  document.title = "Forgot Password";
  const [values, setValues] = useState({
    email: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div className="login-register-page">
      <LoginRegisterNav />
      <form className="login-register-form forgot-form" onSubmit={handleSubmit}>
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
  );
};

export default ForgotPasswordPage;
