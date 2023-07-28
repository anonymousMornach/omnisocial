// pages/_app.js
import React, { useEffect } from 'react';
import { ThemeProvider, CssBaseline, Container, Box, Grid } from '@mui/material';
import Navbar from '@/components/Utils/Navbar';
import { useRouter } from "next/router";
import { authenticate } from "@/utils/auth";

import { theme } from '@/styles/theme';

interface MyAppProps {
    Component: React.ComponentType<any>;
    pageProps: any; // You can replace 'any' with the specific type for pageProps if available
}

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
    const router = useRouter();
    const { pathname } = router;
    const [authenticated, setAuthenticated] = React.useState(false);

    useEffect(() => {
        if (pathname !== '/login' && pathname !== '/register') {
            // Perform authentication here
            authenticate(router)
                .then(() => {
                    setAuthenticated(true); // Set authenticated to true when the authentication is successful
                })
                .catch((error) => {
                    console.error('Authentication failed:', error);
                    // Handle authentication error, redirect to login or show a message
                });
        } else {
            // No need to authenticate for login and register pages
            setAuthenticated(true);
        }
    }, [pathname]);

    if (!authenticated) {
        // Do not render anything until the authentication process is complete
        return null;
    }

    // Once the authentication is complete, render the component
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {pathname !== '/login' && pathname !== '/register' && <Navbar />}
            <Box sx={{ bgcolor: 'background.paper' }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Component {...pageProps} />
                </Grid>
            </Box>
        </ThemeProvider>
    );
}

export default MyApp;
