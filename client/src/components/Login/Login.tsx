import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import {
    Grid,
    CssBaseline,
    Paper,
    Box,
    Link,
    Typography,
    TextField,
    Button,
    FormControlLabel,
    CircularProgress,
    Checkbox,
} from "@mui/material";
import Logo from "@/components/Utils/Logo";
import SimpleModal from "@/components/Utils/SimpleModal";
import RetrieveToken from "@/components/Utils/RetrieveToken";
import Copyright from "@/components/Utils/Copyright";

export default function Login() {
    const router = useRouter();
    const cookies = new Cookies();
    const [verify, setVerify] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginFail, setLoginFail] = useState(false);
    const [user, setUser] = useState<any>({});
    const [error, setError] = useState<any>({});
    const [loading, setLoading] = useState(false);

    const handleSuccessModalOpen = () => {
        setLoginSuccess(true);
    };

    const handleSuccessModalClose = () => {
        setLoginSuccess(false);
    };

    const handleFailModalOpen = () => {
        setLoginFail(true);
    };

    const handleFailModalClose = () => {
        setLoginFail(false);
    };

    const handleVerifyOpen = () => {
        setVerify(true);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const data = new FormData(event.currentTarget);
        const email = data.get("email") as string;
        const password = data.get("password") as string;

        if (!email || !password) {
            handleFailModalOpen();
            setError({ message: "Please enter both email and password." });
            setLoading(false);
            return;
        }

        if (password.length < 8) {
            handleFailModalOpen();
            setError({ message: "Password must be at least 8 characters long." });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                handleFailModalOpen();
                setError(data);
                setLoading(false);
                return;
            }
            setUser(data.user);
            cookies.set("TOKEN", data.token, {
                path: "/",
            });
            if (!data.user.approved) {
                handleVerifyOpen();
            } else {
                handleSuccessModalOpen();
                window.setTimeout(() => {
                    router.replace("/");
                }, 500);
            }
        } catch (err: any) {
            setError(err.response?.data || { message: "An error occurred while logging in." });
            handleFailModalOpen();
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            "url(https://img.freepik.com/free-vector/app-development-concept-with-flat-deisng_23-2147852845.jpg?w=1060&t=st=1690179699~exp=1690180299~hmac=700fb1c827b5bf39ebb9bb17fc13780cdffe6efaac4ceb73e9ce84f16f2791e4)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Logo />
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <SimpleModal open={loginSuccess} close={handleSuccessModalClose} message={`Welcome ${user?.username}`} />
                        <SimpleModal open={loginFail} close={handleFailModalClose} message={error?.message || "The server has a problem"} />
                        <RetrieveToken verify={verify} user={user} handleVerifyClose={() => setVerify(false)} />

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            {loading ? (
                                <Button type="submit" disabled variant="contained" sx={{ mt: 3, mb: 2 }}>
                                    <CircularProgress size={20} color="primary" />
                                </Button>
                            ) : (
                                <>
                                    <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} style={{ margin: "auto" }}>
                                        Sign In
                                    </Button>
                                </>
                            )}
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}