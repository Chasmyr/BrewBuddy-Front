import { Box, Container, Typography } from "@mui/material"
import Footer from "../layout/Footer"
import Header from "../layout/Header"

const LandingPage = () => {

    return (
        <>
            <Header />
            <Box sx={{
                bgcolor: "secondary.main",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: "url('/assets/background_landing.png')",
                backgroundPosition: "center",
                backgroundSize: "cover"
                }}>
                <Box>
                    <Typography variant="h2" color="background.default" sx={{fontSize: 92, fontFamily: "Spectral"}} fontWeight="bold">
                        Brew Buddy
                    </Typography>
                    <Box sx={{display: "flex"}}>
                        <Typography variant="h2" color="background.default" sx={{fontSize: 46, pr: 1, fontFamily: "Spectral"}} fontWeight="semi-bold">
                            L'art de la bière
                        </Typography>
                        <Typography variant="h2" color="primary.main" sx={{fontSize: 46, fontFamily: "Spectral"}} fontWeight="semi-bold">
                            Amateur
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                bgcolor: "background.default"
            }}>
                <Container maxWidth="xl" sx={{
                    bgcolor: "background.default",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center"
                }}>
                        <Box sx={{
                            backgroundImage: "url('/assets/blob_bottle.png')",
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
                </Container>
            </Box>
            <Box sx={{
                bgcolor: "background.default"
            }}>
                <Container maxWidth="xl" sx={{
                    bgcolor: "background.default",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center"
                }}>
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
                        <Box sx={{
                            backgroundImage: "url('/assets/blob_cap.png')",
                            width: "35vw",
                            height: "100vh",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                        }}>
                        </Box>
                </Container>
            </Box>
            <Box sx={{
                bgcolor: "background.default",
                display: "flex",
                justifyContent: "flex-end"
            }}>
                <svg id="wave" viewBox="0 0 1440 190" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stopColor="rgba(249, 153, 38, 1)" offset="0%"></stop><stop stopColor="rgba(249, 153, 38, 1)" offset="100%"></stop></linearGradient></defs><path fill="url(#sw-gradient-0)" d="M0,60L48,60C96,60,192,60,288,80C384,100,480,140,576,133.3C672,127,768,73,864,66.7C960,60,1056,100,1152,106.7C1248,113,1344,87,1440,83.3C1536,80,1632,100,1728,90C1824,80,1920,40,2016,26.7C2112,13,2208,27,2304,43.3C2400,60,2496,80,2592,93.3C2688,107,2784,113,2880,113.3C2976,113,3072,107,3168,103.3C3264,100,3360,100,3456,100C3552,100,3648,100,3744,96.7C3840,93,3936,87,4032,100C4128,113,4224,147,4320,163.3C4416,180,4512,180,4608,163.3C4704,147,4800,113,4896,90C4992,67,5088,53,5184,63.3C5280,73,5376,107,5472,123.3C5568,140,5664,140,5760,140C5856,140,5952,140,6048,116.7C6144,93,6240,47,6336,26.7C6432,7,6528,13,6624,40C6720,67,6816,113,6864,136.7L6912,160L6912,200L6864,200C6816,200,6720,200,6624,200C6528,200,6432,200,6336,200C6240,200,6144,200,6048,200C5952,200,5856,200,5760,200C5664,200,5568,200,5472,200C5376,200,5280,200,5184,200C5088,200,4992,200,4896,200C4800,200,4704,200,4608,200C4512,200,4416,200,4320,200C4224,200,4128,200,4032,200C3936,200,3840,200,3744,200C3648,200,3552,200,3456,200C3360,200,3264,200,3168,200C3072,200,2976,200,2880,200C2784,200,2688,200,2592,200C2496,200,2400,200,2304,200C2208,200,2112,200,2016,200C1920,200,1824,200,1728,200C1632,200,1536,200,1440,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z"></path></svg>    
            </Box>
            <Box sx={{
                bgcolor: "secondary.main",
                height: "100vh",
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography
                    variant="h3"
                    color="#FFFCF2"
                    fontSize={28}
                    sx={{
                        pr: 1
                    }}
                >
                    C'est aussi de
                </Typography>
                <Typography
                    variant="h3"
                    color="#A44200"
                    fontSize={28}
                >
                    nombreuses 
                </Typography>
                <Typography
                variant="h3"
                color="#FFFCF2"
                fontSize={28}
                sx={{
                    pl: 1
                }}
                >
                    recettes 🍻
                </Typography>
            </Box>
            <Footer />
        </>
    )
}

export default LandingPage