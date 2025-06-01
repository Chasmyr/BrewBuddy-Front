import { Box, Button, Divider, Grid, MenuItem, OutlinedInput, Pagination, Select, SelectChangeEvent, Typography } from "@mui/material"
import Footer from "../../layout/Footer"
import Header from "../../layout/Header"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { beerStyles } from "../../utils/const"
import RecipeCard from "../../components/recipeGalery/RecipeCard"
import RecipeGalerySkeleton from "../../components/skeleton/RecipeGalerySkeleton"
import { useApi } from "../../hooks/useApi"
import { useSnackbar } from "../../context/SnackbarContext"
import { RecipeFromBase } from "../../type/recipeObject"

const RecipeGaleryPage = () => {
    
    const [beerStyle, setBeerStyle] = useState<string>("")
    const [isLoading, setIsLoading] = useState(true)
    const [beerRecipesList, setBeerRecipesList] = useState<RecipeFromBase[]>([])
    const [filteredRecipesList, setFilteredRecipesList] = useState<RecipeFromBase[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [paginatedRecipes, setPaginatedRecipes] = useState<RecipeFromBase[]>([])
    const itemsPerPage = 9

    const navigate = useNavigate()
    const {fetchData} = useApi()
    const { showSnackbar } = useSnackbar()

    const handleBeerStyle = (e: SelectChangeEvent<string>) => {
        setBeerStyle(e.target.value)
    }

    useEffect(() => {
        const fetchRecipes = async () => {
            let axiosConfig = {
                method: 'get'
            }
            const recipesResponse = await fetchData("/api/recipes", axiosConfig)
            if(recipesResponse) {
                setBeerRecipesList(recipesResponse)
                setFilteredRecipesList(recipesResponse)
                setTotalPages(Math.ceil(recipesResponse.length / itemsPerPage))
                setPaginatedRecipes(recipesResponse.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage))
                setIsLoading(false)
            } else {
                showSnackbar("Une erreur est survenue, merci de revenir plus tard.", "error")
                window.scrollTo(0, 0)
                navigate('/')
            }
        }
        fetchRecipes()
    }, [])

    useEffect(() => {
        let filteredRecipsByStyle = beerRecipesList.filter(r =>
            r.profil.style.toLocaleLowerCase() === beerStyle.toLocaleLowerCase()
        )
        setFilteredRecipesList(filteredRecipsByStyle)
        setTotalPages(Math.ceil(filteredRecipsByStyle.length / itemsPerPage))
        setPaginatedRecipes(filteredRecipsByStyle.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage))
        setCurrentPage(1)
    }, [beerStyle])

    useEffect(() => {
        setTotalPages(Math.ceil(filteredRecipesList.length / itemsPerPage))
        setPaginatedRecipes(filteredRecipesList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage))
    }, [currentPage])

    if(isLoading) {
        return (
            <RecipeGalerySkeleton />
        )
    }

    return (
        <>
            <Header />
                <Box
                    sx={{
                        width: "100%",
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                        bgcolor: {
                            xs: "#FCF7EB"
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: {xs: "80%", sm: "85%", md: "85%", lg: "1000px"},
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            mb: 4
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                mt: 16,
                                height: "100%",
                                boxShadow: 2,
                                bgcolor: "#FFFBF2",
                                borderRadius: 2,
                                p: 4
                            }}
                        >
                            <Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mb: 2,
                                        flexDirection: {xs: "column", md: "row"}
                                    }}
                                >
                                    <Typography variant="h3" fontSize={32}
                                        sx={{
                                            mb: {
                                                xs: 2,
                                                md: 0
                                            }
                                        }}
                                    >
                                        Trouver vôtre prochaine recette
                                    </Typography>
                                    <Button variant="contained" sx={{color: "#FFFBF2"}}
                                        onClick={() => {
                                            window.scrollTo(0, 0)
                                            navigate('/recipes/create')
                                        }}
                                    >
                                        Ou créer la vôtre
                                    </Button>
                                </Box>
                                <Select
                                    id="beerStyle"
                                    label="Style"
                                    fullWidth
                                    displayEmpty
                                    notched={false}
                                    value={beerStyle}
                                    onChange={handleBeerStyle}
                                    input={<OutlinedInput label="beerStyle" notched={false} />}
                                >
                                    <MenuItem value="" disabled>
                                        Filtrer par le style de bière
                                    </MenuItem>
                                    {
                                        beerStyles.map((beerStyle) => {
                                            return (
                                                <MenuItem 
                                                    value={beerStyle}
                                                >
                                                    {beerStyle}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                                <Divider sx={{ width: '100%', mt: 2, mb: 3 }}/>
                            </Box>
                            <Box minHeight="40vh">
                                <Grid container spacing={4}>
                                    {paginatedRecipes.map((beerRecipe) => {
                                        return (
                                            <Grid key={beerRecipe._id} size={{xs: 12, sm: 6, md: 4}}>
                                                <RecipeCard recipe={beerRecipe} />
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </Box>
                            <Box display="flex" justifyContent="center" mt={4}>
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={(_, value) => {
                                        window.scrollTo(0, 0)
                                        setCurrentPage(value)
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            <Footer />
        </>
    )
}

export default RecipeGaleryPage