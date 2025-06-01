import { CreateRecipe } from "../type/recipeObject"

export const beerStyles = ["Pils", "IPA", "NEIPA", "Pale Ale", "Stout", "Porter"]

export const recipeSteps = ['Profil', 'Empâtage', 'Ebullition', 'Fermentation', "Validation"]

export const mashoutStep = {
    temperature: 77,
    duration: 10,
    mashout: true
}

export const baseStateRecipe: CreateRecipe = {
  isRecipeDoneWriting: false,
  isInBlackList: false,
  profil: {
    recipeName: "",
    description: "",
    style: "Pils",
    ebc: [10, 56],
    ibu: [1, 40]
  },
  recipeIngredients: [],
  steps: {
    mashing: {
      multiStage: false,
      steps: [
        {
          temperature: 0,
          duration: 0,
          mashout: false
        }
      ]
    },
    boiling: [],
    fermenting: {
      totalDurationOfBaseFermenting: 0,
      steps: [
        {
          name: "primary",
          temperature: 0,
          duration: 0
        },
        {
          name: "secondary",
          temperature: 0,
          duration: 0
        },
        {
          name: "refermenting",
          temperature: 0,
          duration: 0
        }
      ]
    }
  }
}
