import { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import { useSnackbar } from '../context/SnackbarContext'
import { useApi } from '../hooks/useApi'
import { AxiosError } from 'axios'
import { checkEmailConstraints } from '../utils/constraintsFormatter'

interface ContactFormData {
  toAddress: string
  pseudo: string
  email: string
  subject: string
  message: string
}

type ApiErrorResponse = {
    error: string;
}

export default function ContactForm() {
    const [nom, setNom] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [isFormLoading, setIsFormLoading] = useState(false)
    
    const { showSnackbar } = useSnackbar()

    const {error, isLoading, fetchData} = useApi()

    const checkIfFormComplete = () => {
    
        if(!nom) {
            showSnackbar("Merci de renseigner votre nom.", "error")
            return
        }
        if(!email) {
            showSnackbar("Merci de renseigner votre email.", "error")
            return
        }
        if(!checkEmailConstraints(email)) {
            showSnackbar("Le format du mail n'est pas correct.", "error")
            return
        }
        if(!subject) {
            showSnackbar("Merci de renseigner un sujet.", "error")
            return
        }
        if(!message) {
            showSnackbar("Merci de renseigner un message.", "error")
            return
        }

        return true
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setIsFormLoading(true)
        const data: ContactFormData = {
            toAddress: 'contact@brew-buddy.fr',
            pseudo: nom,
            email,
            subject,
            message,
        }

        const axiosConfig = {
            data,
            method: 'post'
        }
        if(!isLoading && checkIfFormComplete()) {
            await fetchData("/api/email/contact", axiosConfig)
            showSnackbar("Votre message a été envoyé !.","success")
        }
        
        setIsFormLoading(false)
    }

    useEffect(() => {
        if(error) {
            const axiosError = error as AxiosError<ApiErrorResponse>
            if(axiosError.response) {
                showSnackbar("Une erreur est survenue.","error")
                setIsFormLoading(false)
            }
        }
    }, [error])

    return (
        <Box sx={{
                width: {
                    xs: "100%",
                    sm: "90%",
                    lg: "100%"
                },
                maxWidth: "650px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#FFFCF2",
                paddingTop: {
                    xs: 0,
                    sm: 4,
                    lg: 8
                },
                paddingBottom : {
                    xs: 2,
                    sm: 8,
                    lg: 0
                },
                boxShadow: {
                    xs: 0,
                    sm: 3,
                    lg: 0
                },
                borderRadius: {
                    xs: 0,
                    sm: 6,
                    lg: 0
                }
            }}
        >   
            <Typography 
                variant="h2" 
                fontSize={{
                    xs: 26,
                    sm: 34
                }}
                sx={{
                    mb: {
                        xs: 2,
                        lg: 4
                    },
                }}
            >
                Nous contacter
            </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    width={{
                        xs: "80%",
                        sm: "75%",
                        lg: "70%"
                    }}
                >
                    <TextField
                    placeholder="Nom*"
                    fullWidth
                    required
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    sx={{
                        mb: 2
                    }}
                    />
                    <TextField
                    placeholder="Email*"
                    type="email"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                        mb: 2
                    }}
                    />
                    <TextField
                    placeholder="Sujet*"
                    fullWidth
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    sx={{
                        mb: 2
                    }}
                    />
                    <TextField
                    placeholder="Message*"
                    fullWidth
                    required
                    multiline
                    minRows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{
                        mb: 2
                    }}
                    />
                    {isFormLoading ?
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: "#E97C4C",
                                borderRadius: 3,
                                boxShadow: 1,
                                color: "background.default"
                            }}
                        >
                            <CircularProgress size={25} sx={{color: "background.default"}} />
                        </Button>
                        :
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: "#E97C4C",
                                borderRadius: 3,
                                boxShadow: 1,
                                color: "background.default"
                            }}
                            onClick={handleSubmit}
                        >
                            Enovyer
                        </Button>
                    }
                    
                </Box>
        </Box>
    )
}
