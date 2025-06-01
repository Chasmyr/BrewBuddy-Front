import { Box } from "@mui/material"
import Footer from "../layout/Footer"
import Header from "../layout/Header"
import CTA from "../components/landing/CTA"
import AboutBrewBuddy from "../components/landing/AboutBrewBuddy"
import AboutApplication from "../components/landing/AboutApplication"
import AboutTeam from "../components/landing/AboutTeam"
import AboutRecipe from "../components/landing/AboutRecipe"
import ScrollTopButton from "../components/ScrollTopButton"

const LandingPage = () => {

    return (
        <>
            <Header />
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    bgcolor: "#FFFBF2",
                    borderBottom: "1px solid #e0e0e0"
                }}
            >   
                <CTA />
            </Box>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    bgcolor: "#FCF7EB",
                    borderBottom: "1px solid #e0e0e0"
                }}
            >   
                <AboutBrewBuddy />
            </Box>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    bgcolor: "#FFFBF2",
                    borderBottom: "1px solid #e0e0e0"
                }}
            >   
                <AboutApplication />
            </Box>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    bgcolor: "#FCF7EB",
                    borderBottom: "1px solid #e0e0e0"
                }}
            >   
                <AboutRecipe />
            </Box>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    bgcolor: "#FFFBF2",
                }}
            >   
                <AboutTeam />
            </Box>
            <ScrollTopButton />
            <Footer />
        </>
    )
}

export default LandingPage