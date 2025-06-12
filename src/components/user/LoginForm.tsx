import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react"
import { useApi } from "../../hooks/useApi"
import { useDispatch } from "react-redux"
import { setUserSlice, User } from "../../store/userSlice"
import { Link, useNavigate } from "react-router"
import { AxiosError } from "axios"
import { useSnackbar } from "../../context/SnackbarContext"
import { checkEmailConstraints } from "../../utils/constraintsFormatter"

interface LoginFormData {
    email: string
    password: string
}

type ApiErrorResponse = {
    error: string;
}

const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: ""
    })
    const [rememberMe, setRememberMe] = useState(false)
    const [userDetails, setUserDetails] = useState<User | null>(null)
    const [isFormLoading, setIsFormLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { showSnackbar } = useSnackbar()

    const {error, isLoading, fetchData} = useApi()
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData((prevState: LoginFormData) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleCheckBox = () => {
        setRememberMe(!rememberMe)
    }

    const checkIfFormComplete = () => {

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

        return true
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setIsFormLoading(true)
        const axiosConfig = {
            data: formData,
            method: 'post'
        }
        if(!isLoading && checkIfFormComplete()) {
            const loginResponse = await fetchData("/api/login", axiosConfig)
            if(loginResponse) {
                let axiosConfig2 = {
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${loginResponse.accessToken}`
                    }
                }
                const userInfo = await fetchData("/api/checkMe", axiosConfig2)
                setUserDetails({
                    ...loginResponse,
                    ...userInfo
                })
            } else {
                showSnackbar("Une erreur est survenue, merci de revenir plus tard.", "error")
            }
        }
        setIsFormLoading(false)
    }

    useEffect(() => {
        if(userDetails) {
            dispatch(setUserSlice(userDetails))
            if(rememberMe) { 
                userDetails.accessToken && localStorage.setItem("accessToken", userDetails.accessToken)
                userDetails.id && localStorage.setItem("id", userDetails.id.toString())
                userDetails.role && localStorage.setItem("role", userDetails.role)
            }
            showSnackbar("Bon retour parmi nous !", "success")
            setIsFormLoading(false)
            window.scrollTo(0, 0)
            navigate("/")
        }
    }, [userDetails])

    useEffect(() => {
        if(error) {
            const axiosError = error as AxiosError<ApiErrorResponse>
            if(axiosError.response) {
                if(axiosError.response?.data.error === "InvalidCredentials") {
                    showSnackbar("Mail ou mot de passe incorrect.","error")
                } else if (axiosError.response?.data.error === "Unverified") {
                    showSnackbar("Votre compte n'est pas validé, un code vous a été envoyé par mail.","error")
                } else if (axiosError.response?.data.error === "Expired code") {
                    showSnackbar("Votre code de confirmation est expiré, un nouveau code vous a été envoyé.","error")
                } else if (axiosError.response?.data.error === "Not Found") {
                    showSnackbar("Impossible de joindre le serveur.","error")
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
                Connexion
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
                        mb:{xs: 2, sm: 4}
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
                        mb:2
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
                <FormGroup sx={{mb:2}}>
                    <FormControlLabel 
                        control={<Checkbox checked={rememberMe} />}
                        label="Se souvenir de moi"
                        onChange={handleCheckBox}
                    />
                </FormGroup>
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
                        Se connecter
                    </Button>
                }
            </Box>
            <Box
                sx={{
                    transform: {
                        xs: "translateY(3vh)",
                        lg: "translateY(10vh)"
                    }
                }}
            >
                <Typography 
                    sx={{
                        textDecoration: "underline", 
                        cursor: "pointer",
                    }}
                >
                    <Link to="/register" style={{color: "black"}} onClick={() => window.scrollTo(0, 0)}>Je n'ai pas de compte</Link>
                </Typography>
            </Box>
        </Box>
    )
}

export default LoginForm