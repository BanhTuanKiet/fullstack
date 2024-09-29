import React, { useContext, useEffect, useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { UserContext } from '../Context/UseContext'
import AxiosNotAuthen from '../CustomineAxios/AxiosNotAuthen'
import { Success, Warning } from '../Utils/Notification'
import Debounce from '../Utils/Debounce'

function Login() {
    const { user, setUser, login, loginWithoutAcc } = useContext(UserContext)
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setDisabledBtn((user.email !== '' && user.email !== undefined && user.password !== '' && user.password !== undefined) ? false : true)
        // if (checked) {
        //   loginWithoutAcc()
        // }
    }, [user])

    const convertObject = (object) => {
      let stringNotify = ''
      if (object !== '') {
        return object
      }
      if (object.email === '') {
        stringNotify = object.password
      } else if (object.password === '') {
        stringNotify = object.email
      } else {
        stringNotify = object.email + object.password
      }
      return stringNotify
    }

    const handleEmail = (event) => {
      setUser({  ...user, email: event.target.value})
    }

    const handlePassword = (event) => {
      setUser({  ...user, password: event.target.value})
    }

    const handleChecked = (event) => {
      console.log(event.target.checked)
      setChecked(event.target.checked)
    }

    const handleLogin = async () => {
      const userLogin = { email: user.email, password: user.password }
        try {
          const res = await AxiosNotAuthen.post(`/login`, userLogin, { 
              headers: {
                'password': user.password
              }
          })
          if (res.success) {
            Success(`Welcome ${res.data[0].name}`)
            setTimeout(() => {
              login(res.data[0].name, user.email, user.password, res.data[0].avatar)
              localStorage.setItem('accessToken', JSON.stringify(res.accessToken))
              localStorage.setItem('refreshToken', JSON.stringify(res.refreshToken))
            }, 1500)
          } else {
            if (res.success) {
              return Success(res.message)
            }
            const response = convertObject(res.message)
            return Warning(response)
          }
        } catch (error) {
            console.log(error)
        }
    }

  const debouncedLogin = Debounce(handleLogin, 500)

  return (
    <Container fluid className="d-flex vh-100">
      <Row className="align-self-center w-100">
        <Col lg={3} md={4} sm={6} xs={12} className="mx-auto">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
                type="email"
                name='email'
                placeholder="Enter email" 
                value={user.email} 
                onChange={handleEmail}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control 
                type="text" 
                name='password'
                placeholder="Password" 
                value={user.password} 
                onChange={handlePassword}
              />
            </Form.Group>
            <Form.Group>
              {/* <Form.Check type='checkbox' className='my-3'>
                <Form.Check.Input type="checkbox" isValid checked={checked} onChange={handleChecked} />
                <Form.Check.Label>Continue without log in.</Form.Check.Label>
              </Form.Check> */}
            </Form.Group>
            <div className='d-flex justify-content-center'>
                <Button variant="outline-primary" onClick={debouncedLogin} disabled={disabledBtn}>
                  Log in
                </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
