import "./App.css";
import MainPage from "./Pages/MainPage/MainPage";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LoginPage from "./Pages/LoginPage/LoginPage";
function App() {
  return (
    <Router>
      <Route exact path='/' component={MainPage} />
      <Route exact path='/login' component={LoginPage} />
    </Router>
  );
}

export default App;
