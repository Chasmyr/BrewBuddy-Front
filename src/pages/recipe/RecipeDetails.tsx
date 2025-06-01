import { useNavigate, useParams } from "react-router"
import RecipeFullDetails from "../../components/recipeGalery/RecipeFullDetails"
import Footer from "../../layout/Footer"
import Header from "../../layout/Header"
import { useEffect, useState } from "react"
import { useApi } from "../../hooks/useApi"
import { RecipeFromBase } from "../../type/recipeObject"
import { useSnackbar } from "../../context/SnackbarContext"
import { Box, Button } from "@mui/material"
import RecipeFullDetailsSkeleton from "../../components/skeleton/RecipeFullDetailsSkeleton"

const RecipeDetails = () => {

    const { id } = useParams()
    const {fetchData} = useApi()
    const { showSnackbar } = useSnackbar()
    const navigate = useNavigate()

    const [recipe, setRecipe] = useState<RecipeFromBase>()
    const [isPageLoading, setIsPageLoading] = useState(true)

    useEffect(() => {
        const fetchRecipe = async () => {
            let axiosConfig = {
                method: 'get'
            }
            const recipeResponse = await fetchData(`/api/recipes/${id}`, axiosConfig)
            if(recipeResponse) {
                setRecipe(recipeResponse)
                setIsPageLoading(false)
            } else {
                showSnackbar("Une erreur est survenue, merci de revenir plus tard.", "error")
                window.scrollTo(0, 0)
                navigate('/')
            }
        }
        fetchRecipe()
    }, [])

    if(recipe) {
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
                                width: {xs: "95%", sm: "90%", md: "85%", lg: "1000px"},
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                mt: 16,
                                mb: 6
                            }}
                        >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignContent: "center",
                                flexDirection: "column",
                                width: {
                                    md: "calc(100% - 96px)",
                                    sm: "calc(100% - 48px)"
                                },
                                bgcolor: "#FFFBF2",
                                p: {
                                    xs: 3,
                                    md: 6
                                },
                                boxShadow: 1,
                                borderRadius: 2
                            }}
                            >
                                {isPageLoading ? 
                                        <RecipeFullDetailsSkeleton />
                                    :
                                        <>
                                            <RecipeFullDetails recipe={recipe} />
                                            <Box display="flex" justifyContent="space-between" mt={3}>
                                                <Button onClick={() => {
                                                    window.scrollTo(0, 0)
                                                    navigate('/recipes')
                                                }}>
                                                    Retour
                                                </Button>
                                                <Button variant="contained" sx={{color: "background.default"}} onClick={() => {
                                                    window.scrollTo(0, 0)
                                                    navigate('/application')
                                                }}>
                                                    Commencer
                                                </Button>
                                            </Box>
                                        </>
                                }
                            </Box>
                        </Box>
                    </Box>
                <Footer />
            </>
        )
    }
}

export default RecipeDetails