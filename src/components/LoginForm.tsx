import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Alert, Box, Button, Checkbox, FormControlLabel, FormGroup, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react"
import { useApi } from "../hooks/useApi"
import { useDispatch } from "react-redux"
import { setUserSlice, User } from "../store/userSlice"
import { Link, useNavigate } from "react-router"
import { AxiosError } from "axios"

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
    const [errorMessage, setErrorMessage] = useState("")
    const [userDetails, setUserDetails] = useState<User | null>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {data, error, isLoading, fetchData} = useApi()
    
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

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const axiosConfig = {
            data: formData,
            method: 'post'
        }
        if(!isLoading) {
            const loginResponse = await fetchData("/api/login", axiosConfig)
            if(loginResponse.accessToken) {
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
            }
        }
    }

    useEffect(() => {
        if(userDetails) {
            dispatch(setUserSlice(data))
            if(rememberMe) { 
                userDetails.token && localStorage.setItem("accessToken", userDetails.token)
                userDetails.id && localStorage.setItem("id", userDetails.id.toString())
                userDetails.role && localStorage.setItem("accessToken", userDetails.role)
            }
            navigate("/")
        }
    }, [userDetails])

    useEffect(() => {
        if(error) {
            const axiosError = error as AxiosError<ApiErrorResponse>
            if(axiosError.response) {
                if(axiosError.response?.data.error === "InvalidCredentials") {
                    setErrorMessage("Mail ou mot de passe incorrect.")
                } else if (axiosError.response?.data.error === "Not Found") {
                    setErrorMessage("Impossible de joindre le serveur.")
                } else {
                    setErrorMessage("Une erreur est survenue.")
                }
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
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#FFFCF2",
                paddingTop: {
                    xs: 8,
                    sm: 0,
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
                        lg: 4
                    },
                    display: {
                        xs: "none",
                        sm: "block"
                    }
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
                {error && 
                    <>
                        <Alert severity="error" sx={{mb:2}}>{errorMessage}</Alert>
                    </>
                }
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
                    Se connecter
                </Button>
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
                    <Link to="/register" style={{color: "black"}}>Je n'ai pas de compte</Link>
                </Typography>
            </Box>
        </Box>
    )
}

export default LoginForm