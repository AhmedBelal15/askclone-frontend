
import "./profile-box-header.style.css"
const ProfileBoxHeader = ({image}) =>{
const profilename = JSON.parse(localStorage.getItem('user')).username
    return(
        <div className='profile-header'>
            <span className='profilebox-name'>{profilename}</span>
            <span className='profilebox-image' style={{backgroundImage: `url(${image})`}}></span>
        </div>
    )
}

export default ProfileBoxHeader