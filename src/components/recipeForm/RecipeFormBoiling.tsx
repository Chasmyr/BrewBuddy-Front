import { Box, Typography } from "@mui/material"
import SelectIngredientBoiling from "./SelectIngredientBoiling"
import { useEffect, useState } from "react"
import { IngredientType } from "../../type/ingredient"
import { ingrEx } from "../../utils/const"
import { SortableList } from "./SortableList"
import BoilingIngredientCard from "./BoilingIngredientCard"

type SelectedIngredient = {
    id: string // UUID unique par sélection d'ingrédient
    ingredient: IngredientType
}

type BoilingStep = {
    id: string // UUID pour dnd-kit
    whenToAdd: number
    duration: number
    postBoiling?: boolean
    ingredient: {
        quantity: number
        ingredientID: number
    }
}

const RecipeFormBoiling = () => {
    const [allIngredients, setAllIngredients] = useState<SelectedIngredient[]>([])
    const [boilingSteps, setBoilingSteps] = useState<BoilingStep[]>([])

    const getIngredientName = (ingredientID: number) => {
        const ingredient = ingrEx.find((ing) => ing.id === ingredientID)
        return ingredient ? ingredient.name : "Ingrédient inconnu"
    }

    const getIngredientMeasureUnit = (ingredientID: number) => {
        const ingredient = ingrEx.find((ing) => ing.id === ingredientID)
        return ingredient ? ingredient.measureUnit : "Ingrédient inconnu"
    }

    useEffect(() => {
        setBoilingSteps((prevSteps) => {
        const existingIds = new Set(prevSteps.map((step) => step.id))

        const newSteps: BoilingStep[] = []
        allIngredients.forEach((ingredientEntry) => {
            if (!existingIds.has(ingredientEntry.id)) {
            newSteps.push({
                id: ingredientEntry.id,
                whenToAdd: 0,
                duration: 0,
                postBoiling: false,
                ingredient: {
                    ingredientID: ingredientEntry.ingredient.id,
                    quantity: 0,
                },
            })
            }
        })

        const validIds = allIngredients.map((ing) => ing.id)
        const filteredSteps = prevSteps.filter((step) => validIds.includes(step.id))

        return [...filteredSteps, ...newSteps]
        })
    }, [allIngredients])

    return (
        <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
            width: "100%",
            bgcolor: "#FFFCF2",
            p: 6,
        }}
        >
        <Box sx={{ mb: 2, width: "100%", display: "flex", justifyContent: "center" }}>
            <Typography variant="h4" fontSize={22}>
            Ebullition
            </Typography>
        </Box>
        <Box sx={{ mb: 2, width: "100%", display: "flex", flexDirection: "column" }}>
            <Typography variant="h4" fontSize={22}>
            Ingrédients
            </Typography>
            <Box sx={{ display: "flex", width: "100%", my: 2, flexDirection: "column" }}>
            <SelectIngredientBoiling
                title="Houblon(s)"
                allIngredients={allIngredients}
                setAllIngredients={setAllIngredients}
                options={ingrEx}
                category="houblons"
            />
            <SelectIngredientBoiling
                title="Sucre(s)"
                allIngredients={allIngredients}
                setAllIngredients={setAllIngredients}
                options={ingrEx}
                category="sucres"
            />
            <SelectIngredientBoiling
                title="Divers(s)"
                allIngredients={allIngredients}
                setAllIngredients={setAllIngredients}
                options={ingrEx}
                category="divers"
            />
            </Box>
            <Box sx={{ mb: 2, width: "100%", display: "flex", flexDirection: "column" }}>
            <Typography variant="h4" fontSize={22}>
                Etapes
            </Typography>
            <Box
                sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                justifyContent: "center",
                alignContent: "center",
                gap: 2,
                mt: 2,
                }}
            >
                {boilingSteps.length > 0 ? (
                <SortableList
                    items={boilingSteps}
                    onReorder={(newOrder) => setBoilingSteps(newOrder)}
                    getItemId={(item) => item.id}
                    renderItem={(item, index) => (
                    <BoilingIngredientCard
                        ingredientName={getIngredientName(item.ingredient.ingredientID)}
                        ingredientMeasureUnit={getIngredientMeasureUnit(item.ingredient.ingredientID)}
                        quantity={item.ingredient.quantity}
                        whenToAdd={item.whenToAdd}
                        duration={item.duration}
                        onChange={(field, value) => {
                        setBoilingSteps((prev) => {
                            const updated = [...prev]
                            if (field === "quantity") {
                            updated[index] = {
                                ...updated[index],
                                ingredient: {
                                ...updated[index].ingredient,
                                quantity: value,
                                },
                            }
                            } else {
                            updated[index] = {
                                ...updated[index],
                                [field]: value,
                            }
                            }
                            return updated
                        })
                        }}
                    />
                    )}
                />
                ) : (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography color="text.disabled" sx={{ fontStyle: "italic", mt: 5 }}>
                    Veuillez sélectionner au moins un houblon.
                    </Typography>
                </Box>
                )}
            </Box>
            </Box>
            </Box>
        </Box>
    )
}

export default RecipeFormBoiling
