import { Box, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { setCurrentStep } from "../../store/recipeFormSlice"
import { recipeSteps } from "../../utils/const"


const RecipeOptions = () => {

    const dispatch = useDispatch()

    const currentStep = useSelector((state: RootState) => state.recipeForm.currentStep)
    const handleSetCurrentStep = (step: number) => {
        dispatch(setCurrentStep(step))
    } 

    const handleNext = () => {
        if (currentStep < recipeSteps.length - 1) {
            handleSetCurrentStep(currentStep + 1)
        }
    }

    const handlePrev = () => {
        if (currentStep > 0) {
            handleSetCurrentStep(currentStep - 1)
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignContent: "center",
                width: "100%",
                bgcolor: "#FFFCF2",
                px: 6,
                pb: 2,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4
            }}
        >
            {currentStep > 0 && (
                <Button
                onClick={handlePrev}
                >
                    Précédent
                </Button>
            )}

            {currentStep < recipeSteps.length - 1 && (
                <Button
                    onClick={handleNext}
                >
                    Suivant
                </Button>
            )}
        </Box>
    )
}

export default RecipeOptions