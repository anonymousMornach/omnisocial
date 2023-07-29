import { List, ListItem, ListItemText, ListItemIcon ,Avatar } from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListAvatar from "@/components/Users/ListAvatar";
import React from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import useSWR from "swr";
import {fetcher} from "@/utils/fetcher";
import SkeletonUser from "@/components/Skeleton/SkeletonUser"

export default function Large() {
    const linkStyle = {
        textDecoration: 'none', // Remove text decoration
        color: 'inherit', // Inherit color from the parent
    };
    const {data: user, error: userError, isLoading: isUserLoading} = useSWR(
        `${process.env.NEXT_PUBLIC_API}/users/user/private`,
        fetcher
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
                                <Avatar/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={"Friends"}
                            />
                        </ListItem>
                    </Link>
                    <Link href={`/profile/${user.username}`} style={linkStyle}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={"Groups"}
                            />
                        </ListItem>
                    </Link>
                    <Link href={`/profile/${user.username}`} style={linkStyle}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={"Chats"}
                            />
                        </ListItem>
                    </Link>
                    <Link href={`/profile/${user.username}`} style={linkStyle}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={"Feed"}
                            />
                        </ListItem>
                    </Link>
                    <Link href={`/profile/${user.username}`} style={linkStyle}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar/>
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