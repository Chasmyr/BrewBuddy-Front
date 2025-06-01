import { Card, CardContent, Grid, Typography } from "@mui/material"
import { team } from "../../utils/teamData"

const AboutTeam = () => {


    return (
        <Grid container spacing={4} maxWidth={{xs: "80%", sm: "85%", md: "85%", lg: "1150px"}} sx={{mt: {xs: 10, md: 0}, py: 9}}>
            <Grid size={{xs: 12}} 
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4" color="#405344" fontWeight="600" fontSize={{xs: "40px", md: "50px"}} fontFamily="roboto" textAlign="center">
                    Une équipe passionnée, au service des brasseurs
                </Typography>
            </Grid>
            <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
                {team.map((member, index) => (
                    <Grid size={{xs: 12, sm:6, md: 4}} key={index}>
                    <Card sx={{bgcolor: "#FCF7EB"}}>
                        <CardContent>
                        <Typography variant="h6" color="#405344" fontWeight={600}>{member.name}</Typography>
                        <Typography variant="subtitle2" color="primary.main" gutterBottom>
                            {member.role}
                        </Typography>
                        <Typography variant="body2" whiteSpace="pre-line">
                            {member.description}
                        </Typography>
                        </CardContent>
                    </Card>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}

export default AboutTeam