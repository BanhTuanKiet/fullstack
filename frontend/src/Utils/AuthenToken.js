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
            console.log(authAccess)
            console.log('Access token is still valid.')
            return true
        } else {
            const authRefresh =  await CustomineAxios.post(`/token/authenToken`, user, {
                headers: {
                    'Authorization': `${refreshToken}`
                }
            })
            if (authRefresh.success) {
                console.log(authRefresh)
                console.log('Refresh token is still valid.')
                CustomineAxios.post(`/token/refreshToken`, user)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
                return true
            } else {
                console.log("............")
                return false
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export default AuthenToken