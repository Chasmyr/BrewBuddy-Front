import { IngredientType } from "./ingredient"

export type BeerProfil = {
    recipeName: string,
    description: string,
    style: string,
    ebc: number[],
    ibu: number[]
}

export type RecipeIngredientType = {
    ingredientID: number,
    quantity: number,
    name: string,
    measureUnit: string,
    dryHoping?: boolean,
    uuid?: string
}

export type RecipeIngredientList = {
    category: string,
    ingredients: RecipeIngredientType[]
}

export type TemperatureAndDuration = {
    temperature: number,
    duration: number
}

export interface MashingSteps extends TemperatureAndDuration {
    mashout?: boolean
}

export type Mashing = {
    multiStage: boolean,
    steps: MashingSteps[]
}


export interface FermentingSteps extends TemperatureAndDuration {
    name: string
}

export type BoilingStep = {
    id?: string
    whenToAdd: number
    duration: number
    postBoiling?: boolean
    ingredient: {
        quantity: number
        ingredientID: number
    }
}

export type CreateRecipe = {
    isRecipeDoneWriting: boolean,
    isInBlackList: boolean,
    profil: BeerProfil,
    recipeIngredients: RecipeIngredientList[],
    steps: {
        mashing: Mashing,
        boiling: BoilingStep[],
        fermenting: {
            totalDurationOfBaseFermenting: number,
            steps: FermentingSteps[]
        }
    }
}

export type SelectedIngredient = {
    id: string // UUID unique par sélection d'ingrédient
    ingredient: IngredientType
}