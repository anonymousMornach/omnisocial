import React from 'react';
import {useState, useEffect} from "react";
import Navbar from "../component/Navbar";
import Main from "../component/Main";
import ApiEffects from "../Hooks/ApiEffects";
export default function Home() {
    const [friends, setFriends] = useState<any>([]);
    const [posts, setPosts] = useState<any>([]);
    const [user, setUser] = useState<any>(null);
    const [users, setUsers] = useState<any>([]);
    const [allUsers, setAllUsers] = useState<any>([]);
    const [geolocation, setGeolocation] = useState(null);

    return (
        <>
            <ApiEffects setUser={setUser} setFriends={setFriends} setAllUsers={setAllUsers} setPosts={setPosts} setUsers={setUsers} posts={posts} users={users} allUsers={allUsers} user={user} setGeolocation={setGeolocation}/>
            <Navbar user={user}  allUsers={allUsers}/>
            <Main user={user} friends={friends} users={users} posts={posts} geolocation={geolocation}/>
        </>
    );
}