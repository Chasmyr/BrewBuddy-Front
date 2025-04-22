import { Box, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material"
import { beerStyles } from "../../utils/const"
import SliderRecipeBase from "./SliderRecipeBase"
import { useState } from "react"

const RecipeFormBase = () => {

    const [amertumeValue, setAmertumeValue] = useState(30)
    const [ebcValue, setEbcValue] = useState(42)

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "column",
                width: "100%",
                bgcolor: "#FFFCF2",
                p: 6,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4
            }}
        >   
            <Box
                sx={{
                    mb: 4,
                    width: "100%"
                }}
            >
                <Typography
                    variant="h4"
                    fontSize={26}
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
                        label="nom"
                        required
                        fullWidth
                        sx={{
                            maxWidth: "300px"
                        }}
                    />
                    <SliderRecipeBase name="EBC" value={ebcValue} setValue={setEbcValue} />
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
                    <SliderRecipeBase name="Amertume" value={amertumeValue} setValue={setAmertumeValue} />
                </Box>
            </Box>
        </Box>
    )
}

export default RecipeFormBase