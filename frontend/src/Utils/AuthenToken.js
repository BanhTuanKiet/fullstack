import CustomineAxios from '../CustomineAxios/Axios'

const AuthenToken = async ( user ) => {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'))
    const refreshToken = JSON.parse(localStorage.getItem('refreshToken'))

    try {
        const authAccess =  await CustomineAxios.post(`/token/authenToken`, user, {
            headers: {
                'Authorization': `${accessToken}`
            }
        })

        if (authAccess.success) {
            console.log('Access token is still valid.')
        } else {
            const authRefresh =  await CustomineAxios.post(`/token/authenToken`, user, {
                headers: {
                    'Authorization': `${refreshToken}`
                }
            })
            if (authRefresh.success) {
                console.log('Refresh token is still valid.')
                CustomineAxios.post(`/token/refreshToken`, user)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
            } else {
                return false
            }
        }
        return true
    } catch (error) {
        console.log(error)
    }
}

export default AuthenToken