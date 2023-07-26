import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export default function ProtectedRoutes({ component: Component, ...rest }: any) {
    // Check if the user is authenticated (token exists in cookies)
    const isAuthenticated = cookies.get("TOKEN");
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const navigate= useNavigate();

    async function checkAuth(token: any) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/auth/`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setRedirectToLogin(false);

        } catch (err: any) {
            setRedirectToLogin(true);
        }
    }

    useEffect(() => {
        // Check authentication status and set redirectToLogin accordingly
        if (!isAuthenticated) {
            setRedirectToLogin(true);
        } else {
            checkAuth(isAuthenticated);
        }
    }, [isAuthenticated]);

    // Use the useHistory hook to handle navigation
    useEffect(() => {
        if (redirectToLogin) {
            navigate("/login"); // Redirect to the login page
        }
    }, [redirectToLogin, navigate]);

    return (
        <>
            {!redirectToLogin ? (
                // Render the protected component if authenticated
                <Component {...rest} />
            ) : null}
        </>
    );
}
