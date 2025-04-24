import { Box, Breadcrumbs, Link, Typography } from "@mui/material"

type RecipeBreadcrumbPorps = {
    currentStep: number,
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
    steps: string[]
}

const RecipeBreadcrumb: React.FC<RecipeBreadcrumbPorps> = ({currentStep, setCurrentStep, steps}) => {


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
                {steps.map((label, index) => {
                    const isPast = index < currentStep
                    const isCurrent = index === currentStep

                    if(isPast) {
                        return (
                            <Link
                                key={label}
                                underline="hover"
                                onClick={() => setCurrentStep(index)} 
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