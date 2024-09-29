import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../page/Home'
import Login from '../page/Login'
import Signup from '../page/Signup'
import NotFound from '../page/NotFound'
import Profile from '../page/Profile'
import Cart from '../page/Cart'

function AppRoute() {
    return (
        <>    
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/cart' element={<Cart />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default AppRoute