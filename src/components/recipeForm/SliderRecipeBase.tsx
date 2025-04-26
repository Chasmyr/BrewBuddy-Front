import { Box, Grid, Slider, Typography } from "@mui/material"
import React from "react"

type SliderProps = {
    name: string,
    value: number[],
    setValue: React.Dispatch<React.SetStateAction<number[]>>,
    max: number
}

const SliderRecipeBase: React.FC<SliderProps> = ({name, value, setValue, max}) => {

    const handleChange = (event: Event, newValue: number | number[]) => {
        event.preventDefault()
        setValue(newValue as [number, number])
    }

    return (
        <Box>
            <Typography gutterBottom sx={{mb:0}}>
                {name}
            </Typography>
            <Grid container spacing={2} sx={{ alignItems: "center" }}>
                <Grid size="grow">
                    <Slider 
                        value={value}
                        defaultValue={0}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        min={1}
                        max={max}
                        sx={{
                            width: "250px"
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default SliderRecipeBase