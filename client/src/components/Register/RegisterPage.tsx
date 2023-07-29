import SimpleModal from "@/components/Utils/SimpleModal";
import { Container, CssBaseline, Grid, Box, Link, Typography, TextField, Button, CircularProgress } from "@mui/material";
import Logo from "@/components/Utils/Logo";
import Copyright from "@/components/Utils/Copyright";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import RetrieveToken from "@/components/Utils/RetrieveToken";
import Cookies from "universal-cookie";

export default function Register() {
    const [verify, setVerify] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [registerFail, setRegisterFail] = useState(false);
    const [user, setUser] = useState<any>({});
    const [error, setError] = useState<any>({});
    const [loading, setLoading] = useState(false); // New state for loading

    const router = useRouter();
    const cookies = new Cookies();

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

    const handleVerifyOpen = () => {
        setVerify(true);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true); // Start loading animation when form is submitted

        const data = new FormData(event.currentTarget);
        let email = (data.get('email')) as string;
        const password = data.get('password') as string;
        const username = data.get('username') as string;
        const firstName = data.get('firstName') as string;
        const lastName = data.get('lastName') as string;

        setError({}); // Reset any previous error messages

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
            const name = `${firstName} ${lastName}`
            const response = await fetch('api/auth/register', {
                method: "POST",
                body: JSON.stringify({ email, password, username, name }),
            });
            const data = await response.json();
            if (!response.ok) {
                handleFailModalOpen();
                setError(data);
                setLoading(false);
                return;
            }
            setUser(data.newUser);
            cookies.set("TOKEN", data.token, {
                path: "/",
            });
            console.log(user);
            if (!user.approved) {
                handleSuccessModalOpen(); // Show the modal on successful registration
                window.setTimeout(() => {
                    handleSuccessModalClose();
                    handleVerifyOpen();
                }, 800);
            } else {
                handleSuccessModalOpen(); // Show the modal on successful registration
                window.setTimeout(() => {
                    router.push("/login");
                }, 800);
            }

        } catch (err: any) {
            console.log(err);
            setError({ data: { error: "An error occurred. Please try again later." } });
            handleFailModalOpen(); // Show the modal on failed registration
        } finally {
            setLoading(false); // Stop loading animation when API call is complete (success or fail)
        }
    };

    return (
        <>
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
                    <Logo />
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    {error && error.data && error.data.error && (
                        <Typography variant="body2" color="error">
                            {error.data.error}
                        </Typography>
                    )}
                    <SimpleModal open={registerSuccess} close={handleSuccessModalClose} message={`Welcome ${user ? user.username : "user"}`} />
                    <SimpleModal open={registerFail} close={handleFailModalClose} message={error.error ? error.error : error.data ? error.data.error : "The server has a problem"} />
                    <RetrieveToken user={user} verify={verify} handleVerifyClose={() => setVerify(false)} />
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
                                    inputProps={{
                                        minLength: 6,
                                        title: "Username must be at least 6 characters long.",
                                    }}
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
                                    inputProps={{
                                        pattern: "^[^\s@]+@[^\s@]+\.[^\s@]+$",
                                        title: "Please enter a valid email address.",
                                        "aria-describedby": "email-error",
                                    }}
                                />
                                {error?.data?.error === 'Please enter a valid email address.' && (
                                    <Typography variant="body2" color="error" id="email-error">
                                        {error.data.error}
                                    </Typography>
                                )}
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
                                    inputProps={{
                                        minLength: 8,
                                        title: "Password must be at least 8 characters long.",
                                        "aria-describedby": "password-error",
                                    }}
                                />
                                {error?.data?.error === 'Password must be at least 8 characters long.' && (
                                    <Typography variant="body2" color="error" id="password-error">
                                        {error.data.error}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={20} color="primary" /> : "Sign Up"}
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
        </>
    )
}
