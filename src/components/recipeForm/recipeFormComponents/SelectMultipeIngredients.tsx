import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Box, Chip, MenuItem, Select } from "@mui/material"
import { IngredientType } from "../../../type/ingredient"
import CancelIcon from '@mui/icons-material/Cancel'

type SelectedIngredient = {
    id: string 
    ingredient: IngredientType
}

type SelectMultipleIngredientsProps = {
    allIngredients: SelectedIngredient[]
    setAllIngredients: React.Dispatch<React.SetStateAction<SelectedIngredient[]>>
    options: IngredientType[]
    title: string
    category: string
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

const SelectMultipleIngredients: React.FC<SelectMultipleIngredientsProps> = ({ allIngredients, setAllIngredients, options, title, category }) => {
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

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, my: 2 }}>
            {allIngredients.map((ingredient) => {
                if(ingredient.ingredient.category === category) {
                    return (
                        <Chip 
                            key={ingredient.id}
                            label={getIngredientName(ingredient.ingredient.id)}
                            onDelete={() => handleDelete(ingredient.id)}
                            deleteIcon={
                                <CancelIcon 
                                    onMouseDown={(e) => {
                                        e.stopPropagation()
                                    }}
                                />
                            }
                        />
                    )
                }
            })}
        </Box>
    </Box>
  )
}

export default SelectMultipleIngredients
