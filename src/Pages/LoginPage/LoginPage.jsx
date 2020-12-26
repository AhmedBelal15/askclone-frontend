import "./login-page.style.css";
import logo from "../MainPage/Assets/ask-logo.png";
const LoginPage = () => {

    const handleSubmit = e => {
        e.preventDefault()
    }

  return (
    <div className="login-page">
      <div className="login-nav">
        <img src={logo} alt="ask logo" />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <h1>Log in</h1>
          <h2>Don’t have an account yet? <span>Sign up</span></h2>
        </div>
        <div className="form-element">
          <label htmlFor="Email">Email</label>
          <input type="text" name="Email" placeholder='Email' />
        </div>
        <div className="form-element">
          <label htmlFor="Password"> Password </label>
          <input type="password" name="password" placeholder= 'Password'  />
        </div>
        <div className='inline-between'>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <input type="checkbox" name="checkbox" className="form-checkbox" />
            <label htmlFor="checkbox">Remember me</label>
          </div>
          <span>Forgot Password?</span>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
