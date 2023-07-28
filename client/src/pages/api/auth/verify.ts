import axios from "axios";
export default async function verify(req:any, res:any)  {
    const body = (req.body)
    const {verificationCode, token} = body;
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
            res.status(200).json()
        } catch (err:any) {
            res.status(401).json(err.response.data)
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