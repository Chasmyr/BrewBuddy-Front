import { Box } from "@mui/material"
import Footer from "../layout/Footer"
import Header from "../layout/Header"
import RegisterForm from "../components/RegisterForm"

const RegisterPage = () => {

    return (
        <>
            <Header />
                <Box sx={{
                    background: "#FFFCF2",
                    height: "100vh",
                    width: "100vw",
                    display: "flex",
                    justifyContent: {
                        xs: "center",
                        lg: "normal"
                    },
                    alignItems: {
                        xs: "center",
                        lg: "normal"
                    },
                    flexDirection: {
                        xs: "column",
                        lg: "row"
                    }
                }}>
                <Box sx={{
                    width: {xs: "100%", lg: "50%"},
                    height: {xs: "80%", lg: "100%"},
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: {
                        xs: 2,
                        lg: 0
                    }
                }}>
                    <RegisterForm />
                </Box>
                <Box sx={{
                    width: {sm: "100%", lg: "50%"},
                    backgroundImage: "url('/assets/login.png')",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    height: {
                        sm: "100%",
                        lg: "auto"
                    },
                    position: {
                        sm: "absolute",
                        lg: "static"
                    },
                    display: {
                        xs: "none",
                        sm: "block"
                    }
                }}>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default RegisterPage