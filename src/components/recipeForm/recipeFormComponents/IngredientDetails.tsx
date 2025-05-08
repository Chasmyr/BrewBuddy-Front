import { Box, InputAdornment, TextField, Typography } from "@mui/material"
import { IngredientType } from "../../../type/ingredient"

type IngredientDetailsProps = {
    ingredients: IngredientType[],
    onQuantityChange: (id: number, quantity: number) => void,
    minHeightUnder: string,
    quantities: Record<number, number>
}

const IngredientDetails: React.FC<IngredientDetailsProps> = ({ingredients, onQuantityChange, minHeightUnder, quantities}) => {

    // TODO => animation d'apparition du détail

    return (
        <Box
            sx={{
                minHeight: minHeightUnder,
                mt: 1
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
                    <TextField 
                        placeholder="Quantité"
                        type="number"
                        variant="standard"
                        value={quantities[ingredient.id] ?? ""}
                        sx={{
                            maxWidth: "140px"
                        }}
                        onChange={(e) => {
                            const newQuantity = Number(e.target.value)
                            onQuantityChange(ingredient.id, newQuantity)
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
                </Box>
            ))}
        </Box>
    )
}

export default IngredientDetails