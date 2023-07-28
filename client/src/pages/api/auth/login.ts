import {getToken, setToken} from "@/utils/token";
import axios from "axios";

export default  async function login(req:any, res:any) {
    if (req.method === "POST") {
        const body = JSON.parse(req.body);
        const email = body.email
        const password = body.password
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
                email: email,
                password: password
            });
            res.status(200).json(response.data)
        } catch (err: any) {
            res.status(401).json(err.response.data)
        }
    }
    else{
        res.status(401)
    }
};