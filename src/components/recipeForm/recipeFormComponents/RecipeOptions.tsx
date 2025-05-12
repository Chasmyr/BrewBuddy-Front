import { Box, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { setCurrentStep } from "../../../store/recipeFormSlice"
import { recipeSteps } from "../../../utils/const"

type RecipeOptionsProps = {
    handleNext: (...args: any[]) => any
}

const RecipeOptions: React.FC<RecipeOptionsProps> = ({handleNext}) => {

    const dispatch = useDispatch()

    const currentStep = useSelector((state: RootState) => state.recipeForm.currentStep)
    const handleSetCurrentStep = (step: number) => {
        dispatch(setCurrentStep(step))
    } 

    const handleNextButton = () => {
        if(handleNext() && currentStep < recipeSteps.length - 1) {
                handleSetCurrentStep(currentStep + 1)
        }
    }

    const handlePrevButton = () => {
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
                width: {
                    md: "calc(100% - 96px)",
                    sm: "calc(100% - 48px)"
                },
                bgcolor: "#FFFCF2",
                px: {
                    xs: 3,
                    md: 6
                },
                pb: 2,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4
            }}
        >
            {currentStep > 0 && (
                <Button
                onClick={handlePrevButton}
                >
                    Précédent
                </Button>
            )}

            {currentStep < recipeSteps.length - 1 && (
                <Button
                    onClick={handleNextButton}
                    variant="outlined"
                >
                    Suivant
                </Button>
            )}
        </Box>
    )
}

export default RecipeOptions