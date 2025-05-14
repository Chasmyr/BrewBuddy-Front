import { AppBar, Box, Container, Toolbar } from "@mui/material"
import { useNavigate } from "react-router"
import Logo from "../components/Logo"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { useEffect, useState } from "react"
import NavItem from "../components/NavItem"

const Header = () => {

    const [isUserAuth, setIsUserAuth] = useState(false)

    const userToken = useSelector((state: RootState) => state.user.accessToken)
    const navigate = useNavigate()

    useEffect(() => {
        if(userToken) {
            setIsUserAuth(true)
        } else if (localStorage.getItem("accessToken")) {
            setIsUserAuth(true)
        }
    }, [])

    return (
        <AppBar sx={{ bgcolor: "background.default" }}>
            <Container maxWidth="xl">
                <Toolbar sx={{ bgcolor: "background.default", display: "flex", justifyContent: "space-between", textAlign: "center"}}>
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
                                    <NavItem to="/account" label="COMPTE"/>
                                    <NavItem to="/recipe" label="RECETTES"/>
                                    <NavItem to="/" label="L'APPLICATION"/>
                                    <NavItem to="/" label="CONTACT"/>
                                </Box>
                            :
                                <Box>
                                    <NavItem to="/login" label="CONNEXION"/>
                                    <NavItem to="/" label="L'APPLICATION"/>
                                    <NavItem to="/" label="CONTACT"/>
                                </Box>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header