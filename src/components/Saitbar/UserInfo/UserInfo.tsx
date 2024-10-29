import { useState } from 'react'
import './userInfo.css'
import ProfileInfo from './profileInfo/ProfileInfo'

const UserInfo = () => {

    const [profile, setProfile] = useState(false)

    const handleProfile = () => {
        setProfile(!profile)
    }

    return (
        <div className='userInfo'>
            <div className='user' onClick={handleProfile}>
                <img src='./avatar.png' alt='avatar'/>
                <h2>Egor Shytenko</h2>
            </div>
            <div className='icons'>
                <img src='./more.png'/>
                <img src='./video.png'/>
                <img src='./edit.png'/>
            </div>
            {profile && <ProfileInfo />}
        </div>
    )
}

export default UserInfo