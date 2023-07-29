import { Box, Grid, IconButton, Badge, Toolbar } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';

export default function Mobile() {
    const linkStyle = {
        textDecoration: 'none', // Remove text decoration
        color: 'inherit', // Inherit color from the parent
    };

    const { data: user, error: userError, isLoading: isUserLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API}/users/user/private`,
        fetcher
    );

    if (user) {
        return (
            <Toolbar>
                <Grid container spacing={2}>
                    <Grid item>
                        <Link href={`/`} style={linkStyle}>
                            <IconButton>
                                <Badge badgeContent={100} color="secondary">
                                    <HomeIcon />
                                </Badge>
                            </IconButton>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href={`/profile/${user.username}`} style={linkStyle}>
                            <IconButton>
                                <Badge badgeContent={3} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href={`/profile/${user.username}`} style={linkStyle}>
                            <IconButton>
                                <ShoppingCartIcon />
                            </IconButton>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href={`/profile/${user.username}`} style={linkStyle}>
                            <IconButton>
                                <PersonIcon />
                            </IconButton>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href={`/profile/${user.username}`} style={linkStyle}>
                            <IconButton>
                                <SettingsIcon />
                            </IconButton>
                        </Link>
                    </Grid>
                </Grid>
            </Toolbar>
        );
    }
}
