import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { IngredientType } from "../../type/ingredient"
import { ingrEx } from "../../utils/const"
import { SortableList } from "./recipeFormComponents/SortableList"
import BoilingIngredientCard from "./recipeFormComponents/BoilingIngredientCard"
import { InfoOutlineRounded } from "@mui/icons-material"
import { boilingIngredientToolTipContent } from "../../utils/tooltipContent"
import RecipeOptions from "./recipeFormComponents/RecipeOptions"
import { useSnackbar } from "../../context/SnackbarContext"
import SelectMultipleIngredients from "./recipeFormComponents/SelectMultipeIngredients"

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
    const { showSnackbar } = useSnackbar()

    const getIngredientName = (ingredientID: number) => {
        const ingredient = ingrEx.find((ing) => ing.id === ingredientID)
        return ingredient ? ingredient.name : "Ingrédient inconnu"
    }

    const getIngredientMeasureUnit = (ingredientID: number) => {
        const ingredient = ingrEx.find((ing) => ing.id === ingredientID)
        return ingredient ? ingredient.measureUnit : "Ingrédient inconnu"
    }

    const lastHoublonIndex = (() => {
        const indices = boilingSteps
            .map((step, i) => ({
                category: ingrEx.find((ing) => ing.id === step.ingredient.ingredientID)?.category,
                index: i
            }))
            .filter(({ category }) => category === "houblons")
            .map(({ index }) => index)
      
        return indices.length > 0 ? indices[indices.length - 1] : -1
    })()

    const checkIfFormComplete = () => {

        if(allIngredients.filter((ingredient) => ingredient.ingredient.category === "houblons").length === 0) {
            showSnackbar('Veuiliez sélectionner au moins un houblon', 'error')
            return false
        }

        for (let index = 0; index < boilingSteps.length; index++) {
            const step = boilingSteps[index]

            if(step.ingredient.quantity === 0) {
                showSnackbar(`La quantité pour l'ingrédient ${ingrEx.find((ingredient) => ingredient.id === step.ingredient.ingredientID)?.name} ne peut pas être égale à 0.`, 'error')
                return false
            }

            if(step.duration === 0) {
                showSnackbar(`La durée d'ébulittion de l'ingrédient ${ingrEx.find((ingredient) => ingredient.id === step.ingredient.ingredientID)?.name} ne peut pas être égale à 0.`, 'error')
                return false
            }

            if(index >= 1 && step.whenToAdd < boilingSteps[index-1].whenToAdd && !step.postBoiling) {
                showSnackbar(`Le moment d'ajout de l'ingrédient ${ingrEx.find((ingredient) => ingredient.id === step.ingredient.ingredientID)?.name} ne peut pas être inférieur au précécent.`, 'error')
                return false
            }
        }

        return true
    }

    const handleNext = () => {

        if(checkIfFormComplete()) {
            return true
        } else {
            return false
        }
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

        const updatedOldSteps = filteredSteps.map((step) => ({
            ...step,
            postBoiling: false,
        }))

        return [...updatedOldSteps, ...newSteps]
        })
    }, [allIngredients])

    return (
        <>
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
                bgcolor: "#FFFCF2",
                p: {
                    xs: 3,
                    md: 6
                }
            }}
            >
            <Box sx={{ mb: 2, width: "100%", display: "flex", justifyContent: "center" }}>
                <Typography variant="h4" fontSize={22}>
                Ebullition
                </Typography>
            </Box>
            <Box sx={{ mb: 2, width: "100%", display: "flex", flexDirection: "column" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignContent: "center"
                    }}
                >
                    <Typography variant="h4" fontSize={22}>
                    Ingrédients
                    </Typography>
                    <Tooltip
                        placement="top"
                        arrow
                        enterTouchDelay={0}
                        title={boilingIngredientToolTipContent}
                    >
                        <IconButton size="small">
                            <InfoOutlineRounded color="action" />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box sx={{ display: "flex", width: "100%", my: 2, flexDirection: "column" }}>
                <SelectMultipleIngredients
                    title="Houblon(s)*"
                    allIngredients={allIngredients}
                    setAllIngredients={setAllIngredients}
                    options={ingrEx}
                    category="houblons"
                />
                <SelectMultipleIngredients
                    title="Sucre(s)"
                    allIngredients={allIngredients}
                    setAllIngredients={setAllIngredients}
                    options={ingrEx}
                    category="sucres"
                />
                <SelectMultipleIngredients
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
                        minHeight: "232px"
                    }}
                >
                    {boilingSteps.length > 0 ? (
                    <SortableList
                        items={boilingSteps}
                        onReorder={(newOrder) => {
                            const resetSteps = newOrder.map((step) => ({
                                ...step,
                                postBoiling: false
                            }))
                            setBoilingSteps(resetSteps)
                        }}
                        getItemId={(item) => item.id}
                        renderItem={(item, index) => (
                        <BoilingIngredientCard
                            ingredientName={getIngredientName(item.ingredient.ingredientID)}
                            ingredientMeasureUnit={getIngredientMeasureUnit(item.ingredient.ingredientID)}
                            quantity={item.ingredient.quantity}
                            postBoiling={item.postBoiling}
                            whenToAdd={item.whenToAdd}
                            duration={item.duration}
                            showPostBoilingStep={index === lastHoublonIndex}
                            onChange={(field, value) => {
                                setBoilingSteps((prev) => {
                                    const updated = [...prev]
                                    if (field === "quantity") {
                                        updated[index] = {
                                            ...updated[index],
                                            ingredient: {
                                                ...updated[index].ingredient,
                                                quantity: Number(value),
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
            <RecipeOptions handleNext={handleNext}/>
        </>
    )
}

export default RecipeFormBoiling
