import "./App.css";
import { useState } from "react";
import MainPage from "./Pages/MainPage/MainPage";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage/ForgotPasswordPage";
import HomePage from "./Pages/HomePage/HomePage";
import NewPasswordPage from "./Pages/NewPasswordPage/NewPasswordPage";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import QuestionsPage from "./Pages/QuestionsPage/QuestionsPage";
import AddAnswerPage from "./Pages/AddAnswerPage/AddAnswerPage";
import UserPage from './Pages/UserPage/UserPage'
function App() {
  //handle app sign in
  const [login, setLogin] = useState(false);
  const getLoggedIn = localStorage.getItem("loggedIn");
  if (getLoggedIn === "true" && login === false) {
    setLogin(true);
  }
  //////////////////////

  return (
    <Router>
      <Route
        exact
        path="/"
        render={() => (login ? <Redirect to="/home" /> : <MainPage />)}
      />

      <Route
        exact
        path="/login"
        render={() =>
          login ? <Redirect to="/home" /> : <LoginPage setLogin={setLogin} />
        }
      />

      <Route
        exact
        path="/register"
        render={() => (login ? <Redirect to="/home" /> : <RegisterPage />)}
      />

      <Route
        exact
        path="/forgot-password"
        render={() =>
          login ? <Redirect to="/home" /> : <ForgotPasswordPage />
        }
      />
      <Route
        exact
        path="/updatepassword/:resetToken"
        render={() => (login ? <Redirect to="/home" /> : <NewPasswordPage />)}
      />
      <Route
        exact
        path="/verifyemail/:verifyToken"
        render={() => (login ? <Redirect to="/home" /> : <VerifyEmail />)}
      />

      <Route
        exact
        path="/home"
        render={() => (!login ? <Redirect to="/login" /> : <HomePage />)}
      />

      <Route
        exact
        path="/profile"
        render={() => (!login ? <Redirect to="/login" /> : <ProfilePage />)}
      />
      <Route
        exact
        path="/user/:id"
        render={() => (!login ? <Redirect to="/login" /> : <UserPage />)}
      />
      <Route
        exact
        path="/questions"
        render={() => (!login ? <Redirect to="/login" /> : <QuestionsPage />)}
      />

      <Route
        exact
        path="/answerquestion/:questionid"
        render={() => (!login ? <Redirect to="/login" /> : <AddAnswerPage />)}
      />

    </Router>
  );
}

export default App;
