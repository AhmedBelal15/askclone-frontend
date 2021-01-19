import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import LoginRegisterNav from "../../Components/LoginRegisterNav/LoginRegisterNav.Component";
import useStore from '../../Zustand/AuthZustand'
import "./login-page.style.css";

const LoginPage = () => {
  const setLogin = useStore(state => state.setLogin)
  const [values, setValues] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/auth/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      localStorage.setItem('accessToken', JSON.stringify(data.accessToken))
      localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken))
      localStorage.setItem('userName', JSON.stringify(data.username))
      localStorage.setItem('userId', JSON.stringify(data.userId))
      localStorage.setItem("loggedIn", "true");
      setLogin();
    } else {
      alert(data);
    }
  };

  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Login</title>
        </Helmet>
      </div>
      <div className="login-register-page">
        <LoginRegisterNav />
        <form className="login-register-form" onSubmit={handleSubmit}>
          <div>
            <h1>Log in</h1>
            <h2>
              Don’t have an account yet?{" "}
              <Link style={{ textDecoration: "none" }} to="/register">
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
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
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
            <Link style={{ textDecoration: "none" }} to="forgot-password">
              <span>Forgot Password?</span>
            </Link>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
