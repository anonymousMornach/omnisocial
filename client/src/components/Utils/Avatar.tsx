import {red} from "@mui/material/colors";
import * as React from "react";
import {Avatar} from "@mui/material";

export default function ListAvatar(props:any){
    const {user} = props
    return(
        <>
            {!user ? (
                <Avatar
                    alt={user ? user.name : "user"}
                    src={user ? user.profilePicture : "/static/images/avatar/1.jpg"}
                >
                </Avatar>
            ) : (
                !user.profilePicture ? (
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {user ? user.username.charAt(0) : "A"} {/* Display the first character of the user's name */}
                    </Avatar>
                ) : (
                    <Avatar
                        alt={user ? user.name : "user"}
                        src={user ? user.profilePicture : "/static/images/avatar/1.jpg"}
                    />)
            )}
        </>
    )
}