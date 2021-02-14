import {Link} from 'react-router-dom'
import './followed-user-card.style.css'

const FollowedUserCard = ({username, userImage, userId}) => {
    return (
    <div className='followed-user-card'>
        <Link to={`/user/${userId}`} className='followed-user'>
        <div style={userImage?{background: `url(https://imcurious-backend.herokuapp.com/${userImage})`, backgroundSize: 'cover'}: null} className='followed-user-image'></div>
        <span>{username}</span>
        </Link>
    </div>
    )
}

export default FollowedUserCard