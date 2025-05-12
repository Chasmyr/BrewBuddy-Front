import { Box, Typography, Container } from "@mui/material"

const Footer = () => {
    return (
        <Box
        component="footer"
        sx={{
            bgcolor: "background.default",
            color: "text.primary",
            py: 4,
            mt: "auto",
            borderTop: "1px solid #e0e0e0"
        }}
        >
        <Container maxWidth="lg">
            <Box display="flex" justifyContent="center">
                <Typography variant="body2" align="center" sx={{mr:2}}>
                    © {new Date().getFullYear()} Brew Buddy – Tous droits réservés.
                </Typography>
                <Typography variant="body2" align="center" sx={{mr:2}}>
                    FAQ
                </Typography>
                <Typography variant="body2" align="center" sx={{mr:2}}>
                    CGV
                </Typography>
                <Typography variant="body2" align="center" sx={{mr:2}}>
                    Mentions Légales
                </Typography>
                <Typography variant="body2" align="center" sx={{mr:2}}>
                    Contact
                </Typography>
            </Box>
        </Container>
        </Box>
    )
}

export default Footer