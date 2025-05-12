import { AppBar, Box, Toolbar } from "@mui/material"
import { useNavigate } from "react-router"
import Logo from "../components/Logo"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { useEffect, useState } from "react"
import NavItem from "../components/NavItem"

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
                                <Box>
                                    <NavItem to="/account" label="Compte"/>
                                    <NavItem to="/recipe" label="Recettes"/>
                                    <NavItem to="/" label="L'application"/>
                                </Box>
                            :
                                <Box>
                                    <NavItem to="/login" label="Connexion"/>
                                    <NavItem to="/" label="L'application"/>
                                </Box>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header