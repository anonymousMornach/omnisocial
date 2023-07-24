import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Main(props:any) {
    return (
        <Box sx={{ bgcolor: 'background.paper' }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid xs={6} md={3}>
                    <List>
                        <ListItem
                            alignItems="flex-start"
                            component={'a'}
                            href="/user"
                        >
                            <ListItemAvatar>
                                <Avatar alt={props.user ? props.user.name : "user"} src={props.user ? props.user.profilePic : "/static/images/avatar/1.jpg"} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={props.user ? props.user.name : "user"}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {props.user ? props.user.username : "username"}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem
                            alignItems="flex-start"
                            component={'a'}
                            href="/friends"
                        >
                            <ListItemAvatar>
                                <Avatar alt="Friends" src="https://img.icons8.com/?size=512&id=87201&format=png" />
                            </ListItemAvatar>
                            <ListItemText
                                 primary ={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            friends
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </List>
                </Grid>
                <Grid xs={6} md={6}>
                    <Item>xs=6 md=4</Item>
                </Grid>
                <Grid xs={6} md={3}>
                    <Item>xs=6 md=4</Item>
                </Grid>
            </Grid>
        </Box>
    );
}
