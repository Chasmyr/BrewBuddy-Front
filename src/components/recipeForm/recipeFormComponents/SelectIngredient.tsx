import { Box, Chip, FormControl, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography } from "@mui/material"
import { IngredientType } from "../../../type/ingredient"
import CancelIcon from '@mui/icons-material/Cancel'

type SelectIngredientProps = {
    name: string,
    value: IngredientType[],
    setValue: React.Dispatch<React.SetStateAction<IngredientType[]>>,
    options: IngredientType[]
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
}

const SelectIngredient: React.FC<SelectIngredientProps> = ({name, value, setValue, options}) => {

    const handleChange = (event: SelectChangeEvent<number[]>) => {
        const selectedIds = event.target.value as number[]
        const selectedIngredients = options.filter((ingredient) => 
            selectedIds.includes(ingredient.id)
        )
        setValue((prev) => {
            const allIngredients = [...prev]

            selectedIngredients.forEach((ingredient) => {
                if (!allIngredients.some((i) => i.id === ingredient.id)) {
                  allIngredients.push(ingredient);
                }
            })

            return allIngredients
        })
    }

    const handleDelete = (ingredientToDelete: IngredientType) => () => {
        setValue((ingredients) =>
            ingredients.filter((ingredient) => ingredient.id !== ingredientToDelete.id)
        )
    }

    return (
        <Box sx={{width: "100%"}}>
            <FormControl sx={{width: "100%"}}>
                <Select
                    multiple
                    fullWidth
                    displayEmpty
                    sx={{
                        minHeight: "65px"
                    }}
                    aria-placeholder={name}
                    value={value.map((ingredient) => ingredient.id)}
                    input={<OutlinedInput notched={false} />}
                    onChange={handleChange}
                    renderValue={(selected) => {

                        if(selected.length === 0) {
                            return <Typography color="text.disabled">{name}</Typography>
                        }

                        return (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {value.map((ingredient) => (
                                <Chip 
                                    key={ingredient.id} 
                                    label={ingredient.name} 
                                    onDelete={handleDelete(ingredient)}
                                    deleteIcon={
                                        <CancelIcon 
                                            onMouseDown={(e) => {
                                                e.stopPropagation()
                                            }}
                                        />
                                    }
                                />
                            ))}
                            </Box>
                        )
                    }}
                    MenuProps={MenuProps}
                >
                    {options.map((ingredient) => (
                        <MenuItem
                            key={ingredient.id}
                            value={ingredient.id}
                        >
                            {ingredient.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectIngredient