import Profile from "@/components/User/Profile"
import {useRouter} from "next/router";
export default function UserProfile(){

    const router= useRouter();
    const {slug} = router.query;
    return(
        <>
            <Profile postUrl={`/posts/${slug}`} username={`${slug}`} />
        </>
    )
}