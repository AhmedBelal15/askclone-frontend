import "./App.css";
import MainPage from "./Pages/MainPage/MainPage";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage/ForgotPasswordPage";
import HomePage from "./Pages/HomePage/HomePage";
import NewPasswordPage from "./Pages/NewPasswordPage/NewPasswordPage";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";
function App() {
  return (
    <Router>
      <Route exact path='/' component={MainPage} />
      <Route exact path='/login' component={LoginPage} title='Login' />
      <Route exact path='/register' component={RegisterPage} />
      <Route exact path='/forgot-password' component={ForgotPasswordPage} />
      <Route exact path='/home' component={HomePage} />
      <Route exact path='/updatepassword/:resetToken' component={NewPasswordPage} />
      <Route exact path='/verifyemail/:verifyToken' component={VerifyEmail} />
    </Router>
  );
}

export default App;
