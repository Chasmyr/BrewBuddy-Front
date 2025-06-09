import { Box, Chip, Divider, Grid, Typography } from "@mui/material"
import { CreateRecipe, RecipeFromBase } from "../../type/recipeObject"
import { capitalizeFirstLetter } from "../../utils/string"

type RecipeFullDetailsProps = {
    recipe: RecipeFromBase | CreateRecipe
}

const RecipeFullDetails: React.FC<RecipeFullDetailsProps> = ({recipe}) => {

    return (
        <Box 
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column"
            }}
        >   
            <Box>
                <Typography variant="h3" color="#405344" fontWeight="600" fontFamily="antonio" fontSize={{xs: 24, sm: 32}}>
                    {recipe.profil.recipeName}
                </Typography>
                <Divider sx={{width: "100%", my: 1}} />
                <Box>
                    <Chip label={`Style : ${recipe.profil.style}`} color="primary" sx={{color: "background.default", mr: 2, mt: 1}}/>
                    <Chip label={`EBC : ${recipe.profil.ebc.join(" - ")}`} color="primary" sx={{color: "background.default", mr: 2,  mt: 1}}/>
                    <Chip label={`IBU : ${recipe.profil.ibu.join(" - ")}`} color="primary" sx={{color: "background.default", mr: 2,  mt: 1}}/>
                    <Chip label={`Difficulté : Facile`} color="primary" sx={{color: "background.default", mt: 1}}/>
                </Box>
            </Box>
            <Box sx={{mt: 2}}>
                <Typography variant="h4" fontWeight="600" fontFamily="antonio" fontSize={{xs: 22, sm: 28}} color="primary.main">
                    Présentation
                </Typography>
                <Divider sx={{width: "100%", my: 1, bgcolor: "primary.main", mt: 0, mb: 2}} />
                <Typography variant="body2" fontSize={{xs: 18}} fontWeight={300} fontFamily={"roboto"}> 
                    {recipe.profil.description}
                </Typography>
            </Box>
            <Box sx={{mt: 2}}>
                <Typography variant="h4" fontWeight="600" fontFamily="antonio" fontSize={{xs: 22, sm: 28}} color="primary.main">
                    Ingrédients
                </Typography>
                <Divider sx={{width: "100%", my: 1, bgcolor: "primary.main", mt: 0, mb: 2}} />
                <Grid container sx={{mb: 4}} spacing={4}>
                    {recipe.recipeIngredients.map((ingredientCategory) => {
                        if(ingredientCategory.ingredients.length > 0) {
                            return (
                                <Grid size={{xs: 12, sm: 6, md: 4}} key={ingredientCategory.category}>
                                    <Typography variant="body1" sx={{fontWeight: "600"}}>
                                        {capitalizeFirstLetter(ingredientCategory.category)} :
                                    </Typography>
                                    <Box>
                                        {ingredientCategory.ingredients.map((ingredient, index) => {
                                            if(ingredientCategory.category === "levures" || ingredientCategory.category === "sucres") {
                                                return (
                                                    <Typography variant="body2" sx={{mt: 1}} key={index}>
                                                        - {ingredient.name}
                                                    </Typography>
                                                )
                                            }
                                            return (
                                                <Typography variant="body2" sx={{mt: 1}} key={index}>
                                                    - {ingredient.quantity}{ingredient.measureUnit} de {ingredient.name}
                                                </Typography>
                                            )
                                        })}
                                    </Box>
                                </Grid>
                            )
                        }
                    })}
                </Grid>
            </Box>
            <Box>
                <Typography variant="h4" fontWeight="600" fontFamily="antonio" fontSize={{xs: 22, sm: 28}} color="primary.main">
                    Empâtage
                </Typography>
                <Divider sx={{width: "100%", my: 1, bgcolor: "primary.main", mt: 0, mb: 2}} />
                {recipe.steps.mashing.steps.length > 0 ?
                        recipe.steps.mashing.steps.map((mashingStep, index) => {
                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        boxShadow: 2,
                                        p: 2,
                                        my: 2,
                                        borderRadius: 2
                                    }}
                                >
                                    <Typography variant="body1" color="#405344" fontWeight={600}>
                                        Étape {index + 1}
                                    </Typography>
                                    <Typography variant="body2">
                                        Ajouter les ingrédients et Chauffez l'eau à {mashingStep.temperature}° pendant {mashingStep.duration} minutes.
                                    </Typography>
                                </Box>
                            )
                        })
                    :
                        recipe.steps.mashing.steps.map((mashingStep, index) => {
                            return (
                                <Box key={index}>
                                    <Typography variant="body1" color="#405344" fontWeight={600}>
                                        Étape unique
                                    </Typography>
                                    <Typography variant="body2">
                                                Ajouter les ingrédients et Chauffez l'eau à {mashingStep.temperature}° pendant {mashingStep.duration} minutes.
                                    </Typography>
                                </Box>
                            )
                        })
                }
            </Box>
            <Box>
                <Typography variant="h4" fontWeight="600" fontFamily="antonio" fontSize={{xs: 22, sm: 28}} color="primary.main">
                    Ébullition
                </Typography>
                <Divider sx={{width: "100%", my: 1, bgcolor: "primary.main", mt: 0, mb: 2}} />
                {recipe.steps.boiling.map((boilingStep, index) => {
                    return (
                        <Box key={index}
                            sx={{
                                boxShadow: 2,
                                p: 2,
                                my: 2,
                                borderRadius: 2
                            }}
                        >
                            <Typography variant="body1" color="#405344" fontWeight={600}>
                                Étape {index + 1}
                            </Typography>
                            {boilingStep.postBoiling ?
                                    <Typography variant="body2">
                                        Ajouter les ingrédients après {boilingStep.whenToAdd} minutes d'ébulition et couper le feu.
                                    </Typography>
                                :
                                    <Typography variant="body2">
                                        Ajouter les ingrédients après {boilingStep.whenToAdd} minutes d'ébulition.
                                    </Typography>
                            }
                        </Box>
                    )
                })}
            </Box>
            <Box>
                <Typography variant="h4" fontWeight="600" fontFamily="antonio" fontSize={{xs: 22, sm: 28}} color="primary.main">
                    Fermentation
                </Typography>
                <Divider sx={{width: "100%", my: 1, bgcolor: "primary.main", mt: 0, mb: 2}} />
                {recipe.steps.fermenting.steps.map((fermentingStep, index) => {

                    let fermentingName = ""
                    if(fermentingStep.name === "primary") fermentingName = "primaire"
                    if(fermentingStep.name === "secondary") fermentingName = "secondaire"
                    if(fermentingStep.name === "refermenting") fermentingName = "Refermentation"

                    return (
                        <Box key={index}
                            sx={{
                                boxShadow: 2,
                                p: 2,
                                my: 2,
                                borderRadius: 2
                            }}
                        >
                            <Typography variant="body1" color="#405344" fontWeight={600}>
                                {fermentingName === "Refermentation" ? fermentingName :  `Fermentation ${fermentingName}`}
                            </Typography>
                            <Typography variant="body2">
                                Laissez fermenter pendant {fermentingStep.duration} jours à {fermentingStep.temperature}°.
                            </Typography>
                        </Box>
                    )
                })}
            </Box>
        </Box> 
    )
}

export default RecipeFullDetails