import * as React from 'react';
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Modal } from "@mui/material";
import Cookies from "universal-cookie";
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
        const data = new FormData(event.currentTarget);
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
            handleSuccessModalOpen(); // Show the modal on successful registration
            window.setTimeout(()=>{
                window.location.href = "/"
            }, 500)

        } catch (err: any) {
            setError(err.response);
            handleFailModalOpen(); // Show the modal on failed registration
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
                        <LockOutlinedIcon />
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
                                Welcome {user.user ? user.user.username : "user"  } Registration Successful
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
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}