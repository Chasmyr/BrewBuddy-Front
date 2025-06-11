import { Box, Button, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useApi } from "../../hooks/useApi"
import { RecipeFromBase } from "../../type/recipeObject"
import RecipeCard from "../recipeGalery/RecipeCard"
import { useNavigate } from "react-router"

const AboutRecipe = () => {

    const [beerRecipesList, setBeerRecipesList] = useState<RecipeFromBase[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const {fetchData} = useApi()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchRecipes = async () => {
            let axiosConfig = {
                method: 'get'
            }
            const recipesResponse = await fetchData("/api/recipes", axiosConfig)
            if(recipesResponse) {
                setBeerRecipesList(recipesResponse.slice(-6))
                setIsLoading(false)
            }
        }
        fetchRecipes()
    }, [])


    return (
        <Grid container spacing={4} maxWidth={{xs: "80%", sm: "85%", md: "85%", lg: "1150px"}} sx={{ py: 6}}>
            <Grid size={{xs: 12}} 
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "start",
                }}
            >
                <Typography variant="h2" color="#405344" fontWeight="500" fontSize={{xs: "40px", md: "50px"}} fontFamily="sans-serif">
                    Les dernières recettes
                </Typography>
            </Grid>
            <Grid size={{xs: 12}}>
                <Grid container spacing={4}>
                    {isLoading ?
                        (
                            <>
                                <p>loading</p>
                            </>
                        )
                        :
                        beerRecipesList.map((recipe, index) => {
                            return (
                                <Grid key={index} size={{xs: 12, sm: 6, md: 4}}>
                                    <RecipeCard recipe={recipe}  />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Grid>
            <Grid size={{xs: 12}}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: 8,
                            bgcolor: "primary.main",
                            color: "#FFFBF2"
                        }}
                        onClick={() => {
                            navigate('/recipes')
                            window.scrollTo(0, 0)
                        }}
                    >
                        Voir l'ensemble des recettes
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default AboutRecipe