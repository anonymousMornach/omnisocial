import React, {useState} from 'react';
import axios from "axios";
import Modal from "./ListModal"
import AllList from "./AllList";
import Cookies from "universal-cookie";
import {socket} from "../../socket";

const cookies = new Cookies();

export default function UserList(props:any){

    const {users, mainuser, title } = props;
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
                `${process.env.REACT_APP_API}/friends/${username}/request`,
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
                `${process.env.REACT_APP_API}/friends/${username}/add`,
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
    return(
    <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
        <AllList users={users} mainuser={mainuser} title={title} acceptfriend={acceptFriendRequest} sendfriend={sendFriendRequest}/>
        <Modal open={sucessRequest} close={handleSuccessClose} message="Friend Request Sent"/>
        <Modal open={sucessAdd} close={handleSuccessAddClose} message="Friend Added"/>
        {error.data ? (
            <>
                <Modal open={failureRequest} close={handleFailureClose} message={error.data.message}/>
                <Modal open={failureAdd} close={handleFailureAddClose} message={error.data.message}/>
            </>
        ) : (<></>)}
    </div>
    )
}