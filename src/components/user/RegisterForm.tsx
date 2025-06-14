import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Box, Button, CircularProgress, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react"
import { useApi } from "../../hooks/useApi"
import { Link, useNavigate } from "react-router"
import { checkEmailConstraints, checkPasswordConstraints } from "../../utils/constraintsFormatter"
import { AxiosError } from "axios"
import { useSnackbar } from "../../context/SnackbarContext"

interface RegisterFormData {
    email: string
    password: string
    pseudo: string
    passwordCheck: string
}

type ApiErrorResponse = {
    error: string;
}

const RegisterForm = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState<RegisterFormData>({
        email: "",
        password: "",
        pseudo: "",
        passwordCheck: ""
    })
    const [isFormLoading, setIsFormLoading] = useState(false)
    const navigate = useNavigate()
    const { showSnackbar } = useSnackbar()
    
    const {error, isLoading, fetchData} = useApi()
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData((prevState: RegisterFormData) => ({
            ...prevState,
            [name]: value
        }))
    }

    const checkIfFormComplete = () => {

        if(!formData.pseudo) {
            showSnackbar("Le nom d'utilisateur est requis.", "error")
            return
        }
        if(!formData.email) {
            showSnackbar("Le mail est requis.", "error")
            return
        }
        if(!checkEmailConstraints(formData.email)) {
            showSnackbar("Le format du mail n'est pas correct.", "error")
            return
        }
        if(!formData.password) {
            showSnackbar("Le mot de passe est requis.", "error")
            return
        }
        if(!checkPasswordConstraints(formData.password)) {
            showSnackbar("Le mot de passe ne correspond pas à nos normes de sécurité.", "error")
            return
        }
        if(formData.password != formData.passwordCheck) {
            showSnackbar("Les mots de passe ne sont pas identiques.", "error")
            return
        }

        return true
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setIsFormLoading(true)

        if(!isLoading && checkIfFormComplete()) {
            const axiosConfig = {
                data: formData,
                method: 'post'
            }
            const createUserResponse = await fetchData("/api/users", axiosConfig)
            if(createUserResponse) {
                showSnackbar("Compte créé ! Un code de vérification vous a été envoyé par mail.", "success")
                window.scrollTo(0, 0)
                navigate(`/confirmation/${encodeURIComponent(formData.email)}`)
            } else {
                showSnackbar("Une erreur est survenue, merci de revenir plus tard.", "error")
            }
        }
        setIsFormLoading(false)
    }

    useEffect(() => {
        if(error) {
            const axiosError = error as AxiosError<ApiErrorResponse>
            if(axiosError.response) {
                if(axiosError.response?.data.error === "UserAlreadyExist") {
                    showSnackbar("Un compte éxiste déjà avec ce mail.", "error")
                } else if (axiosError.response?.data.error === "Not Found") {
                    showSnackbar("Impossible de joindre le serveur.", "error")
                } else {
                    showSnackbar("Une erreur est survenue.", "error")
                }
            }
            setIsFormLoading(false)
        }
    }, [error])

    return (
        <Box 
            sx={{
                width: {
                    xs: "100%",
                    sm: "90%",
                    lg: "100%"
                },
                maxWidth: "680px",
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
                boxShadow: {
                    xs: 0,
                    sm: 3,
                    lg: 0
                },
                borderRadius: {
                    xs: 0,
                    sm: 6,
                    lg: 0
                },
                mt: {
                    xs: 8,
                    lg: 0
                },
                mb: {
                    xs: 0,
                    sm: 4,
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
                        lg: 3
                    },
                    mt: {
                        sm: 2,
                        lg: 3
                    }
                }}
            >
                Inscription
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
                        mb:{xs: 2, sm: 3}
                    }}
                >
                    <Typography 
                        variant="h6" 
                        fontWeight="semi-bold"
                    > 
                        Nom d'utilisateur
                    </Typography>
                    <TextField 
                        placeholder="Nom d'utilisateur"
                        name="pseudo"
                        value={formData.pseudo}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        required
                        slotProps={{
                            input: {
                                sx: {
                                    borderRadius: 5
                                }
                            }
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        mb:{xs: 2, sm: 3}
                    }}
                >
                    <Typography 
                        variant="h6" 
                        fontWeight="semi-bold"
                    > 
                        Adresse mail
                    </Typography>
                    <TextField 
                        placeholder="mail@example.com"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        required
                        slotProps={{
                            input: {
                                sx: {
                                    borderRadius: 5
                                }
                            }
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        mb:{xs: 2, sm: 3}
                    }}
                >
                    <Typography variant="h6" fontWeight="semi-bold"> 
                        Mot de passe
                    </Typography>
                    <TextField 
                        placeholder="Mot de passe"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        required
                        slotProps={{
                            input: {
                                sx: {
                                    borderRadius: 5
                                },
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        mb:{xs: 2, sm: 4}
                    }}
                >
                    <Typography variant="h6" fontWeight="semi-bold"> 
                        Confirmer votre mot de passe
                    </Typography>
                    <TextField 
                        placeholder="Mot de passe"
                        name="passwordCheck"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.passwordCheck}
                        onChange={handleChange}
                        fullWidth
                        required
                        slotProps={{
                            input: {
                                sx: {
                                    borderRadius: 5
                                },
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        }}
                    />
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
                        Créer un compte
                    </Button>
                }
            </Box>
            <Box
                sx={{
                    mt: 2,
                    mb:4
                }}
            >
                <Typography 
                    sx={{
                        textDecoration: "underline", 
                        cursor: "pointer",
                    }}
                >
                    <Link to="/login" style={{color: "black"}} onClick={() => window.scrollTo(0, 0)}>J'ai déjà un compte</Link>
                </Typography>
            </Box>
        </Box>
    )
}

export default RegisterForm