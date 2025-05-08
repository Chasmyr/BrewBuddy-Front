import { InfoOutlineRounded } from "@mui/icons-material"
import { Box, Grid, IconButton, Slider, Tooltip, Typography } from "@mui/material"
import React from "react"

type SliderProps = {
    name: string,
    value: number[],
    setValue: React.Dispatch<React.SetStateAction<number[]>>,
    max: number,
    tooltipContent: string
}

const SliderRecipeBase: React.FC<SliderProps> = ({name, value, setValue, max, tooltipContent}) => {

    const handleChange = (event: Event, newValue: number | number[]) => {
        event.preventDefault()
        setValue(newValue as [number, number])
    }

    return (
        <Box
            sx={{
                px: {
                    xs: 1,
                    sm: 0
                },
                maxWidth: {
                    xs: "98%",
                    sm: "250px"
                },
                width: "100%"
            }}
        >
            <Box
                sx={{
                    width: {
                        xs: "100%",
                        sm: "230px",
                        md: "260px",
                        lg: "300px",
                        xl: "400px"
                    },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography gutterBottom sx={{mb:0}} fontSize={{xs: 15, sm: 16}}>
                    {name}
                </Typography>
                <Tooltip
                    placement="top"
                    arrow
                    enterTouchDelay={0}
                    title={tooltipContent}
                >
                    <IconButton size="small">
                        <InfoOutlineRounded color="action" />
                    </IconButton>
                </Tooltip>
            </Box>
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
                            width: {
                                xs: "100%",
                                sm: "230px",
                                md: "260px",
                                lg: "300px",
                                xl: "400px"
                            }
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default SliderRecipeBase