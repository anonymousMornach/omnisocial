import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {red} from "@mui/material/colors";
import { TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';
import Cookies from "universal-cookie";
const cookies = new Cookies;

const settings = ['Profile', 'Settings'];

function Navbar(props:any) {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogout = ()=>{
        cookies.remove("TOKEN", { path: "/" })
        window.location.href = "/";
    }

    return (
        <AppBar position="static" sx={{
            height: 90,
            backgroundColor:'',
            padding: 1
        }}
        style={{}}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        OmniSocial
                    </Typography>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        OmniSocial
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Autocomplete
                            sx={{ width: 300,  backgroundColor:'white' }}
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            options={props.allUsers.map((option:any) => option.username)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search Omni"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        />
                    </Box>
                        <Autocomplete
                            sx={{  backgroundColor:'white', flexGrow: 1, display: { xs: 'flex', md: 'none' }}}
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            options={props.allUsers.map((option:any) => option.username)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search Omni"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        />


                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {
                                    !props.user ? (
                                        <Avatar
                                            alt={props.user ? props.user.name : "user"}
                                            src={props.user ? props.user.profilePicture : "/static/images/avatar/1.jpg"}
                                        >
                                        </Avatar>
                                    ):(
                                        !props.user.profilePicture ? (
                                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                {props.user.username.charAt(0)} {/* Display the first character of the user's name */}
                                            </Avatar>
                                        ):(
                                            <Avatar
                                                alt={props.user ? props.user.name : "user"}
                                                src={props.user ? props.user.profilePicture : "/static/images/avatar/1.jpg"}
                                            />)
                                    )
                                }
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
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography
                                        component="a"
                                        href={`/${setting.toLowerCase()}`}
                                        sx={{
                                            color: 'inherit',
                                            textDecoration: 'none',
                                        }}
                                    >
                                    {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                            <MenuItem onClick={handleLogout}>
                                <Typography
                                    sx={{
                                        color: 'inherit',
                                        textDecoration: 'none',
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
    );
}
export default Navbar;
