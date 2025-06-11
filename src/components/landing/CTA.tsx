import { Box, Button, Grid, Typography } from "@mui/material"
import Cuve from "../svg/Cuve"
import { useNavigate } from "react-router"

const CTA = () => {

    const navigate = useNavigate()

    return (
        <Grid container spacing={4} maxWidth={{xs: "80%", sm: "85%", md: "85%", lg: "1150px"}} sx={{mt: {xs: 10, md: 0}, pt: 9, pb: 6}}>
            <Grid size={{xs: 12, md: 5}} 
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Box>
                    <Typography variant="h1" color="#405344" fontWeight="500" fontSize={{xs: "40px", md: "60px"}} fontFamily="sans-serif">
                        L'innovation au service du brassage maison
                    </Typography>
                </Box>
                <Box
                    sx={{
                        mt: 2,
                        mb: 3
                    }}
                >
                    <Typography variant="body1" color="secondary.main" fontWeight="400" fontFamily="roboto" fontSize="24px">
                        Un compagnon connecté qui vous guide pas à pas pour réaliser votre bière en toute simplcité !
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: {xs: "column", sm: "row"},
                        mt: {xs: 2, md: 0}
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: 8,
                            bgcolor: "#405344",
                            color: "#FFFBF2",
                            mr: {xs: 0, sm:2},
                            mb: {xs: 2, sm:0},
                        }}
                        onClick={() => {
                            window.scrollTo(0, 0)
                            navigate('/application')
                        }}
                    >
                        Découvrir l'appplication
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: 8,
                            bgcolor: "primary.main",
                            color: "#FFFBF2"
                        }}
                        onClick={() => {
                            window.scrollTo(0, 0)
                            navigate('/register')
                        }}
                    >
                        Créer votre compte
                    </Button>
                </Box>
            </Grid>
            <Grid size={{xs: 12, md: 7}}>
                <Box
                    sx={{
                        height: "100%",
                        display: {xs: "none", md: "flex"},
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Cuve />
                </Box>
            </Grid>
        </Grid>
    )
}

export default CTA