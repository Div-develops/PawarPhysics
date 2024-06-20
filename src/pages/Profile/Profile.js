import React from 'react'
import { useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import './profile.css'
import Navbar from '../Navbar/Navbar';
function Profile() {
    const { user } = useContext(AuthContext);
    const displayName = user.email.split("@")[0]
    return (
        <div style={{ backgroundColor: "#444444", height: "100vh", display: "flex",flexDirection: "column", alignItems: "center",gap:"30px"}}>
            <div style={{marginTop:"50px",fontSize:"40px",fontFamily:"Poppins",fontWeight:"400",color:"#ffff"}}>Profile Page</div>

            <div className="profile-box">

                <div className="profile-image-container">
                    <img
                        src={`https://robohash.org/${displayName}12.png?set=set4&size=100x100`}
                        alt="kitten"
                        className="profile-image"
                    />
                </div>
                <div className="profile-details">
                    <div className="profile-username">Username: {displayName}</div>
                    <div className="profile-email">Email: {user.email}</div>
                </div>
            </div>
        </div>
    )
}

export default Profile