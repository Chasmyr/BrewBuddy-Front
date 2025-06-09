import { Box, Typography } from "@mui/material"
import Footer from "../layout/Footer"
import Header from "../layout/Header"

const MobileAppPage = () => {

    return (
        <>
            <Header />
                <Box sx={{
                    bgcolor: "background.default",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignContent: "center"
                        }}
                    >
                        <Typography variant="h4" fontSize={180} color="primary.main">
                            Soon
                        </Typography>
                        <Typography textAlign="center" fontSize={28}>
                            L'application est en construction ! 🛠️
                        </Typography>
                    </Box>
                </Box>
            <Footer />
        </>
    )
}

export default MobileAppPage