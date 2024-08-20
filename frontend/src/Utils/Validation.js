const Validation = (user) => {
    let errs = { email: '', password: '' }

    const email_pattern = /^[^\s@]+@reqres.in$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

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

export default Validation