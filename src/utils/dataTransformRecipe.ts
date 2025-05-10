import { BoilingStep, RecipeIngredientList, RecipeIngredientType, SelectedIngredient } from "../type/recipeObject"

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

export const transformAllIngredientsIntoDesiredObjectBoiling = (selectedIngredients: SelectedIngredient[], boilingSteps: BoilingStep[]): RecipeIngredientList[] => {
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
            ingredient.dryHoping = false
        }

        if (category === 'sucres') {
            ingredient.sugar = false
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

export const transformAllIngredientsIntoDesiredObjectFermentation = (selectedIngredients: SelectedIngredient[]): RecipeIngredientList[] => {
    const groupedMap = new Map<string, RecipeIngredientType[]>()

    selectedIngredients.forEach((sel) => {
        const {id: uuid, ingredient} = sel
        const {
            id: ingredientID,
            name,
            measureUnit,
            category
        } = ingredient

        const item: RecipeIngredientType = {
            uuid,
            ingredientID,
            name,
            measureUnit,
            quantity: 0
        }

        if(category == "houblons") {
            item.dryHoping = true
        }

        if(category == "sucres") {
            item.sugar = true
        }

        if (!groupedMap.has(category)) {
            groupedMap.set(category, [])
        }

        groupedMap.get(category)?.push(item)
    })

    return Array.from(groupedMap.entries()).map(([category, ingredients]) => ({
        category,
        ingredients
    }))
}
