import { BoilingStepCurrent } from "../components/recipeForm/RecipeFormBoiling"
import { RecipeIngredientList, RecipeIngredientType, SelectedIngredient } from "../type/recipeObject"

export const removeId = (objectWithId: any[]): any[] => {
    let newArrayWithoutIdInIt: any[] = []
    objectWithId.map((obj) => {
        if(obj.id) {
            const {id, ...objectWithoutId} = obj
            newArrayWithoutIdInIt.push(objectWithoutId)
        }
    })
    return newArrayWithoutIdInIt
}

export const transformAllIngredientsIntoDesiredObject = (selectedIngredients: SelectedIngredient[], boilingSteps: BoilingStepCurrent[]): RecipeIngredientList[] => {
    const selectedMap = new Map<string, SelectedIngredient>()
    selectedIngredients.forEach((sel) => selectedMap.set(sel.id, sel))

    const groupedMap = new Map<string, RecipeIngredientType[]>()

    // Parcours dans l'ordre des boilingSteps
    boilingSteps.forEach((step) => {
        const selected = selectedMap.get(step.id)
        if (!selected) return // sécurité si incohérence

        const category = selected.ingredient.category
        const quantity = step.ingredient.quantity ?? null

        const ingredient: RecipeIngredientType = {
            uuid: selected.id,
            ingredientID: selected.ingredient.id,
            name: selected.ingredient.name,
            measureUnit: selected.ingredient.measureUnit,
            quantity
        }

        if (category === 'houblons') {
        ingredient.dryHoping = step.postBoiling === true
        }

        if (!groupedMap.has(category)) {
        groupedMap.set(category, [])
        }

        groupedMap.get(category)?.push(ingredient)
    })

    // Convertir en tableau
    return Array.from(groupedMap.entries()).map(([category, ingredients]) => ({
        category,
        ingredients
    }))
}