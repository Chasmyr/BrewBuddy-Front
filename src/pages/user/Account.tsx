import { useSelector } from "react-redux"
import Footer from "../../layout/Footer"
import Header from "../../layout/Header"
import { RootState } from "../../store/store"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Box, Grid } from "@mui/material"
import AccountPageSkeleton from "../../components/skeleton/AccountPageSkeleton"
import UserDetail from "../../components/account/UserDetail"
import UserHistory from "../../components/account/UserHistory"
import { useApi } from "../../hooks/useApi"
import { useSnackbar } from "../../context/SnackbarContext"
import { UserInfo } from "../../type/user"

const AccountPage = () => {

    const [isPageLoading, setIsPageLoading] = useState(true)
    const [userData, setUserData] = useState<UserInfo | null>()
        
    const { showSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const {fetchData} = useApi()
    const user = useSelector((state: RootState) => state.user)

    useEffect(() => {
        const fetchUser = async (userId: string, token: string) => {
            const axiosConfig = {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            return await fetchData(`/api/users/${userId}`, axiosConfig)
        }

        const init = async () => {
            if(!user.accessToken) {
                navigate('/login')
            } else if (user.id) {
                try {
                    const response = await fetchUser(user.id.toString(), user.accessToken)
                    if(response.id) {
                        setUserData(response)
                        setIsPageLoading(false)
                    }
                } catch (error) {
                    showSnackbar("Une erreur est survenue, merci de réessayer plus tard.", "error")
                    navigate('/')
                }
                
            }
        }

        init()
    }, [])

    if(isPageLoading) {
        return (
            <AccountPageSkeleton />
        )
    }

    return (
        <>
            <Header />
            <Box
                sx={{
                    width: "100%",
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    bgcolor: {
                        xs: "#F99926"
                    },
                }}
            >
                <Box
                    sx={{
                        width: {
                            xl: "45%",
                            lg: "60%",
                            md: "70%",
                            sm: "90%",
                            xs: "95%"
                        },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            mb: 6,
                            mt: {xs: 10, sm: 0},
                            height: "100%"
                        }}
                    > 
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignContent: "center",
                                flexDirection: "column",
                                width: {
                                    md: "calc(100% - 96px)",
                                    sm: "calc(100% - 48px)"
                                },
                                bgcolor: "#FFFCF2",
                                p: {
                                    xs: 3,
                                    md: 6
                                },
                                borderRadius: 2,
                                mt: {xs: 0, sm: 12},
                                boxShadow: 2
                            }}
                        >
                            <Grid container spacing={4} padding={4}>
                                {userData && <UserDetail user={userData} />}
                                <UserHistory />
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default AccountPage