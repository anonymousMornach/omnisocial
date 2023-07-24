import React, { useState, ChangeEvent, MouseEvent } from "react";
import Card from "@mui/material/Card";
import { Button, CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import axios, { AxiosResponse } from 'axios';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const MAX_BODY_LENGTH = 1200;

interface User {
    username: string;
    name: string;
    profilePic: string;
}

interface CreatePostProps {
    user: User | null;
}

export default function CreatePost(props: CreatePostProps) {
    const { user } = props;

    const style :any = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [responseModalOpen, setResponseModalOpen] = useState(false);
    const [response, setResponse] = useState<string>('');

    const handleResponseModalClose = () => setResponseModalOpen(false);

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
    const handleBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        if (value.length <= MAX_BODY_LENGTH) {
            setBody(value);
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        setFile(selectedFile || null);
    };

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const formDataApi = {
                image: undefined as string | undefined,
                video: undefined as string | undefined,
                title: undefined as string | undefined,
                body: undefined as string | undefined
            };
            const formDataCloud = new FormData();
            formDataCloud.append('upload_preset', `${process.env.REACT_APP_API_CLOUDINARY_UPLOAD_PRESET}`); // Replace with your actual preset value
            formDataCloud.append('file', file || ''); // Replace with your actual file
            const responseCloud = await axios.post(`${process.env.REACT_APP_API_CLOUDINARY_URL}`, formDataCloud); // Replace with your actual cloudinary URL
            if (file) {
                // Check the file type here
                if (file.type.includes('image')) {
                    formDataApi.image = `${responseCloud.data.secure_url}`;
                }
                if (file.type.includes('video')) {
                    formDataApi.video = `${responseCloud.data.secure_url}`;
                }
            }
            formDataApi.title = title;
            formDataApi.body = body;
            console.log(formDataApi);

            const response: AxiosResponse = await axios.post((`${process.env.REACT_APP_API}/posts`), formDataApi, {
                headers: {
                    Authorization: `Bearer ${cookies.get("TOKEN")}`
                },
            });

            console.log(response);
            setResponse(response.status === 200 ? "Post Created Successfully" : "Server Error"); // Assuming the response contains a message from the server.
            setResponseModalOpen(true);
            window.setTimeout(() => {
                handleClose();
                handleResponseModalClose()
            }, 500);
        } catch (error) {
            // Handle error
            console.error(error);
            setResponse("An error occurred while creating the post");
            setResponseModalOpen(true);
            window.setTimeout(() => {
                handleResponseModalClose()
            }, 500);
        }
    };

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
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography variant="h6" component="h2">
                            Create Post
                        </Typography>
                        <TextField
                            label="Title"
                            value={title}
                            onChange={handleTitleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Body"
                            value={body}
                            onChange={handleBodyChange}
                            fullWidth
                            multiline
                            rows={6}
                            margin="normal"
                            variant="outlined"
                            inputProps={{ maxLength: MAX_BODY_LENGTH }}
                        />
                        <input required type="file" accept="image/*,video/*" onChange={handleFileChange} />
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Box>
                </Fade>
            </Modal>

            {/* Response Modal */}
            <Modal
                aria-labelledby="response-modal-title"
                aria-describedby="response-modal-description"
                open={responseModalOpen}
                onClose={handleResponseModalClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={responseModalOpen}>
                    <Box sx={style}>
                        <Typography variant="h6" component="h2" id="response-modal-title">
                            {response}
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
