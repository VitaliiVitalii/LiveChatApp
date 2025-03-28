import React from 'react'
import { useState, useEffect } from 'react'
import './userInfo.css'
import ProfileInfo from './profileInfo/ProfileInfo'
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface MyJwtPayload {
    user_id: string;
  }
  
  interface UserProfile {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar?: string;
  }

const UserInfo = () => {

    const [profile, setProfile] = useState(false)
    const [userData, setUserData] = useState<UserProfile | null>(null);

    const API_USER_DETAILS = "https://batrak.pythonanywhere.com/api/users/";

   useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem("access_token");

            if(!token) {
                console.error("Error token");
                return;
            }

            try{
                const decoded: MyJwtPayload = jwtDecode(token);
                const user_id = decoded.user_id;

                const response = await axios.get<UserProfile>(`${API_USER_DETAILS}${user_id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })

                setUserData(response.data);

            } catch(err) {
                console.error("Error user profile", err);
            }

        }
        fetchUserProfile();
   }, [])

    const handleProfile = () => {
        setProfile(!profile)
    }

    return (
        <div className='userInfo'>
            <div className='user' onClick={handleProfile}>
                <img src='./avatar.png' alt='avatar'/>
                <h2>{userData ? `${userData.first_name} ${userData.last_name}` : ""}</h2>
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