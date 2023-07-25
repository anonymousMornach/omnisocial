import React from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { red } from '@mui/material/colors';


export default function LeftMain(props:any) {
    return(
        <>
            <List  sx={{ display: { xs: 'none' , sm: 'block'} }}>
                <ListItem
                    alignItems="flex-start"
                    component={'a'}
                    href="/user"
                >
                    <ListItemAvatar>
                        {
                            !props.user ? (
                                    <Avatar
                                        alt={props.user ? props.user.name : "user"}
                                        src={props.user ? props.user.profilePicture : "/static/images/avatar/1.jpg"}
                                    >
                                    </Avatar>
                            ):(
                                !props.user.profilePicture ? (
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        {props.user.username.charAt(0)} {/* Display the first character of the user's name */}
                                    </Avatar>
                                ):(
                                    <Avatar
                                        alt={props.user ? props.user.name : "user"}
                                        src={props.user ? props.user.profilePicture : "/static/images/avatar/1.jpg"}
                                    />)
                            )
                        }
                    </ListItemAvatar>
                    <ListItemText
                        primary={props.user ? props.user.username : "user"}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {props.user ? props.user.name : "username"}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem
                    alignItems="flex-start"
                    component={'a'}
                    href="/user"
                >
                    <ListItemAvatar>
                        <Avatar alt="Friends" src="https://img.icons8.com/?size=512&id=87201&format=png" />
                    </ListItemAvatar>
                    <ListItemText
                        primary ={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    variant="body2"
                                    color="text.primary"
                                    textAlign={"center"}
                                >
                                    friends
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
        </>
    )
}