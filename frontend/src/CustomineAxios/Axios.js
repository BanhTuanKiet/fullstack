import axios from "axios"
import AuthenToken from "../Utils/AuthenToken"
import { Warning } from "../Utils/Notification"

const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
})

instance.interceptors.request.use( async (config) => {
    // Do something before request is sent
    console.log("Are you sure?")

    // const user = JSON.parse(localStorage.getItem('user'))
    
    // const isTokenValid = await AuthenToken(user)

    // if (isTokenValid) {
    //     const accessToken = JSON.parse(localStorage.getItem('accessToken'))
    //     config.headers['Authorization'] = `${accessToken}`
        return config
    // } else {
    //     throw new Error("Invalid token. Please log in again.")
    // }
}, (error) => {
    // Do something with request error
    return Promise.reject(error)
})
// remove an interceptor later
// axios.interceptors.request.eject(instance)
instance.interceptors.response.use( async (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response)
    return response.data
}, (error) => {
    if (error.response && error.response.status === 403) {
        console.log(error)
        // Token has expired, redirecting to the login page 
        Warning('Your session has expired. Please log in again.')
        setTimeout(() => {
            window.location.href = '/login'
        }, 2000)
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
})

export default instance