import { Box, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { beerStyles } from "../../utils/const"
import SliderRecipeBase from "./SliderRecipeBase"
import { ChangeEvent, useState } from "react"
import RecipeOptions from "./RecipeOptions"
import { useSnackbar } from "../../context/SnackbarContext"

const RecipeFormBase = () => {

    const [amertumeValue, setAmertumeValue] = useState<number[]>([1, 40])
    const [ebcValue, setEbcValue] = useState<number[]>([10, 56])
    const [beerName, setBeerName] = useState<string>("")
    const [beerStyle, setBeerStyle] = useState<string>("Pils")

    const { showSnackbar } = useSnackbar()

    const handleBeerName = (e: ChangeEvent<HTMLInputElement>) => {
        setBeerName(e.target.value)
    }

    const handleBeerStyle = (e: SelectChangeEvent<string>) => {
        setBeerStyle(e.target.value)
    }

    const checkIfFormComplete = () => {

        if(!beerName) {
            showSnackbar('Le nom de la recette est requis.', 'error')
            return false
        }

        return true
    }

    const handleNext = () => {
        const beerProfil = {
            description: "",
            ebc: ebcValue[1],
            ibu: amertumeValue[1],
            style: beerStyle,
            recipeName: beerName
        }

        return checkIfFormComplete()
    }

    return (
        <>
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
                        mb: 4,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Typography
                        variant="h3"
                        fontSize={22}
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
                            flexDirection: "row",
                            justifyContent: "space-between",
                            mb:2
                        }}
                    >
                        <TextField
                            label="Nom de la bière"
                            required
                            fullWidth
                            value={beerName}
                            onChange={handleBeerName}
                            sx={{
                                maxWidth: "300px"
                            }}
                        />
                        <SliderRecipeBase name="EBC" value={ebcValue} setValue={setEbcValue} max={140} />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}
                    >
                        <Select
                            id="beerStyle"
                            label="Style"
                            fullWidth
                            sx={{
                                maxWidth: "300px"
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
                        <SliderRecipeBase name="IBU" value={amertumeValue} setValue={setAmertumeValue} max={150} />
                    </Box>
                </Box>
            </Box>
            <RecipeOptions handleNext={handleNext} />
        </>
    )
}

export default RecipeFormBase