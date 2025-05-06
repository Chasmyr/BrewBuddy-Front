import { DeviceThermostat, Timer } from "@mui/icons-material"
import { Box, InputAdornment, TextField, Typography } from "@mui/material"
import { TemperatureAndDuration } from "../../../type/recipeObject"
import { FermentingSteps } from "../RecipeFormFermentation"

type TempAndDurationProps = {
    title: string
    temperatureAndDuration: TemperatureAndDuration[],
    setTemperatureAndDuration: React.Dispatch<React.SetStateAction<TemperatureAndDuration[] | FermentingSteps[]>>,
    index: number,
    isFermenting: boolean
}

const TempAndDuration: React.FC<TempAndDurationProps>  = ({title, temperatureAndDuration, setTemperatureAndDuration, index, isFermenting}) => {

    const handleInputChange = (field: 'temperature' | 'duration', value: number, name: string) => {
        setTemperatureAndDuration((prev) => {
            const updated = [...prev]
    
            if (!updated[index]) {
                let newEntry: {temperature: number, duration: number, name?: string} = { temperature: 0, duration: 0 }
                if(isFermenting) {
                    if(name === "Primaire") newEntry.name = "primary"
                    if(name === "Secondaire") newEntry.name = "secondary"
                    if(name === "Refermentation") newEntry.name = "refermenting"
                }
                updated[index] = newEntry
            }
            
            updated[index] = {
                ...updated[index],
                [field]: value
            }
    
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
                    width: "100%"
                }}
            >
                <TextField 
                    placeholder="Température (°C)"
                    type="number"
                    variant="standard"
                    value={temperatureAndDuration[index]?.temperature || ''}
                    onChange={(e) => handleInputChange('temperature', Number(e.target.value), title)}
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
                    sx={{
                        width: {
                            xs: "48%"
                        }
                    }}
                />
                <TextField 
                    placeholder={isFermenting ? "Durée (jours)" : "Durée (min)"}
                    type="number"
                    variant="standard"
                    value={temperatureAndDuration[index]?.duration || ''}
                    onChange={(e) => handleInputChange('duration', Number(e.target.value), title)}
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
                    sx={{
                        width: {
                            xs: "48%"
                        }
                    }}
                />
            </Box>
        </Box>
    )
}

export default TempAndDuration