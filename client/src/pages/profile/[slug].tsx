import Profile from "@/components/User/Profile"
import {useRouter} from "next/router";
import {Grid} from "@mui/material";
import Users from "@/components/Users/Users";
import {authenticate} from "@/utils/auth";
import {getToken} from "@/utils/token";
export default function UserProfile(){

    const router= useRouter();
    const {slug} = router.query;
    return(
        <>
            <Grid  item xs={12} md={3}>
                <div style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                    Hello
                </div>
            </Grid>
            <Grid  item xs={12} md={6}>
                <div style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                    <Profile postUrl={`/posts/${slug}`} username={`${slug}`}/>
                </div>
            </Grid>
            <Grid item xs={12} md={3}>
                <div style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                        <>
                            <Users url={"/friends/friend/private"} title={"Friends"}/>
                            <Users url={"/friends/nonfriend/private"} title={"Users"}/>
                        </>
                </div>
            </Grid>
        </>
    )
}