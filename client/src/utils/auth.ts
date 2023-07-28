import axios from "axios";
import { getToken } from "@/utils/token";

export async function authenticate(router:any) {
    const token = await getToken();
    if (!token) {
        // If the token is not present, redirect to the login page (client-side)
        router.push("/login");
        return; // Return here to avoid executing the code below if there's no token.
    }

    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // If the authentication is successful, return an empty object
    } catch (err) {
        // If there's an error with the authentication, redirect to the login page (client-side)
        router.push("/login");
    }
}
