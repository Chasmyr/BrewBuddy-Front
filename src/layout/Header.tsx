import { AppBar, Box, Toolbar, Typography } from "@mui/material"
import { useNavigate } from "react-router"

const Header = () => {

    const navigate = useNavigate()

    return (
        <Box>
            <AppBar>
                <Toolbar sx={{ background: "#2D2E2E", boxShadow: 1, display: "flex", justifyContent: "space-between", textAlign: "center"}}>
                    <Typography variant="h3" component="div" sx={{flexGrow: 1, color: "#FFFCF2", fontSize: 18, cursor: "pointer" }}>
                        Recettes
                    </Typography>
                    <Typography variant="h3" component="div" sx={{flexGrow: 1, color: "#FFFCF2", fontSize: 18, cursor: "pointer" }}>
                        L'appli
                    </Typography>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1, color: "#F99926", cursor: "pointer" }}
                        onClick={() => navigate('/')}
                    >
                        Brew Buddy
                    </Typography>
                    <Typography variant="h3" component="div" sx={{flexGrow: 1, color: "#FFFCF2", fontSize: 18, cursor: "pointer" }}
                        onClick={() => navigate('/account')}
                    >
                        Compte
                    </Typography>
                    <Typography variant="h3" component="div" sx={{flexGrow: 1, color: "#FFFCF2", fontSize: 18, cursor: "pointer" }}>
                        Contact
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header