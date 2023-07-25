import React, {useState} from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { red } from '@mui/material/colors';
import {Button, Modal} from '@mui/material';
import axios from 'axios';
import Cookies from "universal-cookie";
import Box from "@mui/material/Box";
const cookies = new Cookies();

export default function RightMain(props: any) {
    const { users, friends } = props;
    const [error, setError] = useState<any>({});
    const [sucessRequest, setSuccessRequest] = useState(false)
    const [failureRequest, setFailureRequest] = useState(false)
    function handleSuccessClose(){
        setSuccessRequest(false)
    }
    function handleFailureClose() {
        setFailureRequest(false);
    }



    const sendFriendRequest = async (username: any) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/friends/${username}/request`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${cookies.get("TOKEN")}`
                    }
                }
            );

            // You can do something with the response if needed
            setSuccessRequest(true)
            window.setTimeout(handleSuccessClose, 1000)
        } catch (err:any) {
            setFailureRequest(true)
            setError(err.response)
            window.setTimeout(handleFailureClose, 1000)
        }
    };

    return (
        <>
            {/* Friends List */}
            <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
                <List sx={{ display: { xs: 'none', sm: 'block' } }}>
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
                                        {!friend ? (
                                            <Avatar
                                                alt={friend ? friend.name : "user"}
                                                src={friend ? friend.profilePicture : "/static/images/avatar/1.jpg"}
                                            />
                                        ) : (
                                            !friend.profilePicture ? (
                                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                    {friend.name.charAt(0)}
                                                </Avatar>
                                            ) : (
                                                <Avatar
                                                    alt={friend ? friend.name : "user"}
                                                    src={friend ? friend.profilePicture : "/static/images/avatar/1.jpg"}
                                                />
                                            )
                                        )}
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
            <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
                <List sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <h1>Users</h1>
                    {users && users.length > 0 ? (
                        users.map((user: any, index: number) => (
                            <React.Fragment key={index}>
                                <ListItem
                                    alignItems="flex-start"
                                >
                                    <ListItemAvatar>
                                        {!user ? (
                                            <Avatar
                                                alt={user ? user.name : "user"}
                                                src={user ? user.profilePicture : "/static/images/avatar/1.jpg"}
                                            />
                                        ) : (
                                            !user.profilePicture ? (
                                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                    {user.username.charAt(0)}
                                                </Avatar>
                                            ) : (
                                                <Avatar
                                                    alt={user ? user.name : "user"}
                                                    src={user ? user.profilePicture : "/static/images/avatar/1.jpg"}
                                                />
                                            )
                                        )}
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
                                                <Button
                                                    sx={{ display: 'inline', marginLeft: '4', marginBottom: '4' }}
                                                    onClick={() => sendFriendRequest(user.username)}
                                                >
                                                    Add Friend
                                                </Button>
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
                <Modal
                    open={sucessRequest}
                    onClose={handleSuccessClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box sx={{
                        backgroundColor: '#fff',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 4,
                        minWidth: 300,
                        textAlign: 'center',
                    }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Friend Request Sent
                        </Typography>
                    </Box>
                </Modal>
                <Modal
                    open={failureRequest}
                    onClose={handleFailureClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box sx={{
                        backgroundColor: '#fff',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 4,
                        minWidth: 300,
                        textAlign: 'center',
                    }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {error.data ? error.data.message : "The server has a problem" }
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </>
    );
}
