import { Box, InputAdornment, TextField, Typography } from "@mui/material"
import { IngredientType } from "../../type/ingredient"

type IngredientDetailsProps = {
    ingredients: IngredientType[],
    needQuantity: boolean
}

const IngredientDetails: React.FC<IngredientDetailsProps> = ({ingredients, needQuantity}) => {

    return (
        <Box
            sx={{
                minHeight: "100px"
            }}
        >
            {ingredients.map((ingredient) => (
                <Box
                    key={ingredient.id}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1,
                    }}
                >
                    <Typography variant="h6" fontSize={16}>
                        {ingredient.name}
                    </Typography>
                    {needQuantity && (
                        <TextField 
                            placeholder="Quantité"
                            type="number"
                            variant="standard"
                            sx={{
                                maxWidth: "100px"
                            }}
                            slotProps={{
                                input: {
                                    endAdornment:
                                        <InputAdornment position="end">{ingredient.measureUnit}</InputAdornment>
                                }
                            }}
                            onKeyDown={(e) => {
                                if (['e', 'E', '+', '-', '.'].includes(e.key)) {
                                  e.preventDefault()
                                }
                            }}
                        />
                    )}
                </Box>
            ))}
        </Box>
    )
}

export default IngredientDetails