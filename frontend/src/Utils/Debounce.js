const Debounce = (func) => {
    let timeOut
    return () => {
        console.log(timeOut)
        if (timeOut) {
            clearTimeout(timeOut)
            timeOut = null
        }

        timeOut = setTimeout(() => {
            func()
        }, 300)
    }
}

export default Debounce