import { Box, Grid, Input, Slider, Typography } from "@mui/material"
import React from "react"

type SliderProps = {
    name: string,
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>
}

const SliderRecipeBase: React.FC<SliderProps> = ({name, value, setValue}) => {

    const handleSliderChange = (event: Event, newValue: number) => {
        event.preventDefault()
        setValue(newValue)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? 0 : Number(event.target.value))
    }

    return (
        <Box>
            <Typography gutterBottom sx={{mb:0}}>
                {name}
            </Typography>
            <Grid container spacing={2} sx={{ alignItems: "center" }}>
                <Grid size="grow">
                    <Slider 
                        value={typeof value === 'number' ? value : 0}
                        defaultValue={0}
                        onChange={handleSliderChange}
                        sx={{
                            width: "250px"
                        }}
                    />
                </Grid>
                <Grid>
                    <Input
                        value={value}
                        size="small"
                        onChange={handleInputChange}
                        sx={{
                            maxWidth: "45px"
                        }}
                        inputProps={{
                            step: 1,
                            min: 0,
                            max: 100,
                            type: 'number'
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default SliderRecipeBase