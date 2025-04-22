import { Box, Button } from "@mui/material"

type RecipeOptionsProps = {
    currentStep: number,
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
    steps: string[]
}


const RecipeOptions: React.FC<RecipeOptionsProps> = ({currentStep, setCurrentStep, steps}) => {

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1)
        }
    }

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1)
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
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4
            }}
        >
            {currentStep > 0 && (
                <Button
                onClick={handlePrev}
                >
                    PREV
                </Button>
            )}

            {currentStep < 3 && (
                <Button
                    onClick={handleNext}
                >
                    NEXT
                </Button>
            )}
        </Box>
    )
}

export default RecipeOptions