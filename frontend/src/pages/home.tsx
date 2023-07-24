import React from 'react';
import axios from "axios";
import {useState, useEffect} from "react";
import Navbar from "../component/Navbar";
import Cookies from "universal-cookie";
import Main from "../component/Main";
const cookies = new Cookies();

export default function Home() {
    const [friends, setFriends] = useState<any>([]);
    const [posts, setPosts] = useState<any>([]);
    const [user, setUser] = useState<any>(null);
    const [users, setUsers] = useState<any>(null);
    const isAuthenticated = cookies.get("TOKEN");

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${isAuthenticated}`, // Assuming the token is a JWT, you may need to adjust the format according to your server's requirements.
            },
            method: 'GET',
            url: `${process.env.REACT_APP_API}/users/user/private`,
        }

        axios(config).then((result)=>{
            setUser(result.data);
        }).catch((err)=>{
            err = new Error()
        })
    }, [])

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${isAuthenticated}`, // Assuming the token is a JWT, you may need to adjust the format according to your server's requirements.
            },
            method: 'GET',
            url: `${process.env.REACT_APP_API}/users/`,
        }

        axios(config).then((result)=>{
            setUsers(result.data);
        }).catch((err)=>{
            err = new Error()
        })
    }, [])


    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${isAuthenticated}`, // Assuming the token is a JWT, you may need to adjust the format according to your server's requirements.
            },
            method: 'GET',
            url: `${process.env.REACT_APP_API}/friends/friend/private`,
        }

        axios(config).then((result)=>{
            setFriends(result.data);
            console.log(result.data);
        }).catch((err)=>{
            err = new Error()
        })
    }, [])


    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${isAuthenticated}`, // Assuming the token is a JWT, you may need to adjust the format according to your server's requirements.
            },
            method: 'GET',
            url: `${process.env.REACT_APP_API}/friends/friend/private`,
        }

        axios(config).then((result)=>{
            setFriends(result.data);
        }).catch((err)=>{
            err = new Error()
        })
    }, [])

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${isAuthenticated}`, // Assuming the token is a JWT, you may need to adjust the format according to your server's requirements.
            },
            method: 'GET',
            url: `${process.env.REACT_APP_API}/posts/`,
        }

        axios(config).then((result)=>{
            setPosts(result.data);
            console.log(result);
        }).catch((err)=>{
            err = new Error()
        })
    }, [])
    return (
        <>
            <Navbar user={user}/>
            <Main user={user} friends={friends} users={users} posts={posts}/>
        </>
    );
}