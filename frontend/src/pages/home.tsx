import React from 'react';
import axios from "axios";
import {useState, useEffect} from "react";
import Navbar from "../component/Navbar";
import Cookies from "universal-cookie";
import Main from "../component/Main";
const cookies = new Cookies();

export default function Home() {
    const [user, setUser] = useState<any>(null);
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
            console.log(result)
        }).catch((err)=>{
            err = new Error()
        })
    }, [])

    return (
        <>
            <Navbar user={user}/>
            <Main user={user}/>
        </>
    );
}