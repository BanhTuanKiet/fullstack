import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserContext = createContext({ email: '', password: '', auth: false })

const UserProvider = ({ children }) => {
    const navigate = useNavigate()
    
    const [user, setUser] = useState(
        {
        name: "",
        email: "",
        password: "",
        auth: false
    }
        // () => {
        //     const userLocal = localStorage.getItem('user')
        //     return JSON.parse(userLocal) || null
        // }
    )

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user))
    }, [user])

    const login = (name, email, password, avatar) => {
        const newUser = { name: name, email: email, password: password, avatar: avatar, auth: true}
        setUser(newUser)
        navigate('/')
    }

    const loginWithoutAcc = () => {
        // const newUser = { email: '', password: '', auth: true}
        // setUser(newUser)
        // localStorage.removeItem('user')
        // navigate('/')
    }

    const logout = () => {
        const newUser = { name: '', email: '', password: '', auth: false}
        setUser(newUser)
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }
    
    const signup = (name, email, password) => {
        const newUser = { name: name, email: email, password: password, auth: true}
        setUser(newUser)
        navigate('/login')
    }

    return (
        <UserContext.Provider value={{ user, setUser, login, loginWithoutAcc, logout, signup }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }