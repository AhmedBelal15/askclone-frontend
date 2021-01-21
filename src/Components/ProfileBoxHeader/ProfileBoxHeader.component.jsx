import { useState } from "react"
import "./profile-box-header.style.css"
const ProfileBoxHeader = ({image, isVisible}) =>{
const profilename = JSON.parse(localStorage.getItem('userName'))

    return(
        <div className='profile-header'>
            <div className='profilebox'>
            <span className='profilebox-name'>{profilename}</span>
            <button style={{display: isVisible}}>Follow</button>
            </div>
            <span className='profilebox-image' style={{backgroundImage: `url(${image})`}}></span>
        </div>
    )
}

export default ProfileBoxHeader