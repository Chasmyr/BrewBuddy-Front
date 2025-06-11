import { Box, Button, CircularProgress, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useApi } from "../../hooks/useApi"
import { useNavigate } from "react-router"
import { AxiosError } from "axios"
import { useSnackbar } from "../../context/SnackbarContext"
import ConfirmationCodeInput from "../ConfirmationCodeInput"

type ApiErrorResponse = {
    error: string;
}

type ConfirmationFormProps = {
    email: string
}

const ConfirmationForm: React.FC<ConfirmationFormProps> = ({email}) => {

    const [code, setCode] = useState("")
    const [isFormLoading, setIsFormLoading] = useState(false)
    const navigate = useNavigate()
    const { showSnackbar } = useSnackbar()

    const {error, isLoading, fetchData} = useApi()

    const handleChange = (newCode: string) => {
        setCode(newCode)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setIsFormLoading(true)
        if(code.length === 6) {

            const axiosConfig = {
                data: {code: code},
                method: 'post'
            }
            if(!isLoading) {
                const result = await fetchData("/api/users/confirmation/" + encodeURIComponent(email), axiosConfig)
                if(result.status && result.status === 200) {
                    showSnackbar("Comtpe validé ! Veuillez vous connecter.", "success")
                    window.scrollTo(0, 0)
                    navigate(`/login`)
                }
            }
        } else {
            showSnackbar("Veuillez saisir les 6 chiffres du code.", "error")
        }
        setIsFormLoading(false)
    }
    
    useEffect(() => {
        if(error) {
            const axiosError = error as AxiosError<ApiErrorResponse>
            if(axiosError.response) {
                if(axiosError.response?.data.error === "UserNotFound") {
                    showSnackbar("Cet utilisateur n'éxiste pas.","error")
                } else if (axiosError.response?.data.error === "Invalid code") {
                    showSnackbar("Le code saisi n'est pas bon.","error")
                } else if (axiosError.response?.data.error === "Expired code") {
                    showSnackbar("Votre code est expiré, un nouveau code vous a été envoyé.","error")
                } else {
                    showSnackbar("Une erreur est survenue.","error")
                }
            }
            setIsFormLoading(false)
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
                    sm: 6,
                    lg: 0
                },
                paddingBottom : {
                    xs: 2,
                    sm: 6,
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
                        xs: 6,
                    },
                }}
            >
                Confirmer votre compte
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
                <Box
                    sx={{
                        width: "100%",
                        mb:{xs: 3, sm: 4}
                    }}
                >
                    <ConfirmationCodeInput onChange={handleChange} />
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        mb:{xs: 3, sm: 4}
                    }}
                >
                    <Typography variant="body2" textAlign="center">Vous avez reçu le code par mail.</Typography>
                </Box>
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
                        Valider
                    </Button>
                }
            </Box>
        </Box>
    )
}

export default ConfirmationForm