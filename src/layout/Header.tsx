import { AppBar, Box, Toolbar, Typography } from "@mui/material"
import { useNavigate } from "react-router"
import Logo from "../components/Logo"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { useEffect, useState } from "react"

const Header = () => {

    const [isUserAuth, setIsUserAuth] = useState(false)

    const userToken = useSelector((state: RootState) => state.user.token)
    const navigate = useNavigate()

    useEffect(() => {
        if(userToken) {
            setIsUserAuth(true)
        } else if (localStorage.getItem("accessToken")) {
            setIsUserAuth(true)
        }
    }, [])

    return (
        <Box>
            <AppBar>
                <Toolbar sx={{ bgcolor: "background.default", boxShadow: 1, display: "flex", justifyContent: "space-between", textAlign: "center"}}>
                    <Box
                        sx={{
                            width: "110px",
                            height: "50px",
                            cursor: "pointer" 
                        }}
                        onClick={() => navigate('/')}
                    >
                        <Logo />
                    </Box>
                    <Box sx={{display: "flex"}}>
                        {isUserAuth ?
                                <p>tt</p>
                            :
                                <>
                                    <Typography variant="h3" component="div" 
                                        sx={{flexGrow: 1, color: "secondary.main", fontSize: 18, cursor: "pointer", mr: 3 }}
                                        onClick={() => navigate('/login')}
                                    >
                                        Connexion
                                    </Typography>
                                    <Typography variant="h3" component="div" 
                                        sx={{color: "secondary.main", flexGrow: 1, fontSize: 18, cursor: "pointer", mr: 3 }}
                                        onClick={() => navigate('/')}
                                    >
                                        L'appli
                                    </Typography>
                                </>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header