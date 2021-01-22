import {useState, useEffect} from 'react'
import FollowedUserCard from '../../Components/FollowedUserCard/FollowedUserCard.Component'
import HomePageNav from '../../Components/HomePageNav/HomePageNav.Component'
import './friends-page.style.css'

const FriendsPage = ( ) => {

    return (
        <>
        <HomePageNav />
        <div className='friends-page-container'>
        <FollowedUserCard />
        </div>
        </>
    )
}

export default FriendsPage