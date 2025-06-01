import { Box, Grid, Typography } from "@mui/material"
import ApplicationDetailsWrapper from "./ApplicationDetailsWrapper"
import IconWrapper from "./IconWrapper"
import { EditDocument, FitnessCenter, People, ShoppingCart, SmartToy, Star } from "@mui/icons-material"

const AboutApplication = () => {

    return (
        <Grid container spacing={4} maxWidth={{xs: "80%", sm: "85%", md: "85%", lg: "1150px"}} sx={{mt: {xs: 10, md: 0}, py: 9}}>
            <Grid size={{xs: 12}} 
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "start",
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(4, 1fr)'
                        },
                        gridTemplateRows: "auto",
                        gridTemplateAreas: {
                            xs: `
                                "a"
                                "b"
                                "c"
                                "d"
                                "e"
                                "f"
                                "g"
                            `,
                            sm: `
                                "a a"
                                "b c"
                                "d e"
                                "f g"
                            `,
                            md: `
                                "a a b c"
                                "d e b c"
                                "d e f g"
                                ". . f g"
                            `
                        },
                        gap: 1
                    }}
                >
                    <Box sx={{gridArea: "a", pb: 4}}>
                        <Typography variant="h2" color="#405344" fontWeight="600" fontSize={{xs: "35px", md: "50px"}} textAlign="center" fontFamily="roboto">
                            Ce que l'application permet de faire
                        </Typography>
                    </Box>
                    <Box sx={{gridArea: "b", display: "flex", justifyContent: "center", alignItems: "center", mb: 1}}>
                        <ApplicationDetailsWrapper size={230}>
                            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                <IconWrapper bgColor="" iconColor="#405344" size={90}>
                                    <SmartToy />
                                </IconWrapper>
                                <Typography variant="body1" color="secondary.main" fontWeight="500" fontFamily="roboto" fontSize={24} textAlign="center" sx={{p: 2}}>
                                    Intéragir avec le boitier IOT
                                </Typography>
                            </Box>
                        </ApplicationDetailsWrapper>
                    </Box>
                    <Box sx={{gridArea: "c", display: "flex", justifyContent: "center", alignItems: "center", mb: 1}}>
                        <ApplicationDetailsWrapper size={230}>
                            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                <IconWrapper bgColor="" iconColor="#405344" size={90}>
                                    <EditDocument />
                                </IconWrapper>
                                <Typography variant="body1" color="secondary.main" fontWeight="500" fontFamily="roboto" fontSize={24} textAlign="center" sx={{p: 2}}>
                                    Créer & partager des recettes
                                </Typography>
                            </Box>
                        </ApplicationDetailsWrapper>
                    </Box>
                    <Box sx={{gridArea: "d", display: "flex", justifyContent: "center", alignItems: "center", mb: 1}}>
                        <ApplicationDetailsWrapper size={230}>
                            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                <IconWrapper bgColor="" iconColor="#405344" size={90}>
                                    <People />
                                </IconWrapper>
                                <Typography variant="body1" color="secondary.main" fontWeight="500" fontFamily="roboto" fontSize={24} textAlign="center" sx={{p: 2}}>
                                    Echanger avec la communauté
                                </Typography>
                            </Box>
                        </ApplicationDetailsWrapper>
                    </Box>
                    <Box sx={{gridArea: "e", display: "flex", justifyContent: "center", alignItems: "center", mb: 1}}>
                        <ApplicationDetailsWrapper size={230}>
                            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                <IconWrapper bgColor="" iconColor="#405344" size={90}>
                                    <ShoppingCart />
                                </IconWrapper>
                                <Typography variant="body1" color="secondary.main" fontWeight="500" fontFamily="roboto" fontSize={24} textAlign="center" sx={{p: 2}}>
                                    Acheter les matières premières
                                </Typography>
                            </Box>
                        </ApplicationDetailsWrapper>
                    </Box>
                    <Box sx={{gridArea: "f", display: "flex", justifyContent: "center", alignItems: "center", mb: 1}}>
                        <ApplicationDetailsWrapper size={230}>
                            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                <IconWrapper bgColor="" iconColor="#405344" size={90}>
                                    <Star />
                                </IconWrapper>
                                <Typography variant="body1" color="secondary.main" fontWeight="500" fontFamily="roboto" fontSize={24} textAlign="center" sx={{p: 2}}>
                                    Réaliser les meilleures recettes
                                </Typography>
                            </Box>
                        </ApplicationDetailsWrapper>
                    </Box>
                    <Box sx={{gridArea: "g", display: "flex", justifyContent: "center", alignItems: "center", mb: 1}}>
                        <ApplicationDetailsWrapper size={230}>
                            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                <IconWrapper bgColor="" iconColor="#405344" size={90}>
                                    <FitnessCenter />
                                </IconWrapper>
                                <Typography variant="body1" color="secondary.main" fontWeight="500" fontFamily="roboto" fontSize={24} textAlign="center" sx={{p: 2}}>
                                    S'entrainer à créer des recettes
                                </Typography>
                            </Box>
                        </ApplicationDetailsWrapper>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default AboutApplication