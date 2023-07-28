import axios from "axios";
import {getToken} from "@/utils/token";

export default async function verify(req:any, res:any)  {
    const token = getToken()
    const body = JSON.parse(req.body)
    const {verificationCode} = body;
    if (req.method === "POST"){
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/auth/verify_token`,
                {
                    verificationCode: verificationCode,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("success", response);
            res.status(200).json()
        } catch (err) {
            console.log("failed", err);
            res.status(401).json()
        }
    }else if(req.method === "GET"){
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/auth/get_token`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            res.status(200).json()
        } catch (err) {
            res.status(401).json(err)
        }
    }

};