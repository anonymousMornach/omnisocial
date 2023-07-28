import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, CircularProgress} from "@mui/material";
import SimpleModal from "@/components/Utils/SimpleModal";
import { useState, useEffect } from "react";
import { getToken } from "@/utils/token";
import axios from "axios";
import {router} from "next/client";

export default function RetrieveToken(props: any) {
    const { verify, user, handleVerifyClose } = props;
    const [tokenSentFailed, setTokenSentFailed] = useState(false);
    const [tokenSent, setTokenSent] = useState(false);
    const [tokenRecieved, setTokenRecieved] = useState(false);
    const [tokenRecievedFailed, setTokenRecievedFailed] = useState(false);
    const [enteredToken, setEnteredToken] = useState("");
    const [loading, setLoading] = useState(false); // New state for loading

    const handleTokenSubmit = async (event: any) => {
        event.preventDefault();
        setLoading(true); // Start loading animation when submitting the token

        const form = document.getElementById("verificationForm") as HTMLFormElement;
        const data = new FormData(form);
        const verificationCode = data.get("token");
        const token = await getToken();
        try {
            const response = await fetch("api/auth/verify", {
                body: JSON.stringify({ token, verificationCode }),
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response);
            if (response.ok) {
                setTokenRecieved(true);
                setTimeout(() => {
                    router.push("/"); // Redirect to the main menu after the timeout
                }, 1000);
                setLoading(false); // Stop loading animation
                return;
            }
            else{
                setTokenRecievedFailed(true);
                setLoading(false); // Stop loading animation
                return;
            }
        } catch (err) {
            setTokenRecievedFailed(true);
            setLoading(false); // Stop loading animation
            return;
        }
    };

    const sendTokenToEmail = async () => {
        setLoading(true); // Start loading animation when sending the token

        const token = await getToken();
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/auth/get_token`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTokenSent(true);
            setTimeout(() => {
                setTokenSent(false);
                setLoading(false); // Stop loading animation after the timeout
            }, 1000);
        } catch (err) {
            setTokenSentFailed(true);
            setLoading(false); // Stop loading animation
        }
    };

    // Call sendTokenToEmail when the component is mounted (opened)
    useEffect(() => {
        if (verify) {
            // Only call sendTokenToEmail when the dialog opens
            sendTokenToEmail();
        }
    }, [verify]);

    return (
        <>
            <SimpleModal open={tokenRecieved} close={() => setTokenRecieved(false)} message={"Redirecting to Main Menu"} />
            <SimpleModal open={tokenRecievedFailed} close={() => setTokenRecievedFailed(false)} message={"Invalid Verification Code"} />
            <SimpleModal open={tokenSentFailed} close={() => setTokenSentFailed(false)} message={"Token could not be sent"} />
            <SimpleModal open={tokenSent} close={() => setTokenSent(false)} message={`An Email Has been Sent to ${user ? user.email : "your email"}`} />
            <Dialog open={verify} onClose={handleVerifyClose} fullWidth maxWidth="xs">
                <DialogTitle style={{ textAlign: "center" }}>Verify Your Account</DialogTitle>
                <DialogContent>
                    <Typography style={{ textAlign: "center" }}>A 5-digit code has been sent to {user ? user.email : "your email"}</Typography>
                    <form id="verificationForm" onSubmit={handleTokenSubmit}>
                        <input
                            type="text"
                            name="token"
                            required
                            placeholder="Enter Token"
                            style={{ width: '100%', padding: '10px', marginTop: '20px' }}
                            value={enteredToken}
                            onChange={(e) => setEnteredToken(e.target.value)}
                        />
                        {tokenRecievedFailed && (
                            <Typography variant="body2" color="error" style={{ textAlign: "center" }}>
                                Invalid Verification Code
                            </Typography>
                        )}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" type="submit" onClick={sendTokenToEmail} fullWidth style={{ marginTop: '10px' }} disabled={loading}>
                        {loading ? <CircularProgress size={20} color="primary" /> : "Resend Token"}
                    </Button>
                    <Button variant="contained" type="submit" onClick={handleTokenSubmit} fullWidth style={{ marginTop: '10px' }} disabled={loading}>
                        {loading ? <CircularProgress size={20} color="primary" /> : "Submit Token"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
