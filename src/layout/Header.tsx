import { AppBar, Box, Container, Toolbar } from "@mui/material"
import { useNavigate } from "react-router"
import Logo from "../components/svg/Logo"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { useEffect, useState } from "react"
import NavItem from "../components/NavItem"
import IconWrapper from "../components/landing/IconWrapper"
import { AccountCircle, SportsBar } from "@mui/icons-material"

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
        <AppBar sx={{ bgcolor: "#FCF7EB", borderBottom: "1px solid #e0e0e0" }}>
            <Container sx={{ maxWidth: {xs: "95%", sm: "90%", md: "85%", lg: "1150px"}}} disableGutters>
                <Toolbar sx={{ bgcolor: "#FCF7EB", display: "flex", justifyContent: "space-between"}} disableGutters>
                    <Box
                        sx={{
                            width: "110px",
                            height: "50px",
                            cursor: "pointer" 
                        }}
                        onClick={() => {
                            window.scrollTo(0, 0)
                            navigate('/')
                        }}
                    >
                        <Logo />
                    </Box>
                    <Box sx={{display: "flex"}}>
                        {isUserAuth ?
                                <Box>
                                    <NavItem to="/recipes">
                                        <IconWrapper bgColor="">
                                            <SportsBar />
                                        </IconWrapper>
                                    </NavItem>
                                    <NavItem to="/account">
                                        <IconWrapper bgColor="">
                                            <AccountCircle />
                                        </IconWrapper>
                                    </NavItem>
                                </Box>
                            :
                                <Box>
                                    <NavItem to="/login">
                                        <IconWrapper bgColor="">
                                            <AccountCircle />
                                        </IconWrapper>
                                    </NavItem>
                                </Box>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header