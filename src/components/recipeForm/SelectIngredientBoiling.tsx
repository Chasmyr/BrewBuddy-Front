import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { IngredientType } from "../../type/ingredient"
import { Box, Button, Card, CardContent, IconButton, MenuItem, Select, Typography } from "@mui/material"
import { Delete } from "@mui/icons-material"

type SelectedIngredient = {
    id: string 
    ingredient: IngredientType
}

type SelectIngredientBoilingProps = {
    allIngredients: SelectedIngredient[]
    setAllIngredients: React.Dispatch<React.SetStateAction<SelectedIngredient[]>>
    options: IngredientType[]
    title: string
    category: string
}

const SelectIngredientBoiling: React.FC<SelectIngredientBoilingProps> = ({ allIngredients, setAllIngredients, options, title, category }) => {
    const [selectedIngredientId, setSelectedIngredientId] = useState<number | ''>('')

    const handleAddIngredient = () => {
        const ingredientToAdd = options.find((ing) => ing.id === selectedIngredientId)
        if (ingredientToAdd) {
        setAllIngredients((prev) => [
            ...prev,
            { id: uuidv4(), ingredient: ingredientToAdd },
        ])
        setSelectedIngredientId('')
        }
    }

    const handleRemoveIngredient = (idToRemove: string) => {
        setAllIngredients((prev) => prev.filter((ingredient) => ingredient.id !== idToRemove))
    }

    const getIngredientName = (ingredientID: number) => {
        return options.find((opt) => opt.id === ingredientID)?.name || "Ingrédient inconnu"
    }

  return (
    <Box sx={{ width: "100%" }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
            {title}
        </Typography>
        <Box>
            <Select
            value={selectedIngredientId}
            onChange={(e) => setSelectedIngredientId(Number(e.target.value))}
            displayEmpty
            size="small"
            sx={{ minWidth: 250 }}
            >
            <MenuItem value="" disabled>
                Choisir un ingrédient
            </MenuItem>
            {options.map((ingredient) => (
                <MenuItem key={ingredient.id} value={ingredient.id}>
                {ingredient.name}
                </MenuItem>
            ))}
            </Select>
            <Button variant="contained" disabled={selectedIngredientId === ''} onClick={handleAddIngredient}>
            Ajouter
            </Button>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {allIngredients.map((ingredient) => {
                if(ingredient.ingredient.category === category) {
                    return (
                        <Card
                            key={ingredient.id}
                            variant="outlined"
                            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}
                        >
                            <CardContent sx={{ p: 0 }}>
                            <Typography variant="subtitle1">{getIngredientName(ingredient.ingredient.id)}</Typography>
                            </CardContent>
                            <IconButton color="error" onClick={() => handleRemoveIngredient(ingredient.id)}>
                            <Delete />
                            </IconButton>
                        </Card>
                    )
                }
            })}
        </Box>
    </Box>
  )
}

export default SelectIngredientBoiling
