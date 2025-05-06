import { createContext, useContext, useState, useEffect } from 'react'
import { Snackbar, Alert, LinearProgress, Box } from '@mui/material'

type SnackbarContextType = {
  showSnackbar: (message: string, severity?: 'success' | 'error' | 'warning' | 'info') => void
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined)

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success')
  const [progress, setProgress] = useState(100)

  const duration = 4000

  const showSnackbar = (msg: string, sev: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setMessage(msg)
    setSeverity(sev)
    setProgress(100)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      const start = Date.now()
      const timer = setInterval(() => {
        const elapsed = Date.now() - start
        setProgress(Math.max(0, 100 - (elapsed / duration) * 100))
      }, 100)

      return () => clearInterval(timer)
    }
  }, [open])

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
            mr: {
                lg: 6,
                sm: 4,
                xs: 6
            },
            mt: {
                lg: 0,
                md: 2,
                sm: 4,
                xs: 8
            }
        }}
      >
        <Box 
            sx={{ 
                width: {
                    md: '100%',
                    sm: '100%',
                    xs: '80%' 
                }
            }}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: '100%', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
          >
            {message}
          </Alert>
        <LinearProgress
            variant="determinate"
            value={progress}
            color={severity}
            sx={{
                height: 4,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                width: 'calc(100% + 32px)'
            }}
        />
        </Box>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = () => {
  const context = useContext(SnackbarContext)
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  }
  return context
}
