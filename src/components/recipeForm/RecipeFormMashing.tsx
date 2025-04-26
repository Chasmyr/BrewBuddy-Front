import { Box, FormControlLabel, Switch, Typography } from "@mui/material"
import TempAndDuration from "./TempAndDuration"
import SelectIngredient from "./SelectIngredient"
import { IngredientType } from "../../type/ingredient"
import { useEffect, useState } from "react"
import { ingrEx } from "../../utils/const"
import IngredientDetails from "./IngredientDetails"
import { TemperatureAndDuration } from "../../type/recipeObject"

type RecipeFormMashingProps = {
    isMulti: boolean,
    setIsMulti: React.Dispatch<React.SetStateAction<boolean>>,
    isMashout: boolean,
    setIsMashout: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipeFormMashing: React.FC<RecipeFormMashingProps>  = ({isMulti, setIsMulti, isMashout, setIsMashout}) => {


    const [malts, setMatls] = useState<IngredientType[]>([])
    const [mashingSteps, setMashingSteps] = useState<TemperatureAndDuration[]>([
        { temperature: 0, duration: 0 }
    ])

    const handleChangeSwitchMulti = () => {
        if(malts.length > 0) {
            setIsMulti(!isMulti)
        }
    }

    const handleChangeSwitchMashout = () => {
        if(malts.length > 0) {
            setIsMashout(!isMashout)
        }
    }

    useEffect(() => {
        if(malts.length === 0) {
            setIsMashout(false)
            setIsMulti(false)
        }
    }, [malts])

    useEffect(() => {
        if (isMulti) {

          setMashingSteps((prev) => {
            const newSteps = [...prev];
            while (newSteps.length < 3) {
              newSteps.push({ temperature: 0, duration: 0 });
            }
            return newSteps.slice(0, 3)
          })
        } else {
          
          setMashingSteps((prev) => prev.slice(0, 1))
        }
    }, [isMulti])

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
                    Empâtage
                </Typography>
            </Box>
            <Box
                sx={{
                    mb: 2,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Typography
                    variant="h4"
                    fontSize={22}
                >
                    Ingrédients
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        my:2,
                        flexDirection: "column"
                    }}
                >
                    <SelectIngredient name="Malt(s)" value={malts} setValue={setMatls} options={ingrEx} />
                    <IngredientDetails needQuantity={true} ingredients={malts} />
                </Box>
            </Box>
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
                    Palier
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
                {malts.length === 0 ?
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            <Typography color="text.disabled" sx={{ fontStyle: 'italic' }}>Veuillez sélectionner au moins un ingrédient.</Typography>
                        </Box>
                    :
                        isMulti ?
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
                                <TempAndDuration title="Palier 1" ingredient={null} setTemperatureAndDuration={setMashingSteps} temperatureAndDuration={mashingSteps} index={0}/>
                                <TempAndDuration title="Palier 2" ingredient={null} setTemperatureAndDuration={setMashingSteps} temperatureAndDuration={mashingSteps} index={1}/>
                                <TempAndDuration title="Palier 3" ingredient={null} setTemperatureAndDuration={setMashingSteps} temperatureAndDuration={mashingSteps} index={2}/>
                            </Box>
                        :
                            <TempAndDuration title="Palier" ingredient={null} setTemperatureAndDuration={setMashingSteps} temperatureAndDuration={mashingSteps} index={0}/>
                }
            </Box>
        </Box>
    )
}

export default RecipeFormMashing