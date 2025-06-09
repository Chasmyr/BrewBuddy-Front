import React, { useRef } from 'react'
import { Box, TextField } from '@mui/material'

interface ConfirmationCodeInputProps {
onChange?: (code: string) => void
}

export default function ConfirmationCodeInput({ onChange }: ConfirmationCodeInputProps) {
    const inputRefs = useRef<Array<HTMLInputElement | null>>([])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        const target = e.target as HTMLInputElement // ✅ cast
        const value = target.value.replace(/\D/g, '').slice(0, 1) // 1 chiffre max
        target.value = value

        if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
        }

        const code = inputRefs.current.map(input => input?.value || '').join('')
        onChange?.(code)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
        inputRefs.current[index - 1]?.focus()
        }
    }

    return (
        <Box display="flex" justifyContent="center" gap={1}>
        {Array.from({ length: 6 }, (_, index) => (
            <TextField
                key={index}
                inputRef={(el: HTMLInputElement | null) => {
                    inputRefs.current[index] = el;
                }}
                onChange={(e) => handleChange(e, index)}
                slotProps={{
                    input: {
                    inputMode: 'numeric',
                    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index),
                    style: { textAlign: 'center', fontSize: '1.5rem' },
                    },
                }}
                sx={{ width: 50 }}
            />
        ))}
        </Box>
    )
}
