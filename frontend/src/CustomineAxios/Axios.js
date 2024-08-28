import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
})

instance.interceptors.request.use((config) => {
    // Do something before request is sent
    console.log("Are you sure?")
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})
// remove an interceptor later
// axios.interceptors.request.eject(instance)

instance.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
})

export default instance