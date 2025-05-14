import { Delete, Edit } from "@mui/icons-material"
import { Avatar, Box, Button, Chip, Divider, Grid, Typography } from "@mui/material"
import { UserInfo } from "../../type/user"
import { formattedDate } from "../../utils/date"
import { useState } from "react"
import UserEditModal from "./UserEditModal"

type  UserDetailProps = {
    user: UserInfo
}

const UserDetail: React.FC<UserDetailProps> = ({user}) => {

    const [openEditDetailModal, setOpenEditDetailModal] = useState(false)
    const [openEditPasswordlModal, setOpenEditPasswordModal] = useState(false)

    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
    })

    const [formPassword, setFormPassword] = useState({
        password: ''
    })

    const handleChange = (field: string, value: string) => {
        setFormValues((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = () => {
        console.log('Form submitted:', formValues)
        // Appel à l'API ou mise à jour store ici
        setOpenEditDetailModal(false)
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
                    fullWidth
                    endIcon={<Delete />}
                >
                    Supprimer mon compte
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