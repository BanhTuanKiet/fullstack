import axios from "axios"
import { Warning } from "../Utils/Notification"

const instance = axios.create({
    baseURL: 'http://localhost:3000/auth',
})

instance.interceptors.request.use( async (config) => {
    // Do something before request is sent
    return config
}, (error) => {
    // Do something with request error
    return Promise.reject(error)
})
// remove an interceptor later
// axios.interceptors.request.eject(instance)
instance.interceptors.response.use( async (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
}, (error) => {
    if (error.response && error.response.status === 403) {
        // Token has expired, redirecting to the login page 
        Warning('Your session has expired. Please log in again.')
        return setTimeout(() => {
            return window.location.href = '/login'
        }, 1600)
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
})

export default instance