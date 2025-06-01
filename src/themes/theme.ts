// theme.ts
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: '#f97859', // Corail
        },
        secondary: {
            main: '#232019', // Marron foncé
        },
        background: {
            default: '#FCF7EB', // Blanc cassé
        },
    },
    typography: {
        fontFamily: [
            'sans-serif',
        ].join(','),
    }
})
export default theme
