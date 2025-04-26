import { Box, Typography } from "@mui/material"
import SelectIngredient from "./SelectIngredient"
import IngredientDetails from "./IngredientDetails"
import { useEffect, useState } from "react"
import { IngredientType } from "../../type/ingredient"
import { ingrEx } from "../../utils/const"
import { SortableList } from "./SortableList"
import { BoilingStep } from "../../type/recipeObject"
import BoilingStepItem from "./BoilingStepItem"

const RecipeFormBoiling = () =>{

    const [houblons, setHoublons] = useState<IngredientType[]>([])
    const [houblonsQuantities, setHoublonsQuantities] = useState<Record<number, number>>({})
    const [divers, setDivers] = useState<IngredientType[]>([])
    const [diversQuantities, setDiversQuantities] = useState<Record<number, number>>({})
    const [sucres, setSucres] = useState<IngredientType[]>([])
    const [sucresQuantities, setSucresQuantities] = useState<Record<number, number>>({})
    const [boilingSteps, setBoilingSteps] = useState<BoilingStep[]>([])
    const [allIngredients, setAllIngredients] = useState<IngredientType[]>([])

    // TODO => dispatch
    // TODO => ajouter validation du forme
    // TODO => calculer la durée total d'ébulition et ajouter la valeur au dry hoping
    // TODO => connecter la base
    // TODO => pouvoir utiliser plusieurs fois le même houblons

    useEffect(() => {
        const allUsedIngredients = [...houblons, ...divers, ...sucres]
        setAllIngredients(allUsedIngredients)

        const allQuantities = {
            ...houblonsQuantities,
            ...diversQuantities,
            ...sucresQuantities,
        }

         setBoilingSteps((prevSteps) => {
            // 1. Nettoyage + mise à jour des steps existants
            let updatedSteps = prevSteps
                .filter((step) => {
                    const ingredientStillExists = allUsedIngredients.some((ingredient) => ingredient.id === step.ingredient.ingredientID)
                    const quantity = allQuantities[step.ingredient.ingredientID]
                    return ingredientStillExists && quantity > 0
                })
                .map((step) => {
                    const ingredientInfo = allUsedIngredients.find((ing) => ing.id === step.ingredient.ingredientID)
                    return {
                        ...step,
                        ingredient: {
                            quantity: allQuantities[step.ingredient.ingredientID] || 0,
                            ingredientID: step.ingredient.ingredientID,
                            name: ingredientInfo?.name || step.ingredient.name,
                        },
                        postBoiling: step.postBoiling ?? false,
                    }
                 })

            // 2. Ajouter les nouveaux ingrédients qui n'ont pas encore de step
            const existingIngredientIDs = updatedSteps.map((step) => step.ingredient.ingredientID)

             const newSteps = allUsedIngredients
                .filter((ingredient) => {
                    const quantity =
                        houblonsQuantities[ingredient.id] ||
                        diversQuantities[ingredient.id] ||
                        sucresQuantities[ingredient.id] || 0
                    return quantity > 0 && !existingIngredientIDs.includes(ingredient.id)
                })
                .map((ingredient) => ({
                    whenToAdd: 0,
                    duration: 0,
                    postBoiling: false,
                    ingredient: {
                        quantity:
                            houblonsQuantities[ingredient.id] ||
                            diversQuantities[ingredient.id] ||
                            sucresQuantities[ingredient.id],
                        ingredientID: ingredient.id,
                        name: ingredient.name,
                    },
                }))

            return [...updatedSteps, ...newSteps]
        })
    }, [houblonsQuantities, diversQuantities, sucresQuantities, houblons, divers, sucres])


    const lastHoublonIndex = boilingSteps
        .map((step, index) => ({ step, index }))
        .filter(({ step }) => allIngredients.find((ing) => ing.id === step.ingredient.ingredientID)?.category === "houblons")
        .map(({ index }) => index)
        .pop()

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
                    justifyContent: "center"
                }}
            >
                <Typography
                    variant="h4"
                    fontSize={22}
                >
                    Ebullition
                </Typography>
            </Box>
            <Box
                sx={{
                    mb: 2,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Typography
                    variant="h4"
                    fontSize={22}
                >
                    Ingrédients
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        my:2,
                        flexDirection: "column"
                    }}
                >
                    <SelectIngredient name="Houblons *" value={houblons} setValue={setHoublons} options={ingrEx} />
                    <IngredientDetails 
                        needQuantity={true}
                        minHeightUnder="auto"
                        ingredients={houblons}
                        onQuantityChange={(id: number, quantity: number) => {{
                            setHoublonsQuantities((prev) => ({
                                ...prev,
                                [id]: quantity
                            }))
                        }}}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        my:2,
                        flexDirection: "column"
                    }}
                >
                    <SelectIngredient name="Divers (optionnel)" value={divers} setValue={setDivers} options={ingrEx} />
                    <IngredientDetails 
                        needQuantity={true} 
                        minHeightUnder="auto"
                        ingredients={divers}
                        onQuantityChange={(id: number, quantity: number) => {{
                            setDiversQuantities((prev) => ({
                                ...prev,
                                [id]: quantity
                            }))
                        }}}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        my:2,
                        flexDirection: "column"
                    }}
                >
                    <SelectIngredient name="Sucres (optionnel)" value={sucres} setValue={setSucres} options={ingrEx} />
                    <IngredientDetails 
                        needQuantity={true} 
                        ingredients={sucres}
                        minHeightUnder="auto"
                        onQuantityChange={(id: number, quantity: number) => {{
                            setSucresQuantities((prev) => ({
                                ...prev,
                                [id]: quantity
                            }))
                        }}}
                    />
                </Box>
                <Box
                    sx={{
                        mb: 2,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <Typography
                        variant="h4"
                        fontSize={22}
                    >
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
                            mt: 2
                        }}
                    >   
                        {boilingSteps.length > 0 ?
                            <SortableList
                                items={boilingSteps}
                                onReorder={setBoilingSteps}
                                getItemId={(item) => item.ingredient.ingredientID.toString()}
                                renderItem={(item, index) => {
                                    
                                    const isLastHoublon = index === lastHoublonIndex

                                    return (
                                        <BoilingStepItem
                                            ingredientName={item.ingredient.name}
                                            whenToAdd={item.whenToAdd}
                                            duration={item.duration}
                                            postBoiling={item.postBoiling ?? false}
                                            showPostBoilingCheckbox={isLastHoublon}
                                            onChange={(field, value) => {
                                                setBoilingSteps((steps) => {
                                                    const updated = [...steps]
                                                    updated[index] = {
                                                        ...updated[index],
                                                        [field]: value
                                                    }
                                                    return updated
                                                })
                                            }}
                                        />
                                    )
                                }}
                            />
                        :
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            <Typography color="text.disabled" sx={{ fontStyle: 'italic', mt: 10 }}>Veuillez sélectionner au moins un ingrédient.</Typography>
                        </Box>
                        }
                        
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default RecipeFormBoiling