import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Modal} from '@mui/material';
export default function ListModal(props:any){
    const {open, close, message }= props;
    return(
        <Modal
            open={open}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box sx={{
                backgroundColor: '#fff',
                boxShadow: 24,
                p: 4,
                borderRadius: 4,
                minWidth: 300,
                textAlign: 'center',
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {message ? message : "The server has a problem"}
                </Typography>
            </Box>
        </Modal>
    )
}