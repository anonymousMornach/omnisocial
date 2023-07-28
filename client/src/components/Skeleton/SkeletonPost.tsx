import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

export default function SkeletonPost(props:any) {
    const { number } = props;

    const renderSkeletons = () => {
        const skeletons = [];
        for (let i = 0; i < number; i++) {
            skeletons.push(
                <Card key={i} sx={{ width: '100%', marginBottom: 10 }}>
                    <CardHeader
                        avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
                        action={null}
                        title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
                        subheader={<Skeleton animation="wave" height={10} width="40%" />}
                    />
                    <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                    <CardContent>
                        <React.Fragment>
                            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                            <Skeleton animation="wave" height={10} width="80%" />
                        </React.Fragment>
                    </CardContent>
                </Card>
            );
        }
        return skeletons;
    };

    return <React.Fragment>{renderSkeletons()}</React.Fragment>;
}
