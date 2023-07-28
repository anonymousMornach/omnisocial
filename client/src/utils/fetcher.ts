import {getToken} from "@/utils/token";
import axios from "axios";
export async function fetcher(url:any) {
    const token = await getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: 'GET',
        url,
    };

    try {
        const result = await axios(config);
        return result.data;
    } catch (error:any) {
        throw new Error(error.response?.data || 'An error occurred while fetching the data.');
    }
}