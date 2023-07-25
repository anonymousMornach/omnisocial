import * as React from 'react';
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AdbIcon from '@mui/icons-material/Adb';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import {CircularProgress, Modal } from "@mui/material";
import Cookies from "universal-cookie";
import { socket } from "../socket";
const cookies = new Cookies();

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://techmornach.vercel.app/">
                Techmornach
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Register() {
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [registerFail, setRegisterFail] = useState(false);
    const [user, setUser] = useState<any>({});
    const [error, setError] = useState<any>({});
    const [loading, setLoading] = useState(false); // New state for loading

    const handleSuccessModalOpen = () => {
        setRegisterSuccess(true);
    };

    const handleSuccessModalClose = () => {
        setRegisterSuccess(false);
    };

    const handleFailModalOpen = () => {
        setRegisterFail(true);
    };

    const handleFailModalClose = () => {
        setRegisterFail(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true); // Start loading animation when form is submitted

        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const username = data.get('username') as string;
        const firstName = data.get('firstName') as string;
        const lastName = data.get('lastName') as string;

        if (!email || !password || !username || !firstName || !lastName) {
            // If any of the required fields are missing, show an error message
            handleFailModalOpen();
            setError({ data: { error: 'Please fill in all required fields.' } });
            setLoading(false); // Stop loading animation
            return;
        }

        if (username.length < 6) {
            // If username is less than 6 characters, show an error message
            handleFailModalOpen();
            setError({ data: { error: 'Username must be at least 6 characters long.' } });
            setLoading(false); // Stop loading animation
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            // If email is not valid, show an error message
            handleFailModalOpen();
            setError({ data: { error: 'Please enter a valid email address.' } });
            setLoading(false); // Stop loading animation
            return;
        }
        if (password.length < 8) {
            // If password is less than 8 characters, show an error message
            handleFailModalOpen();
            setError({ data: { error: 'Password must be at least 8 characters long.' } });
            setLoading(false); // Stop loading animation
            return;
        }

        if (firstName.length < 3 || lastName.length < 3) {
            // If first name or last name is less than 3 characters, show an error message
            handleFailModalOpen();
            setError({ data: { error: 'First name and last name must be at least 3 characters long.' } });
            setLoading(false); // Stop loading animation
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/auth/register`, {
                email: data.get('email'),
                password: data.get('password'),
                username: data.get('username'),
                name: `${data.get('firstName')} ${data.get('lastName')}`
            });
            cookies.set("TOKEN", response.data.token, {
                path: "/",
            })
            setUser(response.data);
            console.log(response.data)
            socket.emit("new_user", response.data.newUser);
            handleSuccessModalOpen(); // Show the modal on successful registration
            window.setTimeout(()=>{
                window.location.href = "/"
            }, 500)

        } catch (err: any) {
            setError(err.response);
            handleFailModalOpen(); // Show the modal on failed registration
        } finally {
            setLoading(false); // Stop loading animation when API call is complete (success or fail)
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AdbIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Modal
                        open={registerSuccess}
                        onClose={handleSuccessModalClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Box  sx={{
                            backgroundColor: '#fff',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 4,
                            minWidth: 300,
                            textAlign: 'center',
                        }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Welcome {user.newUser ? user.newUser.username : "user"  } Registration Successful
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Redirecting to homepage
                            </Typography>
                        </Box>
                    </Modal>
                    <Modal
                        open={registerFail}
                        onClose={handleFailModalClose}
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
                                Registration failed
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {error.data ? error.data.error : "The server has a problem" }
                            </Typography>
                        </Box>
                    </Modal>
                    {loading ? (
                        <CircularProgress size={48} color="primary" />
                    ) : (
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}
