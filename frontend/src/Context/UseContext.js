import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserContext = createContext({ email: '', password: '', auth: false })

const UserProvider = ({ children }) => {
    const navigate = useNavigate()
    
    const [user, setUser] = useState({
        email: '',
        password: ''
        // const userLocal = localStorage.getItem('user')
        // return JSON.parse(userLocal) || null
    })

    // useEffect(() => {
    //     localStorage.setItem('user', JSON.stringify(user))
    // }, [user])

    const login = (email, password) => {
        const newUser = { email: email, password: password, auth: true}
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
        const newUser = { email: '', password: '', auth: false}
        setUser(newUser)
        localStorage.removeItem('user')
    }
    
    const signup = (email, password) => {
        const newUser = { email: email, password: password, auth: true}
        setUser(newUser)
    }

    return (
        <UserContext.Provider value={{ user, setUser, login, loginWithoutAcc, logout, signup }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }