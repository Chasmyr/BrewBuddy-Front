import { useSelector } from "react-redux"
import Footer from "../layout/Footer"
import Header from "../layout/Header"
import { RootState } from "../store/store"
import { useEffect } from "react"
import { useNavigate } from "react-router"

const AccountPage = () => {

    const userToken = useSelector((state: RootState) => state.user.token)
    const navigate = useNavigate()

    useEffect(() => {
        if(!userToken) navigate('/login')
    }, [])

    return (
        <>
            <Header />
            <p>Account</p>
            <Footer />
        </>
    )
}

export default AccountPage