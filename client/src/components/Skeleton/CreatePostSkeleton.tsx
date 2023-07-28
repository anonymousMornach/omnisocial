import {Skeleton, Card, CardActionArea, CardContent} from '@mui/material';

export default function CreatePostSkeleton(){
    return(
        <>
            <Card sx={{ maxWidth: 345 }} style={{ margin: "auto" }}>
                <CardActionArea>
                    <Skeleton variant="rectangular" height={140} animation="wave" />
                    <CardContent>
                        <Skeleton variant="text" animation="wave" />
                        <Skeleton variant="text" animation="wave" />
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}