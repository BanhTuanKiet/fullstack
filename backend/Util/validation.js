const validation =  (req, res, next) => {
    const { name, email, password } = req.body
    let errs = { name: '', email: '', password: '' }

    const name_pattern = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    const email_pattern = /^[^\s@]+@reqres.in$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if (name !== undefined) {
        if (name === '') {
            errs.name = 'Name should not be empty.'
        } else if (!name_pattern.test(name)) {
            errs.name = 'Name does not match the required format.'
        }
    } 

    if (email === '') {
        errs.email = 'Email should not be empty.'
    } else if (!email_pattern.test(email)) {
        errs.email = 'Email does not match the required format.'
    }

    if (password === '') {
        errs.password = 'Password should not be empty.'
    } else if (!password_pattern.test(password)) {
        errs.password = 'Password does not match the required format.'
    }

    if (errs.name === '' && errs.email === '' && errs.password === '') {
        return next()
    }

    return res.json({ success: false, message: errs })
}

module.exports = { 
    validation 
}