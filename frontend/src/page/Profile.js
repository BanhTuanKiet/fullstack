import React, { useContext } from 'react'
import { UserContext } from '../Context/UseContext'
import NotService from './NotServe'

function Profile() {
    const { user } = useContext(UserContext)

    if (user && !user.auth) {
        return <NotService />
    }

    return (
        <div>{user.email}</div>
    )
}

export default Profile