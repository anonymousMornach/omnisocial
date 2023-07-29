import { Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CreatePost from "@/components/Posts/CreatePost";
import Users from "@/components/Users/Users";
import Posts from "@/components/Posts/Posts";
import Large from "@/components/Utils/Navigate/Large"
import Mobile from "@/components/Utils/Navigate/Mobile"


export default function Home() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

    return (
        <>
            {/* Left column */}
            <Grid item xs={12} md={3}>
                <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
                    <Item>
                        <Large/>
                    </Item>
                </div>
            </Grid>
            {/* Left column */}
            <Grid item xs={12} sx={{ display: { xs: 'block', md: 'none' } }}>
                <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
                    <Item>
                        <Mobile/>
                    </Item>
                </div>
            </Grid>

            {/* Middle column */}
            <Grid item xs={12} md={6}>
                <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
                    <Item>
                        <CreatePost />
                        <Posts url={"/posts"} />
                    </Item>
                </div>
            </Grid>

            {/* Right column */}
            <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
                    <Item>
                        <Typography variant="h6">Friends</Typography>
                        <Users url={"/friends/friend/private"} title={"Friends"} />
                    </Item>
                    <Item style={{ marginTop: 20 }}>
                        <Typography variant="h6">Users</Typography>
                        <Users url={"/friends/nonfriend/private"} title={"Users"} />
                    </Item>
                </div>
            </Grid>

        </>
    );
}
