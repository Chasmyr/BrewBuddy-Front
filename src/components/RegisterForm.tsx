import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Alert, Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react"
import { useApi } from "../hooks/useApi"
import { useDispatch } from "react-redux"
import { setUserSlice, User } from "../store/userSlice"
import { Link, useNavigate } from "react-router"
import { checkEmailConstraints, checkPasswordConstraints } from "../utils/constraintsFormatter"
import { AxiosError } from "axios"

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
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [userDetails, setUserDetails] = useState<User | null>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const {data, error, isLoading, fetchData} = useApi()
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData((prevState: RegisterFormData) => ({
            ...prevState,
            [name]: value
        }))
    }

    const checkIfFormComplete = () => {

        let errors = 0
        // controle du formulaire avant la soumission
        if(!formData.pseudo) {
            setErrorMessage("Le nom d'utilisateur est requis.")
            errors++
        }
        if(!formData.email) {
            setErrorMessage("Le mail est requis.")
            errors++
        }
        if(!formData.password) {
            setErrorMessage("Le mot de passe est requis.")
            errors++
        }
        if(!checkEmailConstraints(formData.email)) {
            setErrorMessage("Le format du mail n'est pas correct.")
            errors++
        }
        if(!checkPasswordConstraints(formData.password)) {
            setErrorMessage("Le mot de passe ne correspond pas à nos normes de sécurité.")
            errors++
        }
        if(formData.password != formData.passwordCheck) {
            setErrorMessage("Les mots de passe ne sont pas identiques.")
            errors++
        }

        return errors === 0
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if(!isLoading && checkIfFormComplete()) {
            const axiosConfig = {
                data: formData,
                method: 'post'
            }
            const createUserResponse = await fetchData("/api/users", axiosConfig)
            if(createUserResponse.createdAt) {
                let response = null
                if(!isLoading) {
                    const axiosConfig = {
                        data: formData,
                        method: 'post'
                    }
                    response = await fetchData("/api/login", axiosConfig)
                }
                if(response) {
                    const axiosConfig = {
                        method: 'get',
                        headers: {
                            Authorization: `Bearer ${response.accessToken}`
                        }
                    }
                    const userInfo = await fetchData("/api/checkMe", axiosConfig)
                    setUserDetails({
                        ...response,
                        ...userInfo
                    })
                }
            }
        }
    }

    useEffect(() => {
        if(userDetails) {
            dispatch(setUserSlice(userDetails))
            userDetails.token && localStorage.setItem("accessToken", userDetails.token)
            userDetails.id && localStorage.setItem("id", userDetails.id.toString())
            userDetails.role && localStorage.setItem("role", userDetails.role)
            navigate("/")
        }
    }, [userDetails])

    useEffect(() => {
        if(error) {
            const axiosError = error as AxiosError<ApiErrorResponse>
            if(axiosError.response) {
                if(axiosError.response?.data.error === "UserAlreadyExist") {
                    setErrorMessage("Un compte éxiste déjà avec ce mail.")
                } else if (axiosError.response?.data.error === "Not Found") {
                    setErrorMessage("Impossible de joindre le serveur.")
                } else {
                    setErrorMessage("Une erreur est survenue.")
                }
            }
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
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#FFFCF2",
                paddingTop: {
                    xs: 8,
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
                        sm: 2,
                        lg: 3
                    },
                    display: {
                        xs: "none",
                        sm: "block"
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
                {errorMessage && 
                    <>
                        <Alert severity="error" sx={{mb:2}}>{errorMessage}</Alert>
                    </>
                }
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
                        Nom d'utiliser
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
                        Addresse mail
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
                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        backgroundColor: "#F99926",
                        fontWeight: "bold",
                        borderRadius: 3,
                        boxShadow: 1
                    }}
                    onClick={handleSubmit}
                >
                    Créer un compte
                </Button>
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
                    <Link to="/login" style={{color: "black"}}>J'ai déjà un compte</Link>
                </Typography>
            </Box>
        </Box>
    )
}

export default RegisterForm