import axios from "axios";
import {getToken} from "@/utils/token";
export default function (req:any, res:any){
    if (req.method === "GET"){
        const config = {
            headers: {
                Authorization: `Bearer ${getToken()}`, // Assuming the token is a JWT, you may need to adjust the format according to your server's requirements.
            },
            method: 'GET',
            url: `${process.env.NEXT_PUBLIC_API}/posts/`,
        }

        axios(config).then((result)=>{
            res.status(200).json(result.data);
        }).catch((err)=>{
            res.status(401).json(err)
        })
    }
}