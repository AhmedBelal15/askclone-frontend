import { useState } from "react";
import {Link} from 'react-router-dom'
import "./login-page.style.css";
import logo from "../../Assets/ask-logo.png";
const LoginPage = () => {
  document.title='Login'
  const [values, setValues] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div className="login-register-page">
      <div className="login-register-nav">
        <img src={logo} alt="ask logo" />
      </div>
      <form className="login-register-form" onSubmit={handleSubmit}>
        <div>
          <h1>Log in</h1>
          <h2>
            Don’t have an account yet?{" "}
            <Link style={{ textDecoration: 'none' }} to="/register">
              <span>Register</span>
            </Link>
          </h2>
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
        <div className="form-element">
          <label htmlFor="password"> Password </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            required
          />
        </div>
        <div className="inline-between">
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              name="checkbox"
              className="form-checkbox"
              value={values.rememberMe}
              onChange={() =>
                setValues({ ...values, rememberMe: !values.rememberMe })
              }
            />
            <label htmlFor="checkbox">Remember me</label>
          </div>
         <Link style={{ textDecoration: 'none' }} to='forgot-password'><span>Forgot Password?</span></Link>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
