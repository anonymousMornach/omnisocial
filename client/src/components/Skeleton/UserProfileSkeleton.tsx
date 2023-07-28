import { Avatar, Typography, Grid, Card, CardContent, Menu, MenuItem, CircularProgress } from '@mui/material/';
import Skeleton from "@mui/material/Skeleton";

export default function UserProfileSkeleton(){
    return(
        <>
            <div>
                <Grid container sx={{ justifyContent: "center", alignItems: "center", spacing: 3 }}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Grid container sx={{ justify: "center", alignItems: "center", spacing: 2 }}>
                                    <Grid item>
                                        <Skeleton variant="circular" width={64} height={64} />
                                    </Grid>
                                    <Grid item>
                                        <Skeleton variant="text" width={200} height={32} />
                                        <Skeleton variant="text" width={150} height={24} />
                                        <Skeleton variant="text" width={300} height={20} />
                                    </Grid>
                                    <Grid item>
                                        <Skeleton variant="text" width={100} height={24}  />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}