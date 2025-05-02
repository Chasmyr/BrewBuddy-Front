import { Box, Card, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { DragIndicator, Timer } from "@mui/icons-material"
import { useEffect, useState } from "react"

type BoilingIngredientCardProps = {
  ingredientName: string
  quantity: number
  whenToAdd: number
  duration: number
  ingredientMeasureUnit: string
  onChange: (field: 'quantity' | 'whenToAdd' | 'duration', value: number) => void
}

export default function BoilingIngredientCard({ ingredientName, quantity, whenToAdd, duration, onChange, ingredientMeasureUnit }: BoilingIngredientCardProps) {

  const [localQuantity, setLocalQuantity] = useState<number |string>(quantity)
  const [localWhenToAdd, setLocalWhenToAdd] = useState<number |string>(whenToAdd)
  const [localDuration, setLocalDuration] = useState<number |string>(duration)

  useEffect(() => {
    setLocalQuantity(quantity)
  }, [quantity])

  useEffect(() => {
    setLocalWhenToAdd(whenToAdd)
  }, [whenToAdd])

  useEffect(() => {
    setLocalDuration(duration)
  }, [duration])

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">{ingredientName}</Typography>
        <Box>
          <IconButton size="small" sx={{ cursor: "grab" }}>
            <DragIndicator fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <TextField
        label="Quantité"
        type="number"
        size="small"
        value={localQuantity}
        onPointerDown={(e) => e.stopPropagation()}
        onChange={(e) => {
          const value = e.target.value
          setLocalQuantity(value)
          if (!isNaN(Number(value))) onChange("quantity", Number(value))
        }}
        onKeyDown={(e) => {
          if (['e', 'E', '+', '-', '.'].includes(e.key)) {
            e.preventDefault()
          }
        }}
        onBlur={() => {
          if (localQuantity === "") {
            setLocalQuantity(0)
            onChange("quantity", 0)
          }
        }}
        onFocus={(e) => {
          if (e.target.value === "0") {
            setLocalQuantity("")
          }
        }}
        slotProps={{
          input: {
              endAdornment:
                  <InputAdornment position="end">{ingredientMeasureUnit}</InputAdornment>
          }
        }}
      />

      <TextField
        label="Moment d'ajout (min)"
        type="number"
        size="small"
        value={localWhenToAdd}
        onPointerDown={(e) => e.stopPropagation()}
        onChange={(e) => {
          const value = e.target.value
          setLocalWhenToAdd(value)
          if (!isNaN(Number(value))) onChange("whenToAdd", Number(value))
        }}
        onFocus={(e) => {
          if (Number(e.target.value) === 0) setLocalWhenToAdd("");
        }}
        onBlur={() => {
          if (localWhenToAdd === "") {
            setLocalWhenToAdd(0);
            onChange("whenToAdd", 0);
          }
        }}
        onKeyDown={(e) => {
          if (['e', 'E', '+', '-', '.'].includes(e.key)) {
            e.preventDefault()
          }
        }}
        slotProps={{
          input: {
              endAdornment:
                  <InputAdornment position="end">
                      <Timer />
                  </InputAdornment>
          }
        }}
      />

      <TextField
        label="Durée (min)"
        type="number"
        size="small"
        value={localDuration}
        onPointerDown={(e) => e.stopPropagation()}
        onFocus={(e) => {
          if (Number(e.target.value) === 0) setLocalDuration("");
        }}
        onBlur={() => {
          if (localDuration === "") {
            setLocalDuration(0)
            onChange("duration", 0)
          }
        }}
        onChange={(e) => {
          const value = e.target.value;
          setLocalDuration(value);
          if (!isNaN(Number(value))) onChange("duration", Number(value));
        }}
        onKeyDown={(e) => {
          if (['e', 'E', '+', '-', '.'].includes(e.key)) {
            e.preventDefault()
          }
        }}
        slotProps={{
          input: {
              endAdornment:
                  <InputAdornment position="end">
                      <Timer />
                  </InputAdornment>
          }
        }}
      />
    </Card>
  )
}
