import { Box, MenuItem, Select } from "@mui/material"
import { IngredientType } from "../../../type/ingredient"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { IngredientWithQuantity } from "../RecipeFormFermentation"

type SelectedIngredient = {
    id: string 
    ingredient: IngredientType
}

type SelectDiversIngredientsProps = {
    allIngredients: SelectedIngredient[]
    setAllIngredients: React.Dispatch<React.SetStateAction<SelectedIngredient[]>>
    options: IngredientType[]
    title: string
    category: string
    setAllDiversIngredients: React.Dispatch<React.SetStateAction<IngredientWithQuantity[]>>
    allDiversIngredients: IngredientWithQuantity[]
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    disablePortal: true,
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
}

const SelectDiversIngredients: React.FC<SelectDiversIngredientsProps> = ({ allIngredients, setAllIngredients, options, title, category, allDiversIngredients, setAllDiversIngredients }) => {

    const [selectedIngredientId, setSelectedIngredientId] = useState<number | ''>('')
    
    const handleAddIngredient = (ingredientIdToAdd: number) => {
        const ingredientToAdd = options.find((ing) => ing.id === ingredientIdToAdd)
        if (ingredientToAdd) {
            setAllIngredients((prev) => [
                ...prev,
                { id: uuidv4(), ingredient: ingredientToAdd },
            ])
            setSelectedIngredientId('')
        }
    }

    const handleDelete = (ingredientIdToRemove: string) => {
        setAllIngredients((prev) => prev.filter((ingredient) => ingredient.id !== ingredientIdToRemove))
    }

    const getIngredientName = (ingredientID: number) => {
        return options.find((opt) => opt.id === ingredientID)?.name || "Ingrédient inconnu"
    }

    return (
        <Box sx={{ width: "100%" }}>
            <Box>
                <Select
                    value={selectedIngredientId}
                    onChange={(e) => handleAddIngredient(Number(e.target.value))}
                    displayEmpty
                    fullWidth
                    MenuProps={MenuProps}
                >
                    <MenuItem value="" disabled>
                        {title}
                    </MenuItem>
                    {options.filter((ingredient) => ingredient.category === category).map((ingredient) => (
                        <MenuItem key={ingredient.id} value={ingredient.id}>
                            {ingredient.name}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
        </Box>
    )
}

export default SelectDiversIngredients