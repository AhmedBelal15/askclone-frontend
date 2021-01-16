import { useContext } from 'react'
import {AuthContext} from '../../Context/AuthContext'
import './logout-popup.style.css'

const LogoutPopup = ({isVisible,handleVisibility}) => {
const [login, setLogin] = useContext(AuthContext)
const handleLogout = () => {
    localStorage.clear()
    setLogin(false)
}
    return (
        <div className={`logout-popup ${isVisible? 'popup-visible' : 'popup-hidden'}`} >
            <div className = 'logout-header'>
                <p>Logout</p>
            </div>
            <div className = 'logout-body' >
            <p>Are you sure you want to logout?</p>
            <div className='logout-buttons'>
                    <button className='logout-yes' onClick={handleLogout}>Yes</button> <button className='logout-no' onClick={handleVisibility}>No</button>
                </div>
            </div>
        </div>
    )
}

export default LogoutPopup