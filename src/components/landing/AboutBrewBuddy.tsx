import { Comment, Favorite, Settings, SportsBar } from "@mui/icons-material"
import { Box, Button, Divider, Grid, Typography } from "@mui/material"
import IconWrapper from "./IconWrapper"
import { useNavigate } from "react-router"

const AboutBrewBuddy = () => {

    const navigate = useNavigate()

    return (
        <Grid container spacing={4} maxWidth={{xs: "80%", sm: "85%", md: "85%", lg: "1150px"}} sx={{mt: {xs: 10, md: 0}, py: 9}}>
            <Grid size={{xs: 12, md: 7}} 
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "start",
                }}
            >
                <Box>
                    <Typography variant="h2" color="#405344" fontWeight="600" fontSize={{xs: "40px", md: "50px"}} fontFamily="roboto">
                        Qu'est ce que Brew Buddy ?
                    </Typography>
                </Box>
                <Box
                    sx={{
                        mt: 2,
                        mb: 1
                    }}
                >
                    <Typography variant="body1" color="secondary.main" fontWeight="400" fontFamily="roboto" fontSize="22px">
                        Notre application accompagne chaque brasseur, débutant comme expérimenté, dans la découverte, la création et le partage de recettes de bière maison.
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body1" color="secondary.main" fontWeight="400" fontFamily="roboto" fontSize="22px">
                        Elle simplifie toutes les étapes du brassage grâce à un parcours intuitif, des outils interactifs et des fonctionnalités avancées imaginées pour la communauté.
                    </Typography>
                </Box>
                <Divider sx={{ width: '100%', my: 2 }} />
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2
                    }}
                >
                        <IconWrapper size={25}>
                            <SportsBar />
                        </IconWrapper>
                        <Typography variant="body1" sx={{ml: 1}} color="secondary.main" fontWeight="500" fontFamily="roboto" fontSize="20px">
                            Consulter, créer et partager des recettes de bière
                        </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2
                    }}
                >
                        <IconWrapper size={25}>
                            <Settings />
                        </IconWrapper>
                        <Typography variant="body1" sx={{ml: 1}} color="secondary.main" fontWeight="500" fontFamily="roboto" fontSize="20px">
                            Suivre la fabrication pas à pas
                        </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2
                    }}
                >
                        <IconWrapper size={25}>
                            <Favorite />
                        </IconWrapper>
                        <Typography variant="body1" sx={{ml: 1}} color="secondary.main" fontWeight="500" fontFamily="roboto" fontSize="20px">
                            Retrouver vos recettes favorites
                        </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2
                    }}
                >
                        <IconWrapper size={25}>
                            <Comment />
                        </IconWrapper>
                        <Typography variant="body1" sx={{ml: 1}} color="secondary.main" fontWeight="500" fontFamily="roboto" fontSize="20px">
                            Rejoindre une communauté dynamique
                        </Typography>
                </Box>
                <Box sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", mt: 1 }}>
                        <Button
                        variant="contained"
                        sx={{
                            borderRadius: 8,
                            bgcolor: "primary.main",
                            color: "#FFFBF2"
                        }}
                        onClick={() => {
                            navigate('/faq')
                            window.scrollTo(0, 0)
                        }}
                    >
                        En savoir plus avec la FAQ
                    </Button>
                </Box>
            </Grid>
            <Grid size={{xs: 12, md: 5}}>
                <Box
                    sx={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundImage: "url(landing2.png)",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                </Box>
            </Grid>
        </Grid>
    )
}

export default AboutBrewBuddy