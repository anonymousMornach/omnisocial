// pages/_app.js
import React, {useEffect, useState} from 'react';
import {
    ThemeProvider,
    CssBaseline,
    Container,
    Box,
    Grid,
    Typography,
    Paper,
} from '@mui/material';
import Navbar from '@/components/Utils/Navbar';
import {useRouter} from 'next/router';
import {authenticate} from '@/utils/auth';
import {theme} from '@/styles/theme';
import Large from '@/components/Utils/Navigate/Large';
import Mobile from '@/components/Utils/Navigate/Mobile';
import Users from '@/components/Users/Users';
import CreatePost from '@/components/Posts/CreatePost';
import Posts from '@/components/Posts/Posts';
import {styled} from '@mui/material/styles';
import {DevSupport} from "@react-buddy/ide-toolbox-next";
import {ComponentPreviews, useInitial} from "@/components/dev";

const StyledPaper = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

interface MyAppProps {
    Component: React.ComponentType<any>;
    pageProps: any; // You can replace 'any' with the specific type for pageProps if available
}

const MyApp: React.FC<MyAppProps> = ({Component, pageProps}) => {
    const router = useRouter();
    const {pathname} = router;
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        if (pathname !== '/login' && pathname !== '/register') {
            // Perform authentication here
            authenticate()
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
            <CssBaseline/>
            {pathname !== '/login' && pathname !== '/register' && <Navbar/>}
            <Box sx={{bgcolor: 'background.paper'}} style={{maxHeight: '100vh', overflowY: 'auto'}}>
                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>

                    {pathname !== '/login' && pathname !== '/register' && (
                        <>
                            {/* Left column */}
                            <Grid item xs={12} md={12} lg={3}>
                                <div style={{maxHeight: '100vh', overflowY: 'auto'}}>
                                    <StyledPaper>
                                        <Large/>
                                    </StyledPaper>
                                </div>
                            </Grid>
                            {/* Left column */}
                            <Grid sx={{display: {xs: 'block', md: 'none', margin: 'auto'}}}>
                                <div style={{overflowY: 'auto'}}>
                                    <StyledPaper>
                                        <Mobile/>
                                    </StyledPaper>
                                </div>
                            </Grid>
                        </>
                    )}

                    {/* Middle column */}
                    <Grid item xs={12} md={pathname !== '/login' && pathname !== '/register' ? 6 : 12}>
                        <div style={{maxHeight: '100vh', overflowY: 'auto'}}>
                            <StyledPaper>
                                {pathname !== '/login' && pathname !== '/register' && (
                                    <Grid sx={{display: {xs: 'none', md: 'block'}, margin: 'auto'}}>
                                        <div style={{overflowY: 'auto'}}>
                                            <StyledPaper>
                                                <Mobile/>
                                            </StyledPaper>
                                        </div>
                                    </Grid>)}

                                <DevSupport ComponentPreviews={ComponentPreviews}
                                            useInitialHook={useInitial}
                                >
                                    <Component {...pageProps} />
                                </DevSupport>
                            </StyledPaper>
                        </div>
                    </Grid>

                    {pathname !== '/login' && pathname !== '/register' && (
                        <Grid item md={3} sx={{display: {xs: 'none', md: 'block'}}}>
                            <div style={{maxHeight: '100vh', overflowY: 'auto'}}>
                                <StyledPaper>
                                    <Typography variant="h6">Friends</Typography>
                                    <Users url={'/friends/friend/private'} title={'Friends'}/>
                                </StyledPaper>
                                <StyledPaper style={{marginTop: 20}}>
                                    <Typography variant="h6">Users</Typography>
                                    <Users url={'/friends/nonfriend/private'} title={'Users'}/>
                                </StyledPaper>
                            </div>
                        </Grid>
                    )}
                </Grid>


                {/* Right column */}
            </Box>
        </ThemeProvider>
    );
};

export default MyApp;
