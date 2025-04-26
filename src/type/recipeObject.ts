export type TemperatureAndDuration = {
    temperature: number,
    duration: number
}

export type BoilingStep = {
    whenToAdd: number,
    duration: number,
    postBoiling?: boolean,
    ingredient: {
        quantity: number,
        ingredientID: number,
        name: string
    }
}