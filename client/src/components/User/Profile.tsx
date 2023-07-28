import Posts from "@/components/Posts/Posts"
import UserProfileComponent from "@/components/User/UserProfileComponent";

export default function Profile(props: any){
    const {postUrl, username} = props
    return(
        <>
            <UserProfileComponent username={username}/>
            <Posts url={postUrl}/>
        </>
    )

}