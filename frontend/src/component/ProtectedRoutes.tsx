import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const axios = require("axios");

export default function ProtectedRoutes({ component: Component, ...rest }:any) {
    // Check if the user is authenticated (token exists in cookies)
    const isAuthenticated = cookies.get("TOKEN");
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    function checkAuth(token:any) {
        async function check(token:any) {
            try{
                const data = await axios.post(`${process.env.REACT_APP_API}/auth/checkauth`, {
                    headers: {
                        "Authorization": `${token}`
                    }
                })
                console.log(data)
                if (data.success) {
                    setRedirectToLogin(false);
                    console.log(data)
                } else {
                    setRedirectToLogin(true);
                    console.log(data)
                }
            }catch (err :any) {
                setRedirectToLogin(true);
            }
        }
    }

    useEffect(() => {
        // Check authentication status and set redirectToLogin accordingly
        if (!isAuthenticated) {
            setRedirectToLogin(true);
        }
        else{
            checkAuth(isAuthenticated);
        }
    }, [isAuthenticated]);

    return (
        <>
            {redirectToLogin ? (
                // Redirect to the login page with the current location as the "from" state
                window.location.href = "/login"
            ) : (
                // Render the protected component if authenticated
                <Component {...rest} />
            )}
        </>
    );
}