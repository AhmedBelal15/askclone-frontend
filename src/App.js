import "./App.css";
import useStore from "./Zustand/AuthZustand";
import MainPage from "./Pages/MainPage/MainPage";
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage/ForgotPasswordPage";
import NewsFeedPage from "./Pages/NewsFeedPage/NewsFeedPage";
import NewPasswordPage from "./Pages/NewPasswordPage/NewPasswordPage";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import QuestionsPage from "./Pages/QuestionsPage/QuestionsPage";
import AddAnswerPage from "./Pages/AddAnswerPage/AddAnswerPage";
import UserPage from "./Pages/UserPage/UserPage";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";
import FriendsPage from "./Pages/FriendsPage/FriendsPage";
import GetAnswerPage from "./Pages/GetAnswerPage/GetAnswerPage.jsx";
import socket from "./WebSockets/WebsocketConnection";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import NotificationPage from "./Pages/NotificationPage/NotificationPage";
const userId = JSON.parse(localStorage.getItem('userId'))

function App() {
  // Zustand State management
  const login = useStore((state) => state.login);
  const setLogin = useStore((state) => state.setLogin);
  const getLoggedIn = localStorage.getItem("loggedIn");
  if (getLoggedIn === "true" && login === false) {
    setLogin();
  }
  ////////////////////////////
useEffect(()=>{
  socket.emit('connected', userId)
}, [])
  ////////////////////////////
  return (
    <Router>
      <Link to='/notifications'>
      <Toaster position="bottom-right" reverseOrder={false} />
      </Link>
      <Route
        exact
        path="/"
        render={() => (login ? <Redirect to="/home" /> : <MainPage />)}
      />

      <Route
        exact
        path="/login"
        render={() => (login ? <Redirect to="/home" /> : <LoginPage />)}
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
        render={() => (!login ? <Redirect to="/login" /> : <NewsFeedPage />)}
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

      <Route
        exact
        path="/settings"
        render={() => (!login ? <Redirect to="/login" /> : <SettingsPage />)}
      />

      <Route
        exact
        path="/following"
        render={() => (!login ? <Redirect to="/login" /> : <FriendsPage />)}
      />

      <Route
        exact
        path="/answer/:answerid"
        render={() => (!login ? <Redirect to="/login" /> : <GetAnswerPage />)}
      />

      <Route
        exact
        path="/notifications"
        render={() => (!login ? <Redirect to="/login" /> : <NotificationPage />)}
      />
      
    </Router>
  );
}

export default App;
