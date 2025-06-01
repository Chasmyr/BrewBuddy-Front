import { Box, FormControlLabel, IconButton, Switch, Tooltip, Typography } from "@mui/material"
import TempAndDuration from "./recipeFormComponents/TempAndDuration"
import SelectIngredient from "./recipeFormComponents/SelectIngredient"
import { IngredientType } from "../../type/ingredient"
import { useEffect, useState } from "react"
import { mashoutStep } from "../../utils/const"
import IngredientDetails from "./recipeFormComponents/IngredientDetails"
import RecipeOptions from "./recipeFormComponents/RecipeOptions"
import { useSnackbar } from "../../context/SnackbarContext"
import { InfoOutlineRounded } from "@mui/icons-material"
import { mashoutTooltipContent, multiPalierTooltipContent } from "../../utils/tooltipContent"
import { useDispatch, useSelector } from "react-redux"
import { setBeerIngredients, setBeerMashingSteps } from "../../store/recipeFormSlice"
import { RootState } from "../../store/store"
import { MashingSteps } from "../../type/recipeObject"



const RecipeFormMashing = () => {

    const [ingredientsMaltList, setIngredientsMaltList] = useState<IngredientType[]>([])
    const [malts, setMatls] = useState<IngredientType[]>([])
    const [mashingSteps, setMashingSteps] = useState<MashingSteps[]>([
        { temperature: 0, duration: 0, mashout: false }
    ])
    const [quantities, setQuantities] = useState<Record<number, number>>({})
    const [isMulti, setIsMulti] = useState<boolean>(false)
    const [isMashout, setIsMashout] = useState<boolean>(false)

    const { showSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const currentRecipe = useSelector((state: RootState) => state.recipeForm.recipe)
    const ingredients = useSelector((state: RootState) => state.ingredient.ingredients)

    const handleChangeSwitchMulti = () => {
        if(malts.length > 0) {
            setIsMulti(!isMulti)
        }
    }

    const handleChangeSwitchMashout = () => {
        if(malts.length > 0) {
            setIsMashout(!isMashout)
        }
    }

    const checkIfFormComplete = () => {

        if(malts.length === 0) {
            showSnackbar('Au moins un ingrédient est requis.', 'error')
            return false
        }

        if(Object.keys(quantities).length != malts.length) {
            showSnackbar(`Merci de renseigner la quantité pour chaque ingrédient.`, 'error')
            return false
        }

        Object.entries(quantities).forEach(([key, value]) => {
            const ingredientId = Number(key)
            if(value === 0) {
                showSnackbar(`La quantité pour l'ingrédient ${ingredients.find((ingredient) => ingredient.id === ingredientId)?.name} ne peut pas être égale à 0.`, 'error')
                return false
            }
        })
        
        for (let index = 0; index < mashingSteps.length; index++) {
            const step = mashingSteps[index];
        
            if (step.temperature === 0) {
                showSnackbar(`La température du palier ${index + 1} ne peut pas être égale à 0.`, 'error')
                return false
            }
        
            if (step.duration === 0) {
                showSnackbar(`La durée du palier ${index + 1} ne peut pas être égale à 0.`, 'error')
                return false
            }
        }

        return true
    }

    const handleNext = () => {

        if(checkIfFormComplete()) {
            // making the ingredient object for the recipe
            const maltsIngredientsData = [
                {
                    category: "malts",
                    ingredients: malts.map((malt) => ({
                        ingredientID: malt.id,
                        quantity: quantities[malt.id],
                        name: malt.name,
                        measureUnit: malt.measureUnit
                    }))
                }
            ]

            // making the steps object for the recipe
            let mashingStepsData = [...mashingSteps]
            
            if(isMashout) {
                mashingStepsData.push(mashoutStep)
            }
    
            let fullMashingStepObject = {
                steps: mashingStepsData,
                multiStage: isMulti
            }

            dispatch(setBeerIngredients(maltsIngredientsData))
            dispatch(setBeerMashingSteps(fullMashingStepObject))
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        if(malts.length === 0) {
            setIsMashout(false)
            setIsMulti(false)
        }
    }, [malts])

    useEffect(() => {
        if (isMulti) {
            setMashingSteps((prev) => {
                const normalSteps = prev.filter(step => !step.mashout)
                const mashoutStep = prev.find(step => step.mashout)

                while (normalSteps.length < 3) {
                    normalSteps.push({ temperature: 0, duration: 0, mashout: false })
                }
                const baseSteps = normalSteps.slice(0, 3)

                if(mashoutStep) {
                    return [...baseSteps, mashoutStep]
                }

                return baseSteps
            })
        } else {
            setMashingSteps((prev) => prev.slice(0, 1))
        }
    }, [isMulti])

    useEffect(() => {

        if(currentRecipe.recipeIngredients.length > 0 && currentRecipe.recipeIngredients.some((category) => category.category === "malts" )) {
            currentRecipe.recipeIngredients.filter((cat) => cat.category === "malts").forEach(maltCategory => {
                let maltsFromStore: IngredientType[] = []
                let quantitiesFromStore: Record<number, number> = {}
                maltCategory.ingredients.map((ingredient) => {
                    const ingredientFromDatabase = ingredients.filter((ingr) => ingr.id === ingredient.ingredientID)
                    quantitiesFromStore[ingredient.ingredientID] = ingredient.quantity
                    maltsFromStore.push(ingredientFromDatabase[0])
                })
                setMatls(maltsFromStore)
                setQuantities(quantitiesFromStore)
            })
        }

        if(currentRecipe.steps.mashing.steps != mashingSteps) {
            let mashoutStepFromStore = currentRecipe.steps.mashing.steps.filter((step) => step === mashoutStep)
            if(mashoutStepFromStore.length > 0) {
                setIsMashout(true)
                if(currentRecipe.steps.mashing.multiStage) {
                    setIsMulti(true)
                } else {
                    setIsMulti(false)
                }
            }
            setMashingSteps(currentRecipe.steps.mashing.steps)
        }

    }, [currentRecipe])

    useEffect(() => {
        if(ingredients.length > 0) {
            setIngredientsMaltList(ingredients.filter((ingredient) => ingredient.category === "malts"))
        }
    }, [])

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexDirection: "column",
                    width: {
                        md: "calc(100% - 96px)",
                        sm: "calc(100% - 48px)"
                    },
                    bgcolor: "#FFFBF2",
                    p: {
                        xs: 3,
                        md: 6
                    },
                }}
            >
                <Box
                    sx={{
                        mb: 4,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Typography
                        variant="h3"
                        fontSize={{
                            xs: 20,
                            sm: 22
                        }}
                    >
                        Empâtage
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
                        fontSize={{
                            xs: 18,
                            sm: 20
                        }}
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
                        <SelectIngredient name="Malt(s) *" value={malts} setValue={setMatls} options={ingredientsMaltList} />
                        <IngredientDetails 
                            ingredients={malts}
                            minHeightUnder="60px"
                            quantities={quantities}
                            onQuantityChange={(id: number, quantity: number) => {{
                                setQuantities((prev) => ({
                                    ...prev,
                                    [id]: quantity
                                }))
                            }}}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        mb: 2,
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: {
                            xs: "flex-start",
                            sm: "center"
                        },
                        flexDirection: {
                            xs: "column",
                            sm: "row"
                        }
                    }}
                >
                    <Typography
                        variant="h4"
                        fontSize={{
                            xs: 18,
                            sm: 20
                        }}
                        sx={{
                            mb: {
                                xs: 2,
                                sm: 0
                            }
                        }}
                    >
                        Palier
                    </Typography>
                    <Box>
                        <>
                            <FormControlLabel 
                                sx={{
                                    mr: 0,
                                    '& .MuiFormControlLabel-label': {
                                        fontSize: {
                                            xs: "14px",
                                            sm: "16px"
                                        },
                                    }
                                }}
                                control={
                                    <Switch
                                        checked={isMashout}
                                        onChange={handleChangeSwitchMashout}
                                    />
                                }
                                label="Mash-out"
                            />
                            <Tooltip
                                sx={{mr: 2}}
                                placement="top"
                                arrow
                                enterTouchDelay={0}
                                title={mashoutTooltipContent}
                            >
                                <IconButton size="small">
                                    <InfoOutlineRounded color="action" />
                                </IconButton>
                            </Tooltip>
                        </>
                        <>
                            <FormControlLabel 
                                sx={{
                                    mr: 0,
                                    '& .MuiFormControlLabel-label': {
                                        fontSize: {
                                            xs: "14px",
                                            sm: "16px"
                                        },
                                    }
                                }}
                                control={
                                    <Switch
                                        checked={isMulti}
                                        onChange={handleChangeSwitchMulti}
                                    />
                                }
                                label="Multi-palier"
                            />
                            <Tooltip
                                placement="top"
                                arrow
                                enterTouchDelay={0}
                                title={multiPalierTooltipContent}
                            >
                                <IconButton size="small">
                                    <InfoOutlineRounded color="action" />
                                </IconButton>
                            </Tooltip>
                        </>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignContent: "center",
                        flexDirection: "column",
                        mt:2,
                        mb: 8,
                        width: "100%"
                    }}
                >
                    {malts.length === 0 ?
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}
                            >
                                <Typography color="text.disabled" sx={{ fontStyle: 'italic', mt: 5 }}>Veuillez sélectionner au moins un ingrédient.</Typography>
                            </Box>
                        :
                            isMulti ?
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "100%",
                                        justifyContent: "center",
                                        alignContent: "center",
                                        gap: 2
                                    }}
                                >
                                    <TempAndDuration title="Palier 1" setTemperatureAndDuration={setMashingSteps} temperatureAndDuration={mashingSteps} index={0} isFermenting={false}/>
                                    <TempAndDuration title="Palier 2" setTemperatureAndDuration={setMashingSteps} temperatureAndDuration={mashingSteps} index={1} isFermenting={false}/>
                                    <TempAndDuration title="Palier 3" setTemperatureAndDuration={setMashingSteps} temperatureAndDuration={mashingSteps} index={2} isFermenting={false}/>
                                </Box>
                            :
                                <TempAndDuration title="Palier" setTemperatureAndDuration={setMashingSteps} temperatureAndDuration={mashingSteps} index={0} isFermenting={false}/>
                    }
                </Box>
            </Box>
            <RecipeOptions handleNext={handleNext} />
        </>
    )
}

export default RecipeFormMashing