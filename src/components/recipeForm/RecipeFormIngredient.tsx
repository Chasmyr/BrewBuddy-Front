import { Box, Typography } from "@mui/material"
import SelectIngredient from "./SelectIngredient"
import { useState } from "react"
import { ingrEx } from "../../utils/const"
import { IngredientType } from "../../type/ingredient"
import IngredientDetails from "./IngredientDetails"

const RecipeFormIngredient = () => {

    const [malts, setMatls] = useState<IngredientType[]>([])
    const [houblons, setHoulons] = useState<IngredientType[]>([])
    const [levure, setLevure] = useState<IngredientType[]>([])
    const [divers, setDivers] = useState<IngredientType[]>([])
    const [sucres, setSucres] = useState<IngredientType[]>([])
    
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
                pt: 0,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4
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
                    Ingredients
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "48%"
                    }}
                >
                    <SelectIngredient name="Malts" value={malts} setValue={setMatls} options={ingrEx} />
                    <IngredientDetails needQuantity={true} ingredients={malts}/>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "48%"
                    }}
                >
                    <SelectIngredient name="Houblon(s)" value={houblons} setValue={setHoulons} options={ingrEx} />
                    <IngredientDetails needQuantity={true} ingredients={houblons}/>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "48%"
                    }}
                >
                    <SelectIngredient name="Levure" value={levure} setValue={setLevure} options={ingrEx} />
                    <IngredientDetails needQuantity={false} ingredients={levure}/>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "48%"
                    }}
                >
                    <SelectIngredient name="Divers" value={divers} setValue={setDivers} options={ingrEx} />
                    <IngredientDetails needQuantity={true} ingredients={divers}/>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "48%"
                    }}
                >
                    <SelectIngredient name="Sucres" value={sucres} setValue={setSucres} options={ingrEx} />
                    <IngredientDetails needQuantity={true} ingredients={sucres}/>
                </Box>
            </Box>
        </Box>
    )
}

export default RecipeFormIngredient