const validation = (user) => {
    let errs = { name: '', email: '', password: '' }

    const name_pattern =  /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    const email_pattern = /^[^\s@]+@reqres.in$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if (user.name !== undefined) {
        if (user.name === '') {
            errs.name = 'Name should not be empty.'
        } else if (!name_pattern.test(user.name)) {
            errs.name = 'Name does not match the required format.'
        }
    } 

    if (user.email === '') {
        errs.email = 'Email should not be empty.'
    } else if (!email_pattern.test(user.email)) {
        errs.email = 'Email does not match the required format.'
    }

    if (user.password === '') {
        errs.password = 'Password should not be empty.'
    } else if (!password_pattern.test(user.password)) {
        errs.password = 'Password does not match the required format.'
    }

    return errs
}

module.exports = validation