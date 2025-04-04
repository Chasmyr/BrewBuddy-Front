import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material"
import AccountCircle from '@mui/icons-material/AccountCircle';

const Header = () => {

    return (
        <Box>
            <AppBar position="static">
                <Toolbar sx={{ background: "#FFFBFC", boxShadow: 1}}>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1, color: "#F1A500" }}>
                        Brew Buddy
                    </Typography>
                    <Typography variant="h3" component="div" sx={{flexGrow: 1, color: "#2D2E2E", fontSize: 18 }}>
                        Recettes
                    </Typography>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header