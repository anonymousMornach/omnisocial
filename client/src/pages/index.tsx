import CreatePost from "@/components/Posts/CreatePost";
import Posts from "@/components/Posts/Posts";


export default function Home() {
    return (
        <>
            <CreatePost />
            <Posts url={"/posts"} />
        </>
    );
}
