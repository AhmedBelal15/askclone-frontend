import { useState } from "react";
import { useParams } from 'react-router-dom'
import LoginRegisterNav from "../../Components/LoginRegisterNav/LoginRegisterNav.Component";
import "./new-password-page.style.css";

const NewPasswordPage = () => {
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const {resetToken} = useParams()
const handleSubmit = async(e) => {
    e.preventDefault()
    if(values.password !== values.confirmPassword){return alert("Passwords don't match")}
    const response = await fetch(`http://localhost:4000/updatepassword/${resetToken}`, {
        method: 'put',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            password: values.password,
            confirmPassword: values.confirmPassword
        })
    })
    const data = await response.json()
    alert(data)
}
  return (
    <div className="new-password-container">
      <LoginRegisterNav />
      <form onSubmit={handleSubmit} className="login-register-form new-password-form">
        <div className='form-element'>
          <label htmlFor="password">Enter your new password</label>
          <input type="password" 
          name="password" 
          required
          value={values.password}
          onChange={(e)=> setValues({...values, password: e.target.value})}
          minLength='6'
          />
        </div>
        <div className='form-element'>
          <label htmlFor="confirmPassword">Confirm your new password</label>
          <input type="password" 
          name="confirmPassword" 
          required 
          value={values.confirmPassword}
          onChange={(e)=> setValues({...values, confirmPassword: e.target.value})}
          minLength='6'
          />
        </div>
        <button type="submit">Proceed</button>
      </form>
    </div>
  );
};

export default NewPasswordPage;
