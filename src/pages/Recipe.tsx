import { Box, Typography } from "@mui/material"
import RecipeFormBase from "../components/recipeForm/RecipeFormBase"
import Header from "../layout/Header"
import RecipeFormIngredient from "../components/recipeForm/RecipeFormIngredient"


const RecipePage = () => {

    return (
        <>
            <Header />
            <Box
                sx={{
                    width: "100vw",
                    minHeight: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    bgcolor: "#F99926",
                }}
            >
                <Box
                    sx={{
                        width: "80%",
                        maxWidth: "800px",
                        mb: 2,
                        mt: 16,
                        color: '#FFFCF2'
                    }}
                >
                    <Typography variant="h4">
                        Créer ta propre recette de bière ! 🍻
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: "80%",
                        maxWidth: "800px",
                        mb: 6
                    }}
                >
                    <RecipeFormBase />
                    <RecipeFormIngredient />
                </Box>
            </Box>
        </>
    )
}

export default RecipePage