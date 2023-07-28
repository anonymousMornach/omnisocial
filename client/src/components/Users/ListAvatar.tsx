import React from 'react'
import Avatar from "@mui/material/Avatar";

export default function ListAvatar(props:any){
    const {user, color} = props
    return(
        <>
            {!user ? (
                <Avatar
                    alt={user ? user.name : "user"}
                    src={user ? user.profilePicture : "/static/images/avatar/1.jpg"}/>
            ) : (
                !user.profilePicture ? (
                    <Avatar sx={{bgcolor: color}} aria-label="recipe">
                        {user.username.charAt(0)}
                    </Avatar>
                ) : (
                    <Avatar
                        alt={user ? user.name : "user"}
                        src={user ? user.profilePicture : "/static/images/avatar/1.jpg"}/>
                )
            )}
        </>
    )
}