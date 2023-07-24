import React from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { red } from '@mui/material/colors';


export default function RightMain(props: any) {
    const { users, friends } = props;

    return (
        <>
            {/* Friends List */}
            <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
                <List>
                    <h1>Friends</h1>
                    {friends && friends.length > 0 ? (
                        friends.map((friend: any, index: number) => (
                            <React.Fragment key={index}>
                                <ListItem
                                    alignItems="flex-start"
                                    component="a"
                                    href="/user"
                                >
                                    <ListItemAvatar>
                                        {
                                            !friend ? (
                                                <Avatar
                                                    alt={friend ? friend.name : "user"}
                                                    src={friend ? friend.profilePic : "/static/images/avatar/1.jpg"}
                                                >
                                                </Avatar>
                                            ):(
                                                !friend.profilePic ? (
                                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                        {friend.name.charAt(0)} {/* Display the first character of the user's name */}
                                                    </Avatar>
                                                ):(
                                                    <Avatar
                                                        alt={friend ? friend.name : "user"}
                                                        src={friend ? friend.profilePic : "/static/images/avatar/1.jpg"}
                                                    />)
                                            )
                                        }
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={friend ? friend.username : "user"}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {friend ? friend.name : "username"}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </React.Fragment>
                        ))
                    ) : (
                        <ListItem>
                            <ListItemText primary="No Friends found." />
                        </ListItem>
                    )}
                </List>
            </div>

            {/* Users List */}
            <h1>Users</h1>
            <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
                <List>
                    {users && users.length > 0 ? (
                        users.map((user: any, index: number) => (
                            <React.Fragment key={index}>
                                <ListItem
                                    alignItems="flex-start"
                                    component="a"
                                    href="/user"
                                >
                                    <ListItemAvatar>
                                        {
                                            !user ? (
                                                <Avatar
                                                    alt={user ? user.name : "user"}
                                                    src={user ? user.profilePic : "/static/images/avatar/1.jpg"}
                                                >
                                                </Avatar>
                                            ):(
                                                !user.profilePic ? (
                                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                        {user.username.charAt(0)} {/* Display the first character of the user's name */}
                                                    </Avatar>
                                                ):(
                                                    <Avatar
                                                        alt={user ? user.name : "user"}
                                                        src={user ? user.profilePic : "/static/images/avatar/1.jpg"}
                                                    />)
                                            )
                                        }

                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={user ? user.username : "user"}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {user ? user.name : "username"}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </React.Fragment>
                        ))
                    ) : (
                        <ListItem>
                            <ListItemText primary="No users found." />
                        </ListItem>
                    )}
                </List>
            </div>
        </>
    );
}
