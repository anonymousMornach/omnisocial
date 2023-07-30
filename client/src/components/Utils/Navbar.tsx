import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SearchIcon from "@mui/icons-material/Search"
import NavbarSkeleton  from "@/components/Skeleton/NavbarSkeleton";
import { TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';
import {getToken} from "@/utils/token";
import {deleteToken} from "@/utils/token";
import axios from "axios";
import useSWR from "swr";
import ListAvatar from "@/components/Users/ListAvatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import {useRouter} from "next/router";

function Navbar(props:any) {
    const router = useRouter();

    const linkStyle = {
        textDecoration: 'none', // Remove text decoration
        color: 'inherit', // Inherit color from the parent
    };
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogout = ()=>{
        deleteToken()
        router.push(`/login`)
    }
    const goToProfile = (user:any)=>{
        router.push(`/profile/${user}`)
    }

    const goToHome = ()=>{
        router.push(`/`)
    }


    async function fetcher(url:any) {
        const token = await getToken();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: 'GET',
            url,
        };

        try {
            const result = await axios(config);
            return result.data;
        } catch (error:any) {
            console.log(error)
            throw new Error(error.response?.data || 'An error occurred while fetching the data.');
        }
    }

    // Fetch AllUsers data
    const { data: allUsers, error: allUsersError, isLoading: isAllUsersLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API}/users/`,
        fetcher
    );

    //Fetch User data

    const { data: user, error: userError, isLoading: isUserLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API}/users/user/private`,
        fetcher
    );
    if(allUsersError || userError){
        return (
            <>
                <NavbarSkeleton/>
            </>
        )
    }

    if(isAllUsersLoading || isUserLoading)
    {
        return (
            <>
                <NavbarSkeleton/>
            </>
        )
    }

    if (user){
        return (
            <AppBar position="static" sx={{
                height: 50,
                backgroundColor: '#fff', // Set your desired background color
                padding: 1,
                boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
                marginBottom: 1
            }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon onClick={goToHome} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color:"primary.main" }}/>
                        <Typography
                            variant="h6"
                            noWrap
                            onClick={goToHome}
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.2rem', // Slightly reduced letter spacing
                                color: 'primary.main', // Set your desired text color
                                textDecoration: 'none',
                            }}
                        >
                            OmniSocial
                        </Typography>
                        <AdbIcon onClick={goToHome} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, fontSize: '2.5rem' , color:"primary.main" }} />
                        <Typography
                            variant="h6"
                            noWrap
                            onClick={goToHome}
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.2rem', // Slightly reduced letter spacing
                                color: 'primary.main', // Set your desired text color
                                textDecoration: 'none',
                            }}
                        >
                            OmniSocial
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Autocomplete
                                sx={{ width: 400, backgroundColor: 'white', borderRadius: '4px' }} // Add some border-radius
                                freeSolo
                                id="free-solo-2-demo"
                                disableClearable
                                options={allUsers}
                                getOptionLabel={(user:any) => user.username}
                                renderOption={(props, option) => (
                                    <React.Fragment key={option._id}>
                                        <Link href={`/profile/${option.username}`} style={linkStyle}>
                                            <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <ListAvatar user={option}/>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={option ? option.username : "user"}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {option ? option.name : "username"}
                                                            </Typography>
                                                        </React.Fragment>
                                                    }
                                                />
                                            </ListItem>
                                        </Link>
                                        <Divider variant="inset" component="li" />
                                    </React.Fragment>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search Omni"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                            startAdornment: (
                                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1 }}>
                                                    <SearchIcon color="disabled" /> {/* Add a search icon */}
                                                </Box>
                                            ),
                                        }}
                                    />
                                )}

                            />
                        </Box>
                        <Autocomplete
                            sx={{ backgroundColor: 'white', flexGrow: 1, display: { xs: 'flex', md: 'none' }, borderRadius: '4px', marginRight: 3 }} // Add some border-radius
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            options={allUsers}
                            getOptionLabel={(user:any) => user.username}
                            renderOption={(props, option) => (
                                <React.Fragment key={option._id}>
                                    <Link href={`/profile/${option.username}`} style={linkStyle}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <ListAvatar user={option}/>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={option ? option.username : "user"}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            {option ? option.name : "username"}
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                    </Link>
                                    <Divider variant="inset" component="li" />
                                </React.Fragment>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search Omni"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                        startAdornment: (
                                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1 }}>
                                                <SearchIcon color="disabled" /> {/* Add a search icon */}
                                            </Box>
                                        ),
                                    }}
                                />
                            )}
                        />

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <ListAvatar user={user}/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={() => {goToProfile(user.username)}}>
                                    <Typography
                                        sx={{
                                            color: 'text.primary', // Set your desired text color
                                            textDecoration: 'none',
                                            textTransform: 'capitalize', // Capitalize the settings items
                                        }}
                                    >
                                        Profile
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={()=>{router.push("/settings")}}>
                                    <Typography
                                        sx={{
                                            color: 'text.primary', // Set your desired text color
                                            textDecoration: 'none',
                                            textTransform: 'capitalize', // Capitalize the "Logout" item
                                        }}
                                    >
                                        Settings
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <Typography
                                        sx={{
                                            color: 'text.primary', // Set your desired text color
                                            textDecoration: 'none',
                                            textTransform: 'capitalize', // Capitalize the "Logout" item
                                        }}
                                    >
                                        Logout
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        )
    }
}
export default Navbar;
