import React, { useState, useEffect } from 'react';
import {getTimeDifference} from "../utils/date";

export function TimeDisplay(props:any) {
    const {timestamp} = props
    const [timeDifference, setTimeDifference] = useState(getTimeDifference(timestamp));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeDifference(getTimeDifference(timestamp));
        }, 1000);

        // Clear the interval when the component is unmounted or the timestamp changes.
        return () => clearInterval(intervalId);
    }, [timestamp]);

    return <div>{timeDifference}</div>;
}
