import React from 'react'
import {Button} from "@mui/material";

export default function ListButton(props:any){
    const{user, message, onClickFunction, disabled} = props;
    if(disabled){
        return (
            <Button
                sx={{display: 'inline', marginLeft: '4', marginBottom: '4'}}
                disabled
            >
                {message}
            </Button>
        )
    }
    return(
        <Button
            sx={{display: 'inline', marginLeft: '4', marginBottom: '4'}}
            onClick={() => onClickFunction(user.username)}
        >
            {message}
        </Button>
    )
}