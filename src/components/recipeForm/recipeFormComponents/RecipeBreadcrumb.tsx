import { Box, Breadcrumbs, Link, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { setCurrentStep } from "../../../store/recipeFormSlice"
import { recipeSteps } from "../../../utils/const"

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
                width: {
                    md: "calc(100% - 96px)",
                    sm: "calc(100% - 48px)"
                },
                bgcolor: "#FFFBF2   ",
                px: {
                    xs: 3,
                    md: 6
                },
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

                    const content = (
                        <>
                            <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                                {index + 1}
                            </Box>
                        
                            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                                {label}
                            </Box>
                        </>
                    )

                    if(isPast) {
                        return (
                            <Link
                                key={label}
                                underline="hover"
                                onClick={() => handleSetCurrentStep(index)} 
                                color="inherit"
                                sx={{cursor: 'pointer'}}
                            >
                                {content}
                            </Link>
                        )
                    }

                    if (isCurrent) {
                        return (
                            <Typography key={label} fontWeight="bold">
                                {content}
                            </Typography>
                        )
                    }

                    return (
                        <Typography key={label}>
                            {content}
                        </Typography>
                    )
                })}
            </Breadcrumbs>
        </Box>
    )
}

export default RecipeBreadcrumb