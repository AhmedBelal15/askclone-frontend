import { useState } from "react";
import LoginRegisterNav from "../../Components/LoginRegisterNav/LoginRegisterNav.Component";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./register-page.style.css";
const RegisterPage = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      return alert("Please make sure that passwords are identical!");
    }

    const response = await fetch("http://localhost:4000/auth/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: values.username,
        email: values.email.toLocaleLowerCase(),
        password: values.password,
        confirmPassword: values.confirmPassword,
      }),
    });
    const data = await response.json();
    alert(data);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile</title>
      </Helmet>
      <div className="login-register-page">
        <LoginRegisterNav />
        <form
          className="login-register-form register-form"
          onSubmit={handleSubmit}
        >
          <div>
            <h1>Register</h1>
            <h2>
              Already have an account?{" "}
              <Link style={{ textDecoration: "none" }} to="/login">
                <span>Login</span>
              </Link>
            </h2>
          </div>
          <div className="form-element">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              required
              maxLength="60"
              value={values.username}
              onChange={(e) => {
                setValues({ ...values, username: e.target.value });
              }}
            />
          </div>
          <div className="form-element">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              maxLength="255"
              value={values.email}
              onChange={(e) => {
                setValues({ ...values, email: e.target.value });
              }}
            />
          </div>
          <div className="form-element">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              minLength="6"
              maxLength="255"
              value={values.password}
              onChange={(e) => {
                setValues({ ...values, password: e.target.value });
              }}
            />
          </div>
          <div className="form-element">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              required
              value={values.confirmPassword}
              onChange={(e) => {
                setValues({ ...values, confirmPassword: e.target.value });
              }}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
