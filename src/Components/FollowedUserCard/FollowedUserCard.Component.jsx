import {Link} from 'react-router-dom'
import './followed-user-card.style.css'

const FollowedUserCard = () => {
    return (
    <div className='followed-user-card'>
        <Link to='#' className='followed-user'>
        <div className='followed-user-image'></div>
        <span>Ahmed Belal</span>
        </Link>
    </div>
    )
}

export default FollowedUserCard