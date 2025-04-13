import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Box, Button, Checkbox, FormControlLabel, FormGroup, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react"
import { useApi } from "../hooks/useApi"
import { useDispatch } from "react-redux"
import { setUserSlice } from "../store/userSlice"
import { useNavigate } from "react-router"

interface LoginFormData {
    email: string
    password: string
}

const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: ""
    })
    const [rememberMe, setRememberMe] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {data, isLoading, error, fetchData} = useApi()
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData((prevState: LoginFormData) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleCheckBox = (e:any) => {
        setRememberMe(!rememberMe)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const axiosConfig = {
            data: formData,
            method: 'post'
        }
        await fetchData("/api/login", axiosConfig)
    }

    useEffect(() => {
        if(data) {
            dispatch(setUserSlice(data))
            if(rememberMe) {
                localStorage.setItem("accessToken", data?.accessToken)
            }
            navigate("/")
        }
    }, [data])

    useEffect(() => {
        if(error) {
            console.log("error")
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
                    xs: 28,
                    sm: 36
                }}
                sx={{
                    mb: {
                        xs: 3,
                        sm: 4,
                        lg: 6
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
                width="70%"
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
                        lg: "translateY(20vh)"
                    }
                }}
            >
                <Typography 
                    sx={{
                        textDecoration: "underline", 
                        cursor: "pointer",
                    }}
                >
                    Je n'ai pas de compte
                </Typography>
            </Box>
        </Box>
    )
}

export default LoginForm