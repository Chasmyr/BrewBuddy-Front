import { Box } from "@mui/material"
import LoginForm from "../../components/user/LoginForm"
import Footer from "../../layout/Footer"
import Header from "../../layout/Header"
import FormSVG from "../../components/svg/Form"

const LoginPage = () => {

    return (
        <>
            <Header />
            <Box sx={{
                background: "#FFFCF2",
                minHeight: "100vh",
                width: "100%",
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
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: {
                        xs: 2,
                        lg: 0
                    },
                }}>
                    <LoginForm />
                </Box>
                <Box sx={{
                    width: {sm: "100%", lg: "50%"},
                    bgcolor: "#FCF7EB",
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
                        lg: "flex"
                    },
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <FormSVG />
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default LoginPage