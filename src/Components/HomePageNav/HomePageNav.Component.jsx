import { Link } from "react-router-dom";
import "./home-page-nav.stlye.css";
import {ReactComponent as SettingsIcon} from '../../Assets/nav-icons/settings_icon.svg'
import {ReactComponent as NotificationIcon} from '../../Assets/nav-icons/notification-icon.svg'
import {ReactComponent as HomeIcon} from '../../Assets/nav-icons/home-icon.svg'
import UserIcon from '../../Assets/nav-icons/user-icon.png'
import QuestionIcon from '../../Assets/nav-icons/question-icon.png'
import  FriendsIcon from '../../Assets/nav-icons/friends-icon.png'
import AskLogo from "../../Assets/ask-logo.png";

const HomePageNav = () => {
  return (
    <nav>

      <div className="home-page-nav">
        <div className='nav-icons-container'>
          <Link to='/settings'><SettingsIcon className='nav-icon'  alt='settings icon' /></Link>
          <Link to='/notifications'><NotificationIcon className='nav-icon' alt='notifications icon' /></Link>
          <Link to='/friends'><img src={FriendsIcon} alt="friends icon" className='nav-icon' /></Link>
          <Link to='/profile'><img src={UserIcon} className='nav-icon' alt="profile icon"/></Link>
          <Link to='/questions'><img src={QuestionIcon} className='nav-icon' alt="question icon"/></Link>
          <Link to='/home'><HomeIcon className='nav-icon' alt='home icon' /></Link>
        </div>

        <div>
          <Link to='/home'>
            <img src={AskLogo} alt="askfm logo" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HomePageNav;
