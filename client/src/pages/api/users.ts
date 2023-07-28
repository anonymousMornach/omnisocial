import axios from 'axios';
import {getToken} from "@/utils/token";
export async function getAllUsers(req:Request, res:any) {
    const token = getToken();
    try{
        const response = await axios.get('', {
            headers: {
                Authorization : `Bearer ${token}`
            }
        });
        res.status(200).json(response.data)
    }catch (err){
        res.status(401).json(err)
    }
}

export async function getCurrentUser(req:Request, res:any){
    const token = getToken();
    try{
        const response = await axios.get('', {
            headers: {
                Authorization : `Bearer ${token}`
            }
        });
        res.status(200).json(response.data)
    }catch (err){
        res.status(401).json(err)
    }
}
