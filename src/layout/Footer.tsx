import { Box, Typography, Container, Grid } from "@mui/material"
import { useNavigate } from "react-router"
import Logo from "../components/Logo"

const Footer = () => {

    const navigate = useNavigate()

    return (
        <Box
        component="footer"
        sx={{
            bgcolor: "background.default",
            color: "text.primary",
            mt: "auto",
            borderTop: "1px solid #e0e0e0"
        }}
        >
        <Container maxWidth="xl">
            <Box display="flex" justifyContent="center" alignItems="center">
                <Grid container spacing={3} padding={3}>
                    <Grid size={{xs: 12, sm: 4}}>
                        <Box
                            sx={{
                                width: "110px",
                                height: "50px",
                                cursor: "pointer",
                            }}
                            onClick={() => navigate('/')}
                        >
                            <Logo />
                        </Box>
                    </Grid>
                    <Grid size={{xs: 12, sm: 8}}>
                        <Box
                            sx={{
                                height: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: {
                                    xs: "start",
                                    sm: "center"
                                },
                                flexDirection: {
                                    xs: "column",
                                    sm: "row"
                                }
                            }}
                        >
                            <Typography variant="body2" align="center" sx={{
                                cursor: "pointer", 
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                            }}}>
                                FAQ
                            </Typography>
                            <Typography variant="body2" align="center" sx={{
                                cursor: "pointer", 
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                            }}}>
                                Contact
                            </Typography>
                            <Typography variant="body2" align="center" sx={{
                                cursor: "pointer", 
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                            }}}>
                                CGV
                            </Typography>
                            <Typography variant="body2" align="center" sx={{
                                cursor: "pointer", 
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                            }}}>
                                Mentions Légales
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid size={12}>
                        <Typography variant="body2" align="center">
                            © {new Date().getFullYear()} Brew Buddy – Tous droits réservés.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
        </Box>
    )
}

export default Footer