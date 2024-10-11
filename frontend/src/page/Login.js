import React, { useContext, useEffect, useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { UserContext } from '../Context/UseContext'
import AxiosNotAuth from '../CustomineAxios/AxiosNotAuth'
import { Success, Warning } from '../Utils/Notification'
import Debounce from '../Utils/Debounce'
import { useNavigate } from 'react-router-dom'

function Login() {
    const { user, setUser, login } = useContext(UserContext)
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [otp, setOTP] = useState('')
    const [data, setData] = useState({})
    // const [qr, setQr] = useState('')
    // const [checked, setChecked] = useState(false)

    const navigate = useNavigate()

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

    const handleOTP = (event) => {
      setOTP(event.target.value)
    }

    const handleLogin = async () => {
      const userLogin = { email: user.email, password: user.password }
        try {
          const res = await AxiosNotAuth.post(`/login`, userLogin, { 
              headers: {
                'password': user.password
              }
          })
    
          if (res.success) {
            setData(res)
          } else {
            const response = convertObject(res.message)
            return Warning(response)
          }
        } catch (error) {
            console.log(error)
        }
    }

  const verifyOTP = async () => {
    try {
      const res = await AxiosNotAuth.post(`/login/verifyOTP`, { otp, email: user.email})
      if (res.success) {
        console.log(data)
        Success(`Welcome ${data.data[0].name}`)
        localStorage.setItem('accessToken', JSON.stringify(data.accessToken))
        localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken))
        setTimeout(() => {
          login(data.data[0].name, user.email, user.password, data.data[0].avatar)
        }, 1500)
      } else {
        Warning(res.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const debouncedLogin = Debounce(handleLogin, 300)

  return (
    <Container fluid className="d-flex vh-100">
        <Row className="align-self-center w-100">
          <Col lg={4} md={5} sm={6} xs={12} className="mx-auto" style={{ height: "400px" }}>
            <Form className='mb-5 mt-5'>
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
                <Form.Check type='checkbox' className='my-3'>
                  {/* <Form.Check.Input type="checkbox" isValid checked={} />
                  <Form.Check.Label>Continue without an account.</Form.Check.Label> */}
                </Form.Check>
              </Form.Group>
              <div className='d-flex justify-content-center'>
                  <Button variant="outline-primary" onClick={debouncedLogin} disabled={disabledBtn}>
                    Log in
                  </Button>
              </div>
            </Form>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control 
                  type="text"
                  name='otp'
                  placeholder="Enter otp" 
                  value={otp} 
                  onChange={handleOTP}
                />
              </Form.Group>
              <div className='d-flex justify-content-center'>
                  <Button variant="outline-primary" onClick={verifyOTP} disabled={disabledBtn}>
                    Verify
                  </Button>
              </div>
            </Form>
            {/* <div className='d-flex justify-content-center'>
              {qr && <img src={qr} alt='qr'/>}
            </div> */}
          </Col>
        </Row>
    </Container>
  )
}

export default Login
