const Debounce = (func) => {
    let timeOut
    return () => {
        const context = this
        console.log(timeOut)
        if (timeOut) {
            clearTimeout(timeOut)
            timeOut = null
        }

        timeOut = setTimeout(() => {
            func()
        }, 1000)
    }
}

export default Debounce