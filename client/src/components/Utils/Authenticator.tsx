import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { authenticate } from '@/utils/auth'; // Import the original authenticate function

function Authenticator() {
    const router = useRouter();

    useEffect(() => {
        authenticate(router); // Pass the router instance to the authenticate function
    }, []);

    return <></>; // You can return null or any component you like, as this component won't render anything
}

export default Authenticator;
