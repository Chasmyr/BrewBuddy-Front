import { Box, Typography } from "@mui/material"

const RecipeFormBoiling = () =>{

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "column",
                width: "100%",
                bgcolor: "#FFFCF2",
                p: 6
            }}
        >
            <Box
                sx={{
                    mb: 2,
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Typography
                    variant="h4"
                    fontSize={22}
                >
                    Ebullition
                </Typography>
            </Box>
        </Box>
    )
}

export default RecipeFormBoiling