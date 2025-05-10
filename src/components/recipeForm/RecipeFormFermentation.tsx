import { InfoOutlineRounded } from "@mui/icons-material"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import { fermentationIngredientToolTipContent } from "../../utils/tooltipContent"
import SelectMultipleIngredients from "./recipeFormComponents/SelectMultipeIngredients"
import { useEffect, useState } from "react"
import TempAndDuration from "./recipeFormComponents/TempAndDuration"
import { FermentingSteps, SelectedIngredient } from "../../type/recipeObject"
import { useSnackbar } from "../../context/SnackbarContext"
import RecipeOptions from "./recipeFormComponents/RecipeOptions"
import { IngredientType } from "../../type/ingredient"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { setBeerFermentingSteps, setBeerIngredientsFermenting,  } from "../../store/recipeFormSlice"
import { transformAllIngredientsIntoDesiredObjectFermentation } from "../../utils/dataTransformRecipe"

const RecipeFormFermentation = () => {

    const [ingredientsLevuresList, setIngredientsLevuresList] = useState<IngredientType[]>([])
    const [ingredientsSucresList, setIngredientsSucresList] = useState<IngredientType[]>([])
    const [ingredientsHoublonsList, setIngredientsHoublonsList] = useState<IngredientType[]>([])
    const [allIngredients, setAllIngredients] = useState<SelectedIngredient[]>([])
    const [fermentingSteps, setFermentingSteps] = useState<FermentingSteps[] | any>([])

    const { showSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const ingredients = useSelector((state: RootState) => state.ingredient.ingredients)
    const currentRecipe = useSelector((state: RootState) => state.recipeForm.recipe)

    const checkIfFormComplete = () => {

        if(allIngredients.length === 0) {
            showSnackbar("Au moins un ingrédient est requis.", 'error')
            return false
        }

        if(allIngredients.filter((ingredient) => ingredient.ingredient.category === "levures").length === 0) {
            showSnackbar("Au moins une levure est requise.", 'error')
            return false
        }

        if(allIngredients.filter((ingredient) => ingredient.ingredient.category === "sucres").length === 0) {
            showSnackbar("Au moins un sucre est requis.", 'error')
            return false
        }

        if(fermentingSteps.length === 0) {
            showSnackbar("Merci de renseigner les valeurs des différentes fermentations.", 'error')
            return false
        }

        for (let index = 0; index < fermentingSteps.length; index++) {
            const step = fermentingSteps[index]

            if(step === undefined) {
                showSnackbar(`Merci de renseigner les valeurs de toutes les fermentations`, 'error')
                return false
            }
            let fermentationName

            if (step.name === "primary") {
                fermentationName = "Primaire"
            } else if (step.name === "secondary") {
                fermentationName = "Secondaire"
            } else if (step.name === "refermenting") {
                fermentationName = "Refermentation"
            }

            if(step.duration === 0) {
                showSnackbar(`La durée de la fermentation ${fermentationName} ne peut pas être égale à 0.`, 'error')
                return false
            }

            if(step.temperature === 0) {
                showSnackbar(`La température de la fermentation ${fermentationName} ne peut pas être égale à 0.`, 'error')
                return false
            }
        }
        

        if(fermentingSteps.length != 3) {
            showSnackbar("Merci de renseigner les valeurs des différentes fermentations.", 'error')
            return false
        }

        return true
    }

    const handleNext = () => { 
        if(checkIfFormComplete()) {
            dispatch(setBeerFermentingSteps(fermentingSteps))
            dispatch(setBeerIngredientsFermenting(transformAllIngredientsIntoDesiredObjectFermentation(allIngredients)))
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        if(ingredients.length > 0) {
            setIngredientsLevuresList(ingredients.filter((ingredient) => ingredient.category === "levures"))
            setIngredientsSucresList(ingredients.filter((ingredient) => ingredient.category === "sucres"))
            setIngredientsHoublonsList(ingredients.filter((ingredient) => ingredient.category === "houblons"))
        }

        if(currentRecipe.steps.fermenting.steps.length > 0) {
            setFermentingSteps(currentRecipe.steps.fermenting.steps)
        }

        if(currentRecipe.recipeIngredients.length > 0) {
            let allIngredientsFromStore: SelectedIngredient[] = []
            currentRecipe.recipeIngredients.map((ingredientCategory) => {
                ingredientCategory.ingredients.map((ingredient) => {

                    if(ingredientCategory.category === "levures") {
                        const foundIngredient = ingredients.find((ingredientToFind) => ingredientToFind.id === ingredient.ingredientID)

                        if(foundIngredient) {
                            allIngredientsFromStore.push({id: ingredient.uuid || "", ingredient: foundIngredient})
                        }
                    }

                    if(ingredientCategory.category === "houblons" || ingredientCategory.category === "sucres") {

                        if(ingredient.dryHoping || ingredient.sugar) {
                            const foundIngredient = ingredients.find((ingredientToFind) => ingredientToFind.id === ingredient.ingredientID)
    
                            if(foundIngredient) {
                                allIngredientsFromStore.push({id: ingredient.uuid || "", ingredient: foundIngredient})
                            }
                        }
                    }
                })
            })
            setAllIngredients(allIngredientsFromStore)
        }
    }, [])

    return (
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
                },
            }}
        >
            <Box sx={{ mb: 2, width: "100%", display: "flex", justifyContent: "center" }}>
                <Typography variant="h3"
                    fontSize={{
                        xs: 20,
                        sm: 22
                    }}
                >
                Fermentation
                </Typography>
            </Box>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
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
                        title={fermentationIngredientToolTipContent}
                    >
                        <IconButton size="small">
                            <InfoOutlineRounded color="action" />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box sx={{ display: "flex", width: "100%", my: 2, flexDirection: "column" }}>
                    <SelectMultipleIngredients
                        title="Levure(s)*"
                        allIngredients={allIngredients}
                        setAllIngredients={setAllIngredients}
                        options={ingredientsLevuresList}
                        category="levures"
                    />
                    <SelectMultipleIngredients
                        title="Sucre(s)*"
                        allIngredients={allIngredients}
                        setAllIngredients={setAllIngredients}
                        options={ingredientsSucresList}
                        category="sucres"
                    />
                    <SelectMultipleIngredients
                        title="Houblon(s)"
                        allIngredients={allIngredients}
                        setAllIngredients={setAllIngredients}
                        options={ingredientsHoublonsList}
                        category="houblons"
                    />
                </Box>
            </Box>
            <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignContent: "center",
                        flexDirection: "column",
                        mb: 4
                    }}
            >
                <Typography
                sx={{
                    mb:2
                }}
                    variant="h4"
                    fontSize={22}
                >
                    Fermentation
                </Typography>
                {allIngredients.length === 0 ?
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignContent: "center",
                                flexDirection: "column",
                                minHeight: "214px"
                            }}
                        >
                            <Typography color="text.disabled" sx={{ fontStyle: 'italic', my: 5, textAlign: "center" }}>Veuillez sélectionner au moins un ingrédient.</Typography>
                        </Box>
                    :
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
                            <TempAndDuration 
                                title="Primaire" 
                                setTemperatureAndDuration={setFermentingSteps} 
                                temperatureAndDuration={fermentingSteps} 
                                index={0}
                                isFermenting={true}
                            />
                            <TempAndDuration 
                                title="Secondaire"
                                setTemperatureAndDuration={setFermentingSteps}
                                temperatureAndDuration={fermentingSteps}
                                index={1}
                                isFermenting={true}
                            />
                            <TempAndDuration 
                                title="Refermentation"
                                setTemperatureAndDuration={setFermentingSteps}
                                temperatureAndDuration={fermentingSteps}
                                index={2}
                                isFermenting={true}
                            />
                        </Box> 
                }
            </Box>
            <RecipeOptions handleNext={handleNext} />
        </Box>
    )
}

export default RecipeFormFermentation