import React, { useState, useEffect } from 'react';
import { Box, Grid, Avatar, FormControl, TextField, InputLabel, Select, MenuItem, Button, CircularProgress, Skeleton } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
export default function SettingsSkeleton(){
    return(
        <Box py={4} px={2}>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={4}>
                    <Skeleton variant="circular" width={150} height={150} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Skeleton variant="text" width={200} />
                    <Skeleton variant="text" width={200} />
                    <Skeleton variant="text" width={200} />
                    <Skeleton variant="text" width={200} />
                    <Skeleton variant="rectangular" width={200} height={40} />
                </Grid>
            </Grid>
        </Box>
    )
}