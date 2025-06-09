import { Box } from "@mui/material"
import Header from "../layout/Header"
import Footer from "../layout/Footer"
import FormSVG from "../components/svg/Form"
import ContactForm from "../components/ContactForm"


const ContactPage = () => {

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
                    }
                }}>
                    <ContactForm />
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

export default ContactPage