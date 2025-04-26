import { Box, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material"
import { beerStyles } from "../../utils/const"
import SliderRecipeBase from "./SliderRecipeBase"
import { useState } from "react"

const RecipeFormBase = () => {

    const [amertumeValue, setAmertumeValue] = useState<number[]>([1, 40])
    const [ebcValue, setEbcValue] = useState<number[]>([10, 56])

    return (
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
                        defaultValue="Pils"
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
    )
}

export default RecipeFormBase