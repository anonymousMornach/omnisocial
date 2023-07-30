import React, { useState } from 'react';
import { Avatar, Typography, Grid, Card, CardContent, Menu, MenuItem } from '@mui/material/';
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import UserProfileSkeleton from "@/components/Skeleton/UserProfileSkeleton";
import ListAvatar from "@/components/Users/ListAvatar";
import SettingsIcon from '@mui/icons-material/Settings';
import {useRouter} from "next/router";
import ListButton from "@/components/Users/ListButton";
import {Button} from "@mui/material";

const UserProfileComponent = (props: any) => {
    const router = useRouter()
    const { username } = props;
    // Fetch user data
    const { data: user, error: userError, isLoading: isUserLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API}/users/${username}`,
        fetcher, { refreshInterval: 1000 }
    );
    const { data: specificUser, error: specificUserError, isLoading: isSpecificUserLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API}/users/user/private`,
        fetcher, { refreshInterval: 1000 }
    );

    const [anchorEl, setAnchorEl] = useState(null);

    const handleContactClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleContactClose = () => {
        setAnchorEl(null);
    };
    const goToSettings = ()=>{
        router.push("/settings")
    }

    if (userError || specificUserError) {
        return <div>
            <UserProfileSkeleton />
        </div>;
    }

    if (isUserLoading || isSpecificUserLoading) {
        return (
            <div>
                <UserProfileSkeleton />
            </div>
        );
    }

    if (user && specificUser) {
        return (
            <div>
                <Grid container sx={{ justifyContent: "center", alignItems: "center", spacing: 3 }}>
                    <Grid item xs={12} sm={8} md={6}>
                        <Card sx={{ boxShadow: 3 }}>
                            <CardContent>
                                <Grid container alignItems="center" spacing={2}>
                                    <Grid item>
                                        <ListAvatar user={user} size={64} />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h5" component="h1">
                                            {user.name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            {user.username}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            {user.bio ? user.bio : "No bio available."}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant="body1"
                                            color="primary"
                                            sx={{ cursor: 'pointer' }}
                                            onClick={handleContactClick}
                                        >
                                            Other details
                                        </Typography>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleContactClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <MenuItem onClick={handleContactClose}>
                                                Email: {user.email ? user.email : "N/A"}
                                            </MenuItem>
                                            <MenuItem onClick={handleContactClose}>
                                                Age: {user.age ? user.age : "N/A"}
                                            </MenuItem>
                                            <MenuItem onClick={handleContactClose}>
                                                Marital Status: {user.maritalStatus ? user.maritalStatus : "N/A"}
                                            </MenuItem>
                                        </Menu>

                                        {
                                            (user._id === specificUser._id) ?
                                                (
                                                    <>
                                                        <SettingsIcon onClick={goToSettings} sx={{marginTop:2}}/>
                                                    </>
                                                ) :
                                                (
                                                    <>
                                                    </>
                                                )
                                        }
                                        {specificUser.friends.includes(user._id) ? (
                                            <>
                                                <Button>Message</Button>
                                            </>
                                        ) : specificUser.friendRequestSent.includes(user._id) ? (
                                            <>
                                                <Button>Remove</Button>
                                            </>
                                        ) : specificUser.friendRequestReceived.includes(user._id) ? (
                                            <>
                                                <Button>Accept</Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button>Send</Button>
                                            </>
                                        )}

                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
};

export default UserProfileComponent;
