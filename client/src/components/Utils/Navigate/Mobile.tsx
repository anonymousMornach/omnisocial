import { IconButton, Badge } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';

export default function Mobile(){
    return(
        <>
            <IconButton aria-label={notificationsLabel(100)}>
                <Badge badgeContent={100} color="secondary">
                    <MailIcon />
                </Badge>
            </IconButton>
        </>
    )
}