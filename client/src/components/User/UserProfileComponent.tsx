import React, { useState } from 'react';
import { Avatar, Typography, Grid, Card, CardContent, Menu, MenuItem } from '@mui/material/';
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import UserProfileSkeleton from "@/components/Skeleton/UserProfileSkeleton";
import ListAvatar from "@/components/Users/ListAvatar";

const UserProfileComponent = (props: any) => {
    const { username } = props;
    // Fetch user data
    const { data: user, error: userError, isLoading: isUserLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API}/users/${username}`,
        fetcher
    );

    const [anchorEl, setAnchorEl] = useState(null);

    const handleContactClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleContactClose = () => {
        setAnchorEl(null);
    };

    if (userError) {
        return <div>
            <UserProfileSkeleton />
        </div>;
    }

    if (isUserLoading) {
        return (
            <div>
                <UserProfileSkeleton />
            </div>
        );
    }

    if (user) {
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
                                            Contact
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
                                                {user.email}
                                            </MenuItem>
                                        </Menu>
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
