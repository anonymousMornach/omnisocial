import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress } from "@mui/material";
import React, { ChangeEvent, MouseEvent, useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { getFullCountryName } from "@/utils/parseCountry";
import { socket } from "@/utils/socket";
import { getToken } from "@/utils/token";
import Image from 'next/image';

const MAX_BODY_LENGTH = 1200;
const MAX_TITLE_LENGTH = 50;
const MAX_FILE_SIZE_MB = 15; // Maximum file size allowed in MB

interface User {
    username: string;
    name: string;
    profilePic: string;
}

interface CreatePostProps {
    handleClose: () => void;
    open: boolean;
}

export default function CreatePostForm(props: any) {
    const [geolocation, setGeolocation] = useState<any>({});
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [isImage, setIsImage] = useState(false);
    const [miniMedia, setMiniMedia] = useState<string | null>(null);
    const [responseModalOpen, setResponseModalOpen] = useState(false);
    const [response, setResponse] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const { handleClose, open } = props;

    useEffect(() => {
        async function fetchUserIpAddress() {
            try {
                const ipRes = await fetch("https://api.ipify.org?format=json");
                const data = await ipRes.json();
                const ip = data.ip;
                const response = await fetch(`https://ipinfo.io/${ip}?token=${process.env.NEXT_PUBLIC_IP_TOKEN}`);
                const resData = await response.json();
                setGeolocation(resData);
            } catch (err) {
                console.error("Error while fetching IP address:", err);
            }
        }

        fetchUserIpAddress();
    }, []);

    const style: any = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        minWidth: 300,
        bgcolor: "background.paper",
        border: "2px solid #000",
        borderRadius: "20px",
        boxShadow: 24,
        p: 4,
    };

    const handleResponseModalClose = () => setResponseModalOpen(false);

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length <= MAX_TITLE_LENGTH) {
            setTitle(value);
        }
    };

    const handleBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        if (value.length <= MAX_BODY_LENGTH) {
            setBody(value);
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        if (selectedFile) {
            const fileSizeMB = selectedFile.size / (1024 * 1024);
            if (fileSizeMB > MAX_FILE_SIZE_MB) {
                setFile(null);
                setMiniMedia(null);
                setIsImage(false);
                setResponse(`File size exceeds ${MAX_FILE_SIZE_MB}MB. Please select a smaller file.`);
                setResponseModalOpen(true);
            } else {
                setFile(selectedFile);
                if (selectedFile.type.includes("image")) {
                    setIsImage(true);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setMiniMedia(reader.result as string);
                    };
                    reader.readAsDataURL(selectedFile);
                } else if (selectedFile.type.includes("video")) {
                    setIsImage(false);
                    setMiniMedia(URL.createObjectURL(selectedFile));
                } else {
                    setIsImage(false);
                    setMiniMedia(null);
                }
            }
        } else {
            setFile(null);
            setMiniMedia(null);
            setIsImage(false);
        }
    };

    const isFileValid = (file: File | null): boolean => {
        if (!file) return false;
        const acceptedTypes = ["image/jpeg", "image/png", "video/mp4"];
        return acceptedTypes.includes(file.type);
    };

    const bodyCharacterCount = MAX_BODY_LENGTH - body.length;
    const titleCharacterCount = MAX_TITLE_LENGTH - title.length;

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!title || !body || !isFileValid(file)) {
            setResponse("Please fill in all required fields and select a valid image or video file.");
            setResponseModalOpen(true);
            return;
        }

        setLoading(true);

        try {
            const formDataApi = {
                image: undefined as string | undefined,
                video: undefined as string | undefined,
                title: undefined as string | undefined,
                body: undefined as string | undefined,
                location: undefined as string | undefined,
            };
            const formDataCloud = new FormData();
            formDataCloud.append("upload_preset", `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`);
            formDataCloud.append("file", file || "");
            const responseCloud = await axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`, formDataCloud);
            if (file) {
                if (file.type.includes("image")) {
                    formDataApi.image = `${responseCloud.data.secure_url}`;
                }
                if (file.type.includes("video")) {
                    formDataApi.video = `${responseCloud.data.secure_url}`;
                }
            }
            formDataApi.location = `${geolocation.city}, ${getFullCountryName(geolocation.country)}`;
            formDataApi.title = title;
            formDataApi.body = body;
            const token = await getToken();
            const response: AxiosResponse = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/posts`,
                formDataApi,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            socket.emit("new_post", response.data);
            setResponse(response.status === 200 ? "Post Created Successfully" : "Server Error");
            setResponseModalOpen(true);
            window.setTimeout(() => {
                handleClose();
                handleResponseModalClose();
            }, 500);
        } catch (error) {
            console.error(error);
            setResponse("An error occurred while creating the post");
            setResponseModalOpen(true);
            window.setTimeout(() => {
                handleResponseModalClose();
            }, 500);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
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
                            inputProps={{ maxLength: MAX_TITLE_LENGTH }}
                            required
                        />
                        <Typography variant="body2" color="text.secondary">
                            Characters left: {titleCharacterCount}
                        </Typography>
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
                            required
                        />
                        <Typography variant="body2" color="text.secondary">
                            Characters left: {bodyCharacterCount}
                        </Typography>
                        <input
                            required
                            type="file"
                            accept="image/jpeg, image/png, video/mp4"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                            id="file-input"
                        />
                        <label htmlFor="file-input">
                            <Button
                                variant="contained"
                                component="span"
                                color="primary"
                                sx={{
                                    mt: 2,
                                    py: 1,
                                    px: 2,
                                    fontWeight: "bold",
                                    fontSize: "1rem",
                                    borderRadius: "20px",
                                    cursor: "pointer",
                                    textTransform: "none",
                                }}
                            >
                                Select File
                            </Button>
                        </label>
                        {miniMedia && (
                            <>
                                {isImage ? (
                                    <img
                                        src={miniMedia}
                                        alt="Mini version of selected media"
                                        style={{
                                            display: "block",
                                            maxWidth: "100%",
                                            maxHeight: "200px",
                                            margin: "10px auto",
                                        }}
                                    />
                                ) : (
                                    <video
                                        width="320"
                                        height="240"
                                        controls
                                        style={{
                                            display: "block",
                                            maxWidth: "100%",
                                            maxHeight: "200px",
                                            margin: "10px auto",
                                        }}
                                    >
                                        <source src={miniMedia} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            disabled={loading}
                            sx={{
                                width: "90%",
                                display: { xs: "block" },
                                margin: "auto",
                                marginTop: 2,
                            }}
                        >
                            {loading ? <CircularProgress size={20} color="primary" /> : "Submit"}
                        </Button>
                    </Box>
                </Fade>
            </Modal>
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
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Fade in={responseModalOpen}>
                    <Box
                        sx={{
                            backgroundColor: "#fff",
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 4,
                            minWidth: 300,
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="h6" component="h2" id="response-modal-title">
                            {response}
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
