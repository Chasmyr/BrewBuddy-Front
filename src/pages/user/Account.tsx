import { useSelector } from "react-redux"
import Footer from "../../layout/Footer"
import Header from "../../layout/Header"
import { RootState } from "../../store/store"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { Box } from "@mui/material"

const AccountPage = () => {

    const userToken = useSelector((state: RootState) => state.user.token)
    const navigate = useNavigate()

    useEffect(() => {
        if(!userToken) navigate('/login')
    }, [])

    return (
        <>
            <Header />
            <Box
                sx={{
                    width: "100%",
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    bgcolor: {
                        xs: "#F99926"
                    },
                }}
            >
            </Box>
            <Footer />
        </>
    )
}

export default AccountPage