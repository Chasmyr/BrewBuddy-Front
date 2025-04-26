import { Box, Breadcrumbs, Link, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { setCurrentStep } from "../../store/recipeFormSlice"
import { recipeSteps } from "../../utils/const"

const RecipeBreadcrumb = () => {

    const dispatch = useDispatch()

    const currentStep = useSelector((state: RootState) => state.recipeForm.currentStep)
    const handleSetCurrentStep = (step: number) => {
        dispatch(setCurrentStep(step))
    } 

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "column",
                width: "100%",
                bgcolor: "#FFFCF2",
                px: 6,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4
            }}
        >
            <Breadcrumbs 
            aria-label="recipe-breacrumb"
            separator="→"
            sx={{
                display: "flex",
                justifyContent: "center",
                pt:4
            }}
            >
                {recipeSteps.map((label, index) => {
                    const isPast = index < currentStep
                    const isCurrent = index === currentStep

                    if(isPast) {
                        return (
                            <Link
                                key={label}
                                underline="hover"
                                onClick={() => handleSetCurrentStep(index)} 
                                color="inherit"
                                sx={{cursor: 'pointer'}}
                            >
                                {label}
                            </Link>
                        )
                    }

                    if (isCurrent) {
                        return (
                            <Typography key={label} fontWeight="bold">
                                {label}
                            </Typography>
                        )
                    }

                    return (
                        <Typography key={label}>
                            {label}
                        </Typography>
                    )
                })}
            </Breadcrumbs>
        </Box>
    )
}

export default RecipeBreadcrumb