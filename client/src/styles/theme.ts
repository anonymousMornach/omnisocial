import { createTheme } from '@mui/material/styles';
import {red} from '@mui/material/colors';

// Create your custom theme here
const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: red[500],
        },
    },
    // You can add more customizations to the theme as needed
});

export { theme };
