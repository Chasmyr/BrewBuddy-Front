import { Box, Card, FormControlLabel, IconButton, InputAdornment, Switch, TextField, Tooltip, Typography } from "@mui/material"
import { DragIndicator, InfoOutlineRounded, Timer } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { postBoilingTooltipContent } from "../../../utils/tooltipContent"

type BoilingIngredientCardProps = {
  ingredientName: string
  quantity: number
  whenToAdd: number
  duration: number
  postBoiling: boolean | undefined
  ingredientMeasureUnit: string
  onChange: (field: 'quantity' | 'whenToAdd' | 'duration' | 'postBoiling', value: number | boolean) => void
  showPostBoilingStep?: boolean
}

export default function BoilingIngredientCard({ ingredientName, quantity, whenToAdd, duration, postBoiling, onChange, ingredientMeasureUnit, showPostBoilingStep }: BoilingIngredientCardProps) {

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
          { showPostBoilingStep && (
            <>
              <FormControlLabel
                sx={{mr: 1}}
                control={
                  <Switch
                    checked={postBoiling}
                    onPointerDown={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      onChange("postBoiling", e.target.checked)
                    }}
                  />
                }
                label="Hors feu"
              />
              <Tooltip
                  placement="top"
                  arrow
                  enterTouchDelay={0}
                  title={postBoilingTooltipContent}
                  sx={{mr:1}}
              >
                  <IconButton size="small">
                      <InfoOutlineRounded color="action" />
                  </IconButton>
              </Tooltip>
            </>
            )
          }
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
      <TextField
        label="Moment d'ajout (min)"
        type="number"
        size="small"
        value={localWhenToAdd}
        disabled={postBoiling}
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

    </Card>
  )
}
