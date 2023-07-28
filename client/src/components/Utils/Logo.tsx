import { Avatar} from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';
export default function Logo(){
    return(
        <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <AdbIcon />
            </Avatar>
        </>
    )
}