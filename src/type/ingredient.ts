export type IngredientType = {
    id: number,
    name: string,
    measureUnit: string,
    dosage: string | null,
    category: string
}

export interface IngredientWithQuantity extends IngredientType {
    quantity: number
}