import React from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { List } from "@mui/material";
import Divider from "@mui/material/Divider";
import ListAvatar from "./ListAvatar";
import ListButton from "./ListButton";

export default function AllList(props: any) {
    const { users, mainuser, title, acceptfriend, sendfriend } = props;
    return (
        <List sx={{ display: { xs: 'none', sm: 'block' } }}>
            <h1>{title}</h1>
            {users && users.length > 0 ? (
                users.map((user: any, index: number) => (
                    <React.Fragment key={index}>
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
                                        {(() => {
                                            if (mainuser.friendRequestReceived.includes(user._id)) {
                                                return (
                                                    <ListButton message={"Accept Friend Request"} user={user} onClickFunction={acceptfriend} />
                                                );
                                            } else if(mainuser.friends.includes(user._id)){
                                                return (
                                                    <ListButton message={"Message"} disabled />
                                                );
                                            }else if (mainuser.friendRequestSent.includes(user._id)) {
                                                return (
                                                    <ListButton message={"Friend Request sent"} disabled />
                                                );
                                            } else {
                                                return (
                                                    <ListButton message={"Send Friend Request"} user={user} onClickFunction={sendfriend}/>
                                                );
                                            }
                                        })()}

                                    </React.Fragment>}
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))
            ) : (
                <ListItem>
                    <ListItemText primary={`No ${title} found`} />
                </ListItem>
            )}
        </List>
    );
}
