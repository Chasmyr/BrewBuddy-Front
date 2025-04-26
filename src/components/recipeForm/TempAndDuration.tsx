import { DeviceThermostat, Timer } from "@mui/icons-material"
import { Box, InputAdornment, TextField, Typography } from "@mui/material"
import { IngredientType } from "../../type/ingredient"
import { TemperatureAndDuration } from "../../type/recipeObject"

type TempAndDurationProps = {
    title: string | null,
    temperatureAndDuration: TemperatureAndDuration[],
    setTemperatureAndDuration: React.Dispatch<React.SetStateAction<TemperatureAndDuration[]>>,
    ingredient: IngredientType | null,
    index: number
}

const TempAndDuration: React.FC<TempAndDurationProps>  = ({title, temperatureAndDuration, setTemperatureAndDuration, ingredient, index}) => {

    const handleInputChange = (field: 'temperature' | 'duration', value: number) => {
        setTemperatureAndDuration((prev) => {
            const updated = [...prev]
    
            if (!updated[index]) {
                updated[index] = { temperature: 0, duration: 0 };
            }
    
            updated[index] = {
                ...updated[index],
                [field]: value
            };
    
            return updated
        })
    }

    return (
        <Box sx={{width: "100%"}}>
            {title && (
                <Typography gutterBottom sx={{mb:1}}>
                    {title}
                </Typography>
            )}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center"
                }}
            >
                <TextField 
                    placeholder="Température (°C)"
                    type="number"
                    variant="standard"
                    value={temperatureAndDuration[index]?.temperature || ''}
                    onChange={(e) => handleInputChange('temperature', Number(e.target.value))}
                    slotProps={{
                        input: {
                            endAdornment:
                                <InputAdornment position="end">
                                    <DeviceThermostat />
                                </InputAdornment>
                        }
                    }}
                    onKeyDown={(e) => {
                        if (['e', 'E', '+', '-', '.'].includes(e.key)) {
                            e.preventDefault()
                        }
                    }}
                />
                <TextField 
                    placeholder="Durée (min)"
                    type="number"
                    variant="standard"
                    value={temperatureAndDuration[index]?.duration || ''}
                    onChange={(e) => handleInputChange('duration', Number(e.target.value))}
                    slotProps={{
                        input: {
                            endAdornment:
                                <InputAdornment position="end">
                                    <Timer />
                                </InputAdornment>
                        }
                    }}
                    onKeyDown={(e) => {
                        if (['e', 'E', '+', '-', '.'].includes(e.key)) {
                            e.preventDefault()
                        }
                    }}
                />
            </Box>
        </Box>
    )
}

export default TempAndDuration