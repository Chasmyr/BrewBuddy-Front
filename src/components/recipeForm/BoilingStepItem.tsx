import { Box, TextField, Typography, InputAdornment, FormControlLabel, Switch } from '@mui/material'
import { Timer } from '@mui/icons-material'

type BoilingStepItemProps = {
  ingredientName: string
  whenToAdd: number
  duration: number
  postBoiling: boolean
  showPostBoilingCheckbox: boolean
  onChange: (field: 'whenToAdd' | 'duration' | 'postBoiling', value: number | boolean) => void
}

export default function BoilingStepItem({ ingredientName, whenToAdd, duration, onChange, showPostBoilingCheckbox, postBoiling}: BoilingStepItemProps) {

    return (
        <Box
            sx={{
                p: 2,
                border: '1px solid grey',
                borderRadius: 2,
                backgroundColor: '#FAF8F0',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                transform: 'translateY(10px)',
                animation: 'fadeInMove 0.8s ease-out forwards'
            }}
        >
        {showPostBoilingCheckbox ? (
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between"
                }}
            >
                <Typography variant="h6">{ingredientName}</Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={postBoiling}
                            onChange={(e) => onChange('postBoiling', e.target.checked)}
                            onPointerDown={(e) => e.stopPropagation()}
                        />
                    }
                    label="Hors feu"
                />
            </Box>
        )
            :
                <Typography variant="h6">{ingredientName}</Typography>
        }
        
        <TextField
            label="Quand ajouter (min)"
            type="number"
            variant="outlined"
            size="small"
            disabled={postBoiling}
            value={whenToAdd}
            onChange={(e) => onChange('whenToAdd', Number(e.target.value))}
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

        <TextField
            label="Durée après ajout (min)"
            type="number"
            variant="outlined"
            size="small"
            value={duration}
            onChange={(e) => onChange('duration', Number(e.target.value))}
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
  )
}
