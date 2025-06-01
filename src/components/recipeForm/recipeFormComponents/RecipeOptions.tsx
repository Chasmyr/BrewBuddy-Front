import { Box, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { setCurrentStep } from "../../../store/recipeFormSlice"
import { recipeSteps } from "../../../utils/const"
import { useApi } from "../../../hooks/useApi"
import { useSnackbar } from "../../../context/SnackbarContext"
import { useNavigate } from "react-router"

type RecipeOptionsProps = {
    handleNext: (...args: any[]) => any
}

const RecipeOptions: React.FC<RecipeOptionsProps> = ({handleNext}) => {

    const dispatch = useDispatch()
    const {fetchData} = useApi()
    const currentRecipe = useSelector((state: RootState) => state.recipeForm.recipe)
    const token = useSelector((state: RootState) => state.user.accessToken)
    const { showSnackbar } = useSnackbar()
    const navigate = useNavigate()

    const currentStep = useSelector((state: RootState) => state.recipeForm.currentStep)
    const handleSetCurrentStep = (step: number) => {
        dispatch(setCurrentStep(step))
    } 

    const handleNextButton = () => {
        if(handleNext() && currentStep < recipeSteps.length - 1) {
                handleSetCurrentStep(currentStep + 1)
                window.scrollTo(0,0)
        }
    }

    const handlePrevButton = () => {
        if (currentStep > 0) {
            handleSetCurrentStep(currentStep - 1)
            window.scrollTo(0,0)
        }
    }

    const handleValidate = async () => {
        const axiosConfig = {
            data: currentRecipe,
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const createRecipeResponse = await fetchData('/api/recipes', axiosConfig)
        if(createRecipeResponse) {
            showSnackbar("Recette créée avec succès, en attente de validation.", "success")
            window.scrollTo(0, 0)
            navigate('/')
        } else {
            showSnackbar("Une erreur est survenue, merci de revenir plus tard.", "error")
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignContent: "center",
                width: "100%",
                bgcolor: "#FFFBF2",
                pb: 4,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4
            }}
        >
            {currentStep > 0 && (
                <Button
                onClick={handlePrevButton}
                variant="outlined"
                sx={{mr:1}}
                >
                    Précédent
                </Button>
            )}

            {currentStep < recipeSteps.length - 1 ? (
                <Button
                    onClick={handleNextButton}
                    variant="contained"
                    sx={{
                        color: "#FFFCF2",
                        mr: 5
                    }}
                >
                    Suivant
                </Button>
            ) : (
                <Button
                    onClick={handleValidate}
                    variant="contained"
                    sx={{
                        color: "#FFFCF2",
                    }}
                >
                    Soumettre pour validation
                </Button>
            )}
        </Box>
    )
}

export default RecipeOptions