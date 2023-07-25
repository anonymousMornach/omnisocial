import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import LeftMain from "./LeftMain";
import RightMain from "./RightMain";
import CenterMain from "./CenterMain"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Main(props: any) {
    return (
        <Box sx={{ bgcolor: 'background.paper' }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid  xs={12} md={3}>
                    <div style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                        <Item><LeftMain user={props.user} /></Item>
                    </div>
                </Grid>
                <Grid  xs={12} md={6}>
                    <div style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                        <Item><CenterMain posts={props.posts} user={props.user} /></Item>
                    </div>
                </Grid>
                <Grid  xs={12} md={3}>
                    <div style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                        <Item><RightMain friends={props.friends} users={props.users} mainuser={props.user} /></Item>
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
}
