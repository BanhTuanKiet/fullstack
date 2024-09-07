import axios from "axios"
// import { authenToken } from "../../../backend/middleware/authenToken"
// import { Warning } from "../component/Notification"

const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
})

instance.interceptors.request.use( async (config) => {
    // Do something before request is sent
    console.log("Are you sure?")
    // const res = await authenToken()
    // if (res.success) {
        return config
    // }
    // Warning(res.message)
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
    return Promise.reject(error)
})

export default instance