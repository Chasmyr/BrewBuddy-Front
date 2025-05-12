import { Card, CardContent, Grid, Typography } from "@mui/material"

const UserHistory = () => {

    return (
        <Grid size={{xs: 12, md: 6}}>
            <Grid container spacing={3} sx={{height: "100%"}}>
                <Grid size={12} sx={{height: "30%"}}>
                    <Card variant="outlined" sx={{ borderColor: "primary.main", bgcolor: "background.default", height: "100%" }}>
                        <CardContent>
                            <Typography variant="subtitle1" textAlign="center">
                                Historique des recettes réalisées
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={12} sx={{height: "30%"}}>
                    <Card variant="outlined" sx={{ borderColor: "primary.main", bgcolor: "background.default", height: "100%" }}>
                        <CardContent>
                            <Typography variant="subtitle1" textAlign="center">
                                Mes recettes
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={12} sx={{height: "30%"}}>
                    <Card variant="outlined" sx={{ borderColor: "primary.main", bgcolor: "background.default", height: "100%" }}>
                        <CardContent>
                            <Typography variant="subtitle1" textAlign="center">
                                Mes récompenses et badges
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default UserHistory