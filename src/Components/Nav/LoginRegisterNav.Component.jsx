import {Link} from 'react-router-dom'
import './LoginRegisterNav.style.css'
import logo from "../../Assets/ask-logo.png";

const LoginRegisterNav = () => {
  return (
    <nav>
      <div className="login-register-nav">
        <Link to="/">
          <img src={logo} alt="ask logo" />
        </Link>
      </div>
    </nav>
  );
};

export default LoginRegisterNav;
