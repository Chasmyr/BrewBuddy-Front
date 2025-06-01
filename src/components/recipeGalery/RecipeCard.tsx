import { Box, Button, Card, CardContent, Chip, Typography } from "@mui/material"
import { RecipeFromBase } from "../../type/recipeObject"
import React from "react"
import { useNavigate } from "react-router"

type RecipeCardProps = {
    recipe: RecipeFromBase
}

const RecipeCard: React.FC<RecipeCardProps> = ({recipe}) => {

    const navigate = useNavigate()

    return (
        <Card sx={{height: "100%", bgcolor: "#FFFBF2", boxShadow: 3}}>
            <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="h6"
                        noWrap
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "100%",
                            pr: 1
                        }}
                    >
                        {recipe.profil.recipeName}
                    </Typography>
                    <Chip
                        label="Facile"
                        sx={{
                            bgcolor: "#405344",
                            color: "#FFFBF2",
                            fontWeight: "bold",
                        }}
                    /> 
                </Box>
                <Typography variant="body2" mb={1} color="grey">
                    Style : {recipe.profil.style}  
                </Typography>
                <Typography variant="body2" mb={2}>
                    {recipe.profil.description}
                </Typography>
                <Box display="flex" gap={1} mb={2}>
                    <Chip label={`EBC : ${recipe.profil.ebc.join(" - ")}`} size="small" />
                    <Chip label={`IBU : ${recipe.profil.ibu.join(" - ")}`} size="small" />
                </Box>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Button variant="outlined"
                        onClick={() => {
                            navigate(`/recipes/${recipe._id}`)
                            window.scrollTo(0, 0)
                        }}
                    >
                        Voir le détail
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default RecipeCard