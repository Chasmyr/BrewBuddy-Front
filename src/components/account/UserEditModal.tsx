import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, } from '@mui/material'

type Field = {
  label: string
  name: string
  type?: string
}

type UserEditModalProps = {
  open: boolean
  title: string
  fields: Field[]
  values: Record<string, string>
  onChange: (field: string, value: string) => void
  onClose: () => void
  onSubmit: () => void
  loading?: boolean
}

const UserEditModal: React.FC<UserEditModalProps> = ({ open, title, fields, values, onChange, onClose, onSubmit, loading = false }) => {

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" disableScrollLock>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          {fields.map(({ label, name, type = 'text' }) => (
            <TextField
              key={name}
              label={label}
              type={type}
              value={values[name] || ''}
              onChange={(e) => onChange(name, e.target.value)}
              fullWidth
              variant="outlined"
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions sx={{mr: 2}}>
        <Button onClick={onClose} disabled={loading} sx={{mb: 2}}>
          Annuler
        </Button>
        <Button onClick={onSubmit} variant="outlined" disabled={loading} sx={{mb: 2}}>
          {loading ? 'En cours...' : 'Enregistrer'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserEditModal
