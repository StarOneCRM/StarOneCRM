import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2A8A6E',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#2A8A6E',
            contrastText: '#FFFFFF',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                        backgroundColor: '#246F5A',
                    },
                },
                outlined: {
                    borderColor: '#2A8A6E',
                    color: '#2A8A6E',
                    '&:hover': {
                        borderColor: '#246F5A',
                        backgroundColor: '#E6F3EF',
                    },
                },
            },
        },
    },
});

export default theme;
