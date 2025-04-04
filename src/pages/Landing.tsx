import { Box, Typography } from "@mui/material"
import Footer from "../layout/Footer"
import Header from "../layout/Header"

const LandingPage = () => {

    return (
        <>
            {/* <Header /> */}
            <Box sx={{
                background: "#2D2E2E",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
                }}>
                <Box>
                    <Typography variant="h2" color="#FFFCF2" sx={{fontSize: 92}}>
                        Brew Buddy
                    </Typography>
                    <Box sx={{display: "flex"}}>
                        <Typography variant="h2" color="#FFFCF2" sx={{fontSize: 32, pr: 1}}>
                            L'art de la bière
                        </Typography>
                        <Typography variant="h2" color="#F1A500" sx={{fontSize: 32}}>
                            Amateur
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                background: "#FFFCF2",
                height: "100vh",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                pt: 8
            }}>
                    <Box sx={{
                        backgroundImage: "url('/assets/blob.svg')",
                        width: "35vw",
                        height: "100vh",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}>
                    </Box>
                    <Box sx={{
                        width: "35vw",
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <Typography variant="h2" color="#424B54" sx={{fontSize: 24, fontWeight: 600}}>
                            Découvrez notre kit de brassage !
                        </Typography>
                        <Typography variant="h2" color="#424B54" sx={{fontSize: 16, fontWeight: 500, mt: 2}}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Typography>
                    </Box>
            </Box>
            <Box sx={{
                background: "#FFFCF2",
                display: "flex",
                justifyContent: "flex-end"
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F1A500" fillOpacity="1" d="M0,160L40,165.3C80,171,160,181,240,197.3C320,213,400,235,480,240C560,245,640,235,720,224C800,213,880,203,960,181.3C1040,160,1120,128,1200,128C1280,128,1360,160,1400,176L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
                </svg>
            </Box>
            <Box sx={{
                background: "#F1A500",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>

            </Box>
            <Footer />
        </>
    )
}

export default LandingPage