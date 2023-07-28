import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

export default function SkeletonUser(props:any) {
    const { number } = props;

    const renderUsers = () => {
        const users = [];
        for (let i = 0; i < number; i++) {
            users.push(
                <Card key={i} sx={{ width: '100%', marginBottom: 2 }}>
                    <CardHeader
                        avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
                        action={null}
                        title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
                        subheader={<Skeleton animation="wave" height={10} width="40%" />}
                    />
                </Card>
            );
        }
        return users;
    };

    return <React.Fragment>{renderUsers()}</React.Fragment>;
}
