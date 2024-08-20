import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../page/Home'
import Login from '../page/Login'
import Signup from '../page/Signup'
import NotFound from '../page/NotFound'
import { UserContext } from '../Context/UseContext'
import Profile from '../page/Profile'


function AppRoute({ widthScreen }) {
    const { user } = useContext(UserContext)
    return (
        <>
            {widthScreen &&     
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            }
        </>
    )
}

export default AppRoute