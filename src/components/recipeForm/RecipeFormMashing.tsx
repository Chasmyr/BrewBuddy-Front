import { Box, FormControlLabel, Switch, Typography } from "@mui/material"
import TempAndDuration from "./TempAndDuration"

type RecipeFormMashingProps = {
    isMulti: boolean,
    setIsMulti: React.Dispatch<React.SetStateAction<boolean>>,
    isMashout: boolean,
    setIsMashout: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipeFormMashing: React.FC<RecipeFormMashingProps>  = ({isMulti, setIsMulti, isMashout, setIsMashout}) => {

    const handleChangeSwitchMulti = () => {
        setIsMulti(!isMulti)
    }

    const handleChangeSwitchMashout = () => {
        setIsMashout(!isMashout)
    }

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
                    mb: 2,
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Typography
                    variant="h4"
                    fontSize={22}
                >
                    Empâtage
                </Typography>
                <Box>
                    <FormControlLabel 
                        control={
                            <Switch
                                checked={isMashout}
                                onChange={handleChangeSwitchMashout}
                            />
                        }
                        label="Mash-out"
                    />
                    <FormControlLabel 
                        control={
                            <Switch
                                checked={isMulti}
                                onChange={handleChangeSwitchMulti}
                            />
                        }
                        label="Multi-palier"
                    />
                </Box>

                </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                    flexDirection: "column",
                    mt:2
                }}
            >
                {isMulti ?
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                justifyContent: "center",
                                alignContent: "center",
                                gap: 2
                            }}
                        >
                            <TempAndDuration title="Palier 1" />
                            <TempAndDuration title="Palier 2" />
                            <TempAndDuration title="Palier 3" />
                        </Box>
                    :
                        <TempAndDuration title="Palier" />
                }
            </Box>
        </Box>
    )
}

export default RecipeFormMashing