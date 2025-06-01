import { Delete, Edit } from "@mui/icons-material"
import { Avatar, Box, Button, Chip, Divider, Grid, Typography } from "@mui/material"
import { UserInfo } from "../../type/user"
import { formattedDate } from "../../utils/date"
import { useState } from "react"
import UserEditModal from "./UserEditModal"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../store/userSlice"
import { useNavigate } from "react-router"
import { RootState } from "../../store/store"
import { useApi } from "../../hooks/useApi"
import { useSnackbar } from "../../context/SnackbarContext"
import { checkEmailConstraints, checkPasswordConstraints } from "../../utils/constraintsFormatter"

type  UserDetailProps = {
    user: UserInfo
    setUserData: any
}

const UserDetail: React.FC<UserDetailProps> = ({user, setUserData}) => {

    const [openEditDetailModal, setOpenEditDetailModal] = useState(false)
    const [openEditPasswordlModal, setOpenEditPasswordModal] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userId = useSelector((state: RootState) => state.user.id)
    const userToken = useSelector((state: RootState) => state.user.accessToken)
    const { showSnackbar } = useSnackbar()
    const {fetchData} = useApi()

    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (field: string, value: string) => {
        setFormValues((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async () => {
        let dataToUpdate: {pseudo?: string, email?: string, password?: string} = {}
        if(formValues.username.length > 0) {
            dataToUpdate.pseudo = formValues.username
        }
        if(formValues.email.length > 0) {
            if(checkEmailConstraints(formValues.email)) {
                dataToUpdate.email = formValues.email
            } else {
                showSnackbar("Le format du mail n'est pas correct.", "error")
                return
            }
        }
        if(formValues.password.length > 0) {
            if(checkPasswordConstraints(formValues.password)) {
                if(formValues.confirmPassword === formValues.password) {
                    dataToUpdate.password = formValues.password
                } else {
                    showSnackbar("Les mots de passe ne sont pas identiques.", "error")
                    return
                }
            } else {
                showSnackbar("Le mot de passe ne correspond pas à nos normes de sécurité.", "error")
                return
            }
        }
        console.log(dataToUpdate)
        const axiosConfig = {
            method: 'put',
            headers: {
                Authorization: `Bearer ${userToken}`
            },
            data: dataToUpdate
        }
        const updateUserResponse = await fetchData(`/api/users/${userId}`, axiosConfig)
        if(updateUserResponse) {
            const axiosConfig2 = {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }
            const userData = await fetchData(`/api/users/${userId}`, axiosConfig2)
            setUserData(userData)
        }
        dataToUpdate = {}
        setOpenEditDetailModal(false)
    }

    const handleLogout = () => {
        dispatch(logout())
        window.scrollTo(0, 0)
        navigate('/')
    }

    const handleDelete = async () => {
        const axiosConfig = {
            method: 'delete',
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }
        try {
            await fetchData(`/api/users/${userId}`, axiosConfig)
            handleLogout()
            showSnackbar('Compte supprimer avec succès.', "success")
        } catch (error) {
            showSnackbar('Une erreur est survenue merci de réessayer plus tard.', "error")
        }
    }
    
    return (
        <Grid size={{xs: 12, md:6}}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar 
                    sx={{ width: 200, height: 200}}
                />
                <Box width="100%">
                    <Typography variant="body1" mt={3} fontSize={14}>{user.pseudo}</Typography>
                    <Typography variant="body1" mt={1} fontSize={14}>{user.email}</Typography>
                    <Typography variant="body1" mt={1} fontSize={14}>Buddy depuis le {formattedDate(user.createdAt)}</Typography>
                </Box>

                <Divider sx={{ width: '100%', my: 2 }} />
                <Chip label={user.role} color="primary" variant="outlined" sx={{minWidth: "40px"}}/>
                <Divider sx={{ width: '100%', my: 2 }} />
                
                <Button
                    variant="contained"
                    color="warning"
                    fullWidth
                    endIcon={<Edit />}
                    sx={{ mb: 1 }}
                    onClick={() => setOpenEditDetailModal(true)}
                >
                    Modifier mes informations
                </Button>
                <Button
                    variant="contained"
                    color="warning"
                    fullWidth
                    endIcon={<Edit />}
                    sx={{ mb: 1 }}
                    onClick={() => setOpenEditPasswordModal(true)}
                >
                    Modifier mon mot de passe
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    sx={{ mb: 1 }}
                    fullWidth
                    endIcon={<Delete />}
                    onClick={() => handleDelete()}
                >
                    Supprimer mon compte
                </Button>
                <Button
                    variant="outlined"
                    fullWidth
                    sx={{fontWeight: 500}}
                    onClick={() => handleLogout()}
                >
                    Se deconnecter
                </Button>

                <UserEditModal
                    open={openEditDetailModal}
                    title="Modifier mes informations"
                    fields={[
                        { label: 'Nom d’utilisateur', name: 'username' },
                        { label: 'Adresse email', name: 'email', type: 'email' },
                    ]}
                    values={formValues}
                    onChange={handleChange}
                    onClose={() => setOpenEditDetailModal(false)}
                    onSubmit={handleSubmit}
                />

                <UserEditModal
                    open={openEditPasswordlModal}
                    title="Changer mon mot de passe"
                    fields={[
                        { label: 'Nouveau mot de passe', name: 'password', type: 'password' },
                        { label: 'Confirmer le mot de passe', name: 'confirmPassword', type: 'password' },
                    ]}
                    values={formValues}
                    onChange={handleChange}
                    onClose={() => setOpenEditPasswordModal(false)}
                    onSubmit={() => {
                        // envoyer formValues.password
                    }}
                />
            </Box>
        </Grid>
    )
}

export default UserDetail