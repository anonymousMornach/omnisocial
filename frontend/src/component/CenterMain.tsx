import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListItemText from "@mui/material/ListItemText";
import { format } from "date-fns";
import { red } from '@mui/material/colors';
import { Pagination } from '@mui/material';
import CreatePost from './CreatePost'
import axios from "axios";
import Cookies from "universal-cookie";
import { socket } from "../socket";
import {getTimeDifference} from '../utils/date'
const cookies = new Cookies()

// Function to get a random color for a user from the list of colors
const getRandomColor = (userId: any) => {
    const colors = [red[500], "#3f51b5", "#009688", "#ff5722", "#9c27b0"];
    return colors[userId.charCodeAt(0) % colors.length];
};

// Define the prop types for the UserAvatar component
interface UserAvatarProps {
    user: {
        _id: string;
        name?: string;
        username: string;
        profilePicture?: string;
    };
}

const UserAvatar = React.memo(({ user }: UserAvatarProps) => {
    const avatarSrc = user.profilePicture || "/static/images/avatar/1.jpg";
    const userColor = getRandomColor(user._id);

    return (
        !user.profilePicture ? (
            <Avatar
                alt={user.name || "user"}
                src={avatarSrc}
                sx={{ bgcolor: userColor }}
            >
                {user.username.charAt(0)}
            </Avatar>
        ) : (
            <Avatar
                alt={user.name || "user"}
                src={avatarSrc}
            />
        )
    );
});

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }: any) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function CenterMain(props: any) {
    const [expandedMap, setExpandedMap] = useState<{ [key: string]: boolean }>({});
    const [doubleClickedPostId, setDoubleClickedPostId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastClickTime, setLastClickTime] = useState(0); // New state to store the timestamp of the last click
    const postsPerPage = 5; // You can change this to adjust the number of posts per page

    const handleExpandClick = (postId: any) => {
        setExpandedMap((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId],
        }));
    };

    async function lovePost(postId: any) {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/posts/${postId}/love`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${cookies.get("TOKEN")}`,
                    },
                }
            );
            socket.emit("love_post", response.data);
        } catch (err) {
            console.error("Error while loving the post:", err);
        }
    }

    const handleMediaDoubleClick = (postId: string) => {
        const currentTime = new Date().getTime();
        const doubleClickDuration = 400; // Define the maximum duration in milliseconds between clicks to consider them as a double click

        if (currentTime - lastClickTime < doubleClickDuration) {
            // Double click detected
            lovePost(postId);
        }

        setLastClickTime(currentTime); // Update the last click time
    };

    const { posts, user, geolocation } = props;

    // Get current posts based on pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts && posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <CreatePost user={user} geolocation={geolocation}/>
            <List>
                {currentPosts && currentPosts.length > 0 ? (
                    currentPosts.map((post: any) => (
                        <ListItem key={post._id} alignItems="flex-start">
                            <Card style={{ width: '100%' }}>
                                <CardHeader
                                    avatar={<UserAvatar user={post.user} />}
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={post.user.username}
                                    subheader={getTimeDifference(post.createdAt)}
                                />
                                {
                                    (() => {
                                        if (post.image) {
                                            return (
                                                <CardMedia
                                                    component="img"
                                                    image={post.image}
                                                    alt={post.title}
                                                    onClick={() => handleMediaDoubleClick(post._id)}
                                                    style={{
                                                        cursor: "pointer",
                                                        border: doubleClickedPostId === post._id ? "2px solid red" : "none",
                                                    }}
                                                />
                                            )
                                        }else if (post.video) {
                                            return (
                                                <CardMedia
                                                    component="video"
                                                    controls
                                                    src={post.video}
                                                    onClick={() => handleMediaDoubleClick(post._id)}
                                                    style={{
                                                        cursor: "pointer",
                                                        border: doubleClickedPostId === post._id ? "2px solid red" : "none",
                                                    }}
                                                />
                                            )}else {
                                            return (
                                                <>
                                                </>
                                            )
                                        }
                                    })()
                                }

                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {post.title}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton
                                        aria-label="add to favorites"
                                        onClick={() => lovePost(post._id)}
                                        // Check if the post is loved by the user and change the color accordingly
                                        style={{ color: post.loves && post.loves.includes(user._id) ? "red" : "inherit" }}
                                    >
                                        <FavoriteIcon />
                                        {post.loves ? post.loves.length : 0}
                                    </IconButton>

                                    <IconButton aria-label="share">
                                        <ShareIcon />
                                    </IconButton>
                                    <ExpandMore
                                        expand={expandedMap[post._id] || false}
                                        onClick={() => handleExpandClick(post._id)}
                                        aria-expanded={expandedMap[post._id] || false}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </ExpandMore>
                                </CardActions>
                                <Collapse in={expandedMap[post._id] || false} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography paragraph>
                                            {post.body}
                                        </Typography>
                                        {
                                            post.location ? (
                                                <Typography paragraph>
                                                    {post.location}
                                                </Typography>
                                            ) : (
                                                <></>
                                            )
                                        }
                                        <Typography paragraph>
                                            {format(new Date(post.createdAt), "yyyy-MM-dd HH:mm:ss")}
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>
                        <ListItemText primary="No Posts found." />
                    </ListItem>
                )}
            </List>
            {/* Pagination */}
            {posts && posts.length > 0 && (
                <Pagination
                    variant="outlined"
                    count={Math.ceil(posts.length / postsPerPage)}
                    page={currentPage}
                    onChange={(event, page) => {
                        setCurrentPage(page);
                        // Reset expanded state when changing pages
                        setExpandedMap({});
                    }}
                />
            )}
        </>
    );
}
