import { Link } from "react-router-dom";
import {useState} from 'react'
import {ReactComponent as SettingsIcon} from '../../Assets/nav-icons/settings_icon.svg'
import {ReactComponent as NotificationIcon} from '../../Assets/nav-icons/notification-icon.svg'
import {ReactComponent as HomeIcon} from '../../Assets/nav-icons/home-icon.svg'
import UserIcon from '../../Assets/nav-icons/user-icon.png'
import QuestionIcon from '../../Assets/nav-icons/question-icon.png'
import  FriendsIcon from '../../Assets/nav-icons/friends-icon.png'
import AskLogo from "../../Assets/ask-logo.png";
import LogoutButton from '../LogoutButton/LogoutButton'

import "./home-page-nav.stlye.css";
import LogoutPopup from "../LogoutPopup/LogoutPopup.Component";

const HomePageNav = () => {
  const [logoutPopup, setLogoutPopup] = useState(false)

  const handleVisibility = () => {
    setLogoutPopup(!logoutPopup)
    
  }
  const handleLogout = () => {}
  return (
   
    <>
    <div className='nav-container'>
    <nav>
      <div className="home-page-nav">
        <div className='nav-icons-container'>
          <div onClick={handleVisibility}>
          <LogoutButton />
          </div>
          <Link to='/settings'><SettingsIcon className='nav-icon'  alt='settings icon' title='Settings' /></Link>
          <Link to='/notifications'><NotificationIcon className='nav-icon' alt='notifications icon' title='Notification' /></Link>
          <Link to='/following'><img src={FriendsIcon} alt="friends icon" className='nav-icon' title='Following' /></Link>
          <Link to='/profile'><img src={UserIcon} className='nav-icon' alt="profile icon" title="Profile" /></Link>
          <Link to='/questions'><img src={QuestionIcon} className='nav-icon' alt="question icon" title='Questions' /></Link>
          <Link to='/home'><HomeIcon className='nav-icon' alt='home icon' title="Home" /></Link>
        </div>

        <div>
          <Link to='/home'>
            <img src={AskLogo} alt="askfm logo" />
          </Link>
        </div>
      </div>
    </nav>
    <div className='logout-nav'>
    <LogoutPopup isVisible={logoutPopup} handleVisibility={handleVisibility} />
    </div>
    </div>
    
    </>
  );
};

export default HomePageNav;
