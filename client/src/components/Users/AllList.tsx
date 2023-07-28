import React from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { List } from "@mui/material";
import Divider from "@mui/material/Divider";
import ListAvatar from "./ListAvatar";
import ListButton from "./ListButton";
import Link from 'next/link';

export default function AllList(props: any) {

    const linkStyle = {
        textDecoration: 'none', // Remove text decoration
        color: 'inherit', // Inherit color from the parent
    };
    const { users, mainuser, title, acceptfriend, sendfriend } = props;

    // Custom sorting function for users array
    const sortUsers = (users: any[]) => {
        const userReceivedRequests = users.filter(user => mainuser.friendRequestReceived.includes(user._id));
        const userSentRequests = users.filter(user => mainuser.friendRequestSent.includes(user._id));
        const otherUsers = users.filter(user => !userReceivedRequests.includes(user) && !userSentRequests.includes(user));

        return [...userReceivedRequests, ...otherUsers, ...userSentRequests];
    };

    const sortedUsers = sortUsers(users);

    return (
        <>
            <List sx={{ display: { xs: 'none', sm: 'block' } }}>
                {sortedUsers && sortedUsers.length > 0 ? (
                    sortedUsers.map((user: any, index: number) => (
                        <React.Fragment key={index}>
                            <Link href={`/profile/${user.username}`} style={linkStyle}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <ListAvatar user={user} color={"red"} />
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

                            </Link>
                                {(() => {
                                    if (mainuser.friendRequestReceived.includes(user._id)) {
                                        return (
                                            <ListButton message={"Accept Friend Request"} user={user} onClickFunction={acceptfriend} />
                                        );
                                    } else if(mainuser.friends.includes(user._id)) {
                                        return (
                                            <ListButton message={"Message"} disabled />
                                        );
                                    } else if (mainuser.friendRequestSent.includes(user._id)) {
                                        return (
                                            <ListButton message={"Friend Request sent"} disabled />
                                        );
                                    } else {
                                        return (
                                            <ListButton message={"Send Friend Request"} user={user} onClickFunction={sendfriend}/>
                                        );
                                    }
                                })()}
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    ))
                ) : (
                    <ListItem>
                        <ListItemText primary={`No ${title} found`} />
                    </ListItem>
                )}
            </List>
        </>
    );
}
