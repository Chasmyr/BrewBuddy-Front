import { DeviceThermostat, Timer } from "@mui/icons-material"
import { Box, InputAdornment, TextField, Typography } from "@mui/material"

type TempAndDurationProps = {
    title: string | null,
    temperature: number,
    setTemperature: React.Dispatch<React.SetStateAction<number>>,
    duration: number,
    setDuration: React.Dispatch<React.SetStateAction<number>>
}

const TempAndDuration: React.FC<TempAndDurationProps>  = ({title, temperature, setTemperature, duration, setDuration}) => {

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
                    placeholder="Température"
                    type="number"
                    variant="standard"
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
                    placeholder="Durée"
                    type="number"
                    variant="standard"
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