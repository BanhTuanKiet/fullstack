import axios from "axios"
import { Warning } from "../Utils/Notification"

const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: true
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

instance.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
}, (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response && error.response.status === 429) {
        Warning('Too many requests from this IP, please try again later.')
        return Promise.reject(error)
    }
    return Promise.reject(error)
})

export default instance