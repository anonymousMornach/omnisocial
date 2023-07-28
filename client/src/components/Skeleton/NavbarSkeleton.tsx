import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AdbIcon from '@mui/icons-material/Adb';

const NavbarSkeleton = () => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                height: 90,
                padding: 1,
                boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)"
            }}

        >
            <IconButton sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: '2.5rem' }}>
                <AdbIcon />
            </IconButton>
            <Skeleton
                width={120}
                height={28}
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.2rem',
                }}
            />
            <Skeleton
                width={100}
                height={28}
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.2rem',
                }}
            />
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Skeleton
                    width={300}
                    height={44}
                    sx={{
                        borderRadius: '4px',
                    }}
                />
            </Box>
            <Box
                sx={{ flexGrow: 0, ml: 2 }}
            >
                <Skeleton
                    variant="circular"
                    width={40}
                    height={40}
                />
            </Box>
        </Box>
    );
};

export default NavbarSkeleton;
