import { Box, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { beerStyles } from "../../utils/const"
import SliderRecipeBase from "./recipeFormComponents/SliderRecipeBase"
import { ChangeEvent, useState } from "react"
import RecipeOptions from "./recipeFormComponents/RecipeOptions"
import { useSnackbar } from "../../context/SnackbarContext"
import { ebcTooltipContent, ibuTooltipContent } from "../../utils/tooltipContent"

const RecipeFormBase = () => {

    const [amertumeValue, setAmertumeValue] = useState<number[]>([1, 40])
    const [ebcValue, setEbcValue] = useState<number[]>([10, 56])
    const [beerName, setBeerName] = useState<string>("")
    const [beerStyle, setBeerStyle] = useState<string>("Pils")
    const [beerDescription, setBeerDescription] = useState<string>("")

    const { showSnackbar } = useSnackbar()

    const handleBeerName = (e: ChangeEvent<HTMLInputElement>) => {
        setBeerName(e.target.value)
    }

    const handleBeerStyle = (e: SelectChangeEvent<string>) => {
        setBeerStyle(e.target.value)
    }

    const handleBeerDescription = (e: ChangeEvent<HTMLInputElement>) => {
        setBeerDescription(e.target.value)
    }

    const checkIfFormComplete = () => {

        if(!beerName) {
            showSnackbar('Le nom de la recette est requis.', 'error')
            return false
        }

        if(!beerDescription) {
            showSnackbar('La description de la recette est requise.', 'error')
            return false
        }

        return true
    }

    const handleNext = () => {

        if(checkIfFormComplete()) {
            // TODO : modifier ebc ibu en back pour prendre l'array
            // const beerProfil = {
            //     description: beerDescription,
            //     ebc: ebcValue[1],
            //     ibu: amertumeValue[1],
            //     style: beerStyle,
            //     recipeName: beerName
            // }
    
            // TODO => dispatch
            return true
        } else {
            return false
        }
    }

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
                        Profil de la bière
                    </Typography>
                </Box>
                <Box
                    component="form"
                >   
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: {
                                xs: "column",
                                sm: "row"
                            }
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: {
                                    xs: "center",
                                    sm: "flex-start"
                                },
                                width: "100%"
                            }}
                        >
                            <TextField
                                label="Nom de la bière"
                                required
                                fullWidth
                                value={beerName}
                                onChange={handleBeerName}
                                sx={{
                                    maxWidth: {
                                        xs: "100%",
                                        sm: "300px"
                                    },
                                    mt: 2,
                                    width: "100%"
                                }}
                            />
                            <Select
                                id="beerStyle"
                                label="Style"
                                fullWidth
                                sx={{
                                    maxWidth: {
                                        xs: "100%",
                                        sm: "300px"
                                    },
                                    mt: {
                                        xs: 3,
                                        sm: 2
                                    },
                                    width: "100%"
                                }}
                                value={beerStyle}
                                onChange={handleBeerStyle}
                                input={<OutlinedInput label="beerStyle" notched={false} />}
                            >
                                {
                                    beerStyles.map((beerStyle) => {
                                        return (
                                            <MenuItem 
                                                value={beerStyle}
                                            >
                                                {beerStyle}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: {
                                    xs: "flex-end",
                                    lg: "flex-start"
                                },
                                width: "100%",
                                mt: {
                                    xs: 4,
                                    sm: 0
                                }
                            }}
                        >
                            <SliderRecipeBase name="EBC" value={ebcValue} setValue={setEbcValue} max={140} tooltipContent={ebcTooltipContent} />
                            <SliderRecipeBase name="IBU" value={amertumeValue} setValue={setAmertumeValue} max={150} tooltipContent={ibuTooltipContent} />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            mt:3,
                            mb: 4
                        }}
                    >
                        <TextField 
                            fullWidth
                            value={beerDescription}
                            onChange={handleBeerDescription}
                            id="beer-desc"
                            placeholder="Description..."
                            multiline
                            rows={3}
                        />
                    </Box>
                </Box>
            </Box>
            <RecipeOptions handleNext={handleNext} />
        </>
    )
}

export default RecipeFormBase