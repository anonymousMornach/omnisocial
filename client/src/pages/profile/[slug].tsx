import Profile from "@/components/User/Profile"
import {useRouter} from "next/router";
import {Grid, Paper, Typography} from "@mui/material";
import Users from "@/components/Users/Users";
import {authenticate} from "@/utils/auth";
import {getToken} from "@/utils/token";
import CreatePost from "@/components/LoginPage/CreatePost";
import Posts from "@/components/LoginPage/Posts";
import {styled} from "@mui/material/styles";
export default function UserProfile(){

    const router= useRouter();
    const {slug} = router.query;
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));
    return(
        <>
            <Grid item xs={12} md={3}>
                <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
                    <Item>
                        <Typography variant="h6">Hello</Typography>
                    </Item>
                </div>
            </Grid>
            {/* Middle column */}
            <Grid item xs={12} md={6}>
                <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
                    <Item>
                        <Profile postUrl={`/posts/${slug}`} username={`${slug}`} />
                    </Item>
                </div>
            </Grid>

            {/* Right column */}
            <Grid item xs={12} md={3}>
                <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
                    <Item>
                        <Typography variant="h6">Friends</Typography>
                        <Users url={"/friends/friend/private"} title={"Friends"}/>
                    </Item>
                    <Item style={{ marginTop: 20 }}>
                        <Typography variant="h6">Users</Typography>
                        <Users url={"/friends/nonfriend/private"} title={"Users"}/>
                    </Item>
                </div>
            </Grid>
        </>
    )
}