import React, { useState, ChangeEvent, MouseEvent } from "react";
import Card from "@mui/material/Card";
import { Button, CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CreatePostForm from "./CreatePostForm";
import CreatePostSkeleton from "@/components/Skeleton/CreatePostSkeleton";
import useSWR from "swr";
import {fetcher} from "@/utils/fetcher";



export default function CreatePost() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { data: user, error: userError, isLoading: isUserLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API}/users/user/private`,
        fetcher, { refreshInterval: 1000 }
    );


    if(userError){
        return (
            <>
                <CreatePostSkeleton/>
            </>
        )
    }


    if(isUserLoading){
        return (
            <>
                <CreatePostSkeleton/>
            </>
        )
    }
    if(user){
        return (
            <>
                <Card sx={{ maxWidth: 345 }} style={{ margin: "auto" }}>
                    <CardActionArea onClick={handleOpen}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={(user && user.profilePic) ? user.profilePic : "https://source.unsplash.com/featured"}
                            alt={user ? user.name : "user"}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Hi {user ? user.username : "user"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Gist us ☺️
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={handleOpen}>
                            Create Post
                        </Button>
                    </CardActions>
                </Card>
                <CreatePostForm handleClose={handleClose} open={open}/>
            </>
        );
    }

}
