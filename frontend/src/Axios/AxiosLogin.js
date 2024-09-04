import { Bounce, toast } from 'react-toastify'
import CustomineAxios from '../CustomineAxios/Axios'

const AxiosLogin = async (user) => {
    try {
        const res = await CustomineAxios.post(`/login`, user, { 
            headers: {
              'password': user.password
            }
        })
        if (res.success) {
            toast.success(`Welcome ${res.data[0].name}`, {
                position: "top-right",
                autoClose: 800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
            return res
        }
    } catch (error) {
        console.log(error)
    }
}

export default AxiosLogin