import axios from "axios";

export default async function (req:any, res:any){
    const body = JSON.parse(req.body)
    const {email, password, username, name} = body;


    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/register`, {
            email,
            password,
            username,
            name
        });
        res.status(200).json(response.data)
    } catch (err: any) {
        console.log(err)
        res.status(401).json(err.response.data)
    }
}