import {List, ListItem, ListItemText, Avatar, Badge} from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListAvatar from "@/components/Users/ListAvatar";
import React from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import useSWR from "swr";
import {fetcher} from "@/utils/fetcher";
import SkeletonUser from "@/components/Skeleton/SkeletonUser"
import Diversity1Icon from '@mui/icons-material/Diversity1';
import Groups2Icon from '@mui/icons-material/Groups2';
import ChatIcon from '@mui/icons-material/Chat';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ForumIcon from '@mui/icons-material/Forum';

export default function Large() {
    const linkStyle = {
        textDecoration: 'none', // Remove text decoration
        color: 'inherit', // Inherit color from the parent
    };
    const {data: user, error: userError, isLoading: isUserLoading} = useSWR(
        `${process.env.NEXT_PUBLIC_API}/users/user/private`,
        fetcher, {refreshInterval: 1000}
    );
    if (isUserLoading) {
        return (
            <>
                <SkeletonUser number={6}/>
            </>
        )
    }
    if (user) {
        return(
            <>
                <List sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Link href={`/profile/${user.username}`} style={linkStyle}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <ListAvatar user={user} color={"red"} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.username}
                            />
                        </ListItem>
                    </Link>
                    <Link href={`profile/${user.username}`} style={linkStyle}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Badge badgeContent={user.friendRequestReceived.length} color="error">
                                    <Diversity1Icon/>
                                </Badge>
                            </ListItemAvatar>
                            <ListItemText
                                primary={"Friends"}
                            />
                        </ListItem>
                    </Link>
                    <Link href={`/profile/${user.username}`} style={linkStyle}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Groups2Icon/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={"Groups"}
                            />
                        </ListItem>
                    </Link>
                    <Link href={`/profile/${user.username}`} style={linkStyle}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <ChatIcon/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={"Chats"}
                            />
                        </ListItem>
                    </Link>
                    <Link href={`/profile/${user.username}`} style={linkStyle}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <DynamicFeedIcon/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={"Feed"}
                            />
                        </ListItem>
                    </Link>
                    <Link href={`/profile/${user.username}`} style={linkStyle}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <ForumIcon/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={"Threads"}
                            />
                        </ListItem>
                    </Link>
                </List>
            </>
        )

    }
}