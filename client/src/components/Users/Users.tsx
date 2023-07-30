import React, {useState} from 'react';
import axios from "axios";
import SimpleModal from "@/components/Utils/SimpleModal";
import AllList from "./AllList";
import Cookies from "universal-cookie";
import {socket} from "@/utils/socket";
import useSWR from "swr";
import {fetcher} from "@/utils/fetcher";
import SkeletonUser from "@/components/Skeleton/SkeletonUser";


const cookies = new Cookies();

export default function Users(props:any){
    const { title, url } = props;


    // Fetch users data
    const { data: users, error: usersError, isLoading: isUsersLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API}${url}`,
        fetcher, { refreshInterval: 1000 }
    );

    // Fetch user data
    const { data: mainuser, error: userError, isLoading: isUserLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API}/users/user/private`,
        fetcher, { refreshInterval: 1000 }
    );


    const [error, setError] = useState<any>({});
    const [sucessRequest, setSuccessRequest] = useState(false)
    const [failureRequest, setFailureRequest] = useState(false)
    const [sucessAdd, setSuccessAdd] = useState(false)
    const [failureAdd, setFailureAdd] = useState(false)
    function handleSuccessClose(){
        setSuccessRequest(false)
    }
    function handleFailureClose() {
        setFailureRequest(false);
    }


    function handleSuccessAddClose(){
        setSuccessAdd(false)
    }
    function handleFailureAddClose() {
        setFailureAdd(false);
    }
    const sendFriendRequest = async (username: any) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/friends/${username}/request`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${cookies.get("TOKEN")}`
                    }
                }
            );

            // You can do something with the response if needed
            socket.emit('send_friend', response.data)

            setSuccessRequest(true)
            window.setTimeout(handleSuccessClose, 1000)
        } catch (err:any) {
            setFailureRequest(true)
            setError(err.response)
            window.setTimeout(handleFailureClose, 1000)
        }
    };

    const acceptFriendRequest = async (username: any) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/friends/${username}/add`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${cookies.get("TOKEN")}`
                    }
                }
            );

            // You can do something with the response if needed
            setSuccessAdd(true)
            window.setTimeout(handleSuccessAddClose, 1000)
        } catch (err:any) {
            setFailureAdd(true)
            setError(err.response)
            window.setTimeout(handleFailureAddClose, 1000)
        }
    };

    if(usersError || usersError){
        return (
            <SkeletonUser number={20}/>
        )
    }

    if(isUserLoading || isUsersLoading){
        return (
            <SkeletonUser number={20}/>
        )
    }

    if(users && mainuser){
        return(
            <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
                <AllList users={users} mainuser={mainuser} title={title} acceptfriend={acceptFriendRequest} sendfriend={sendFriendRequest}/>
                <SimpleModal open={sucessRequest} close={handleSuccessClose} message="Friend Request Sent"/>
                <SimpleModal open={sucessAdd} close={handleSuccessAddClose} message="Friend Added"/>
                {error.data ? (
                    <>
                        <SimpleModal open={failureRequest} close={handleFailureClose} message={error.data.message}/>
                        <SimpleModal open={failureAdd} close={handleFailureAddClose} message={error.data.message}/>
                    </>
                ) : (<></>)}
            </div>
        )
    }

}