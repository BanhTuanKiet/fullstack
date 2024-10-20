import React, { useContext, useEffect, useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UseContext'
import AxiosNotAuth from '../CustomineAxios/AxiosNotAuth'
import { Success, Warning } from '../Utils/Notification'

function Signup() {
  const navigate = useNavigate()
  const { signup, user, setUser } = useContext(UserContext)
  const [disabledBtn, setDisabledBtn] = useState(true)

  useEffect(() => {
    setDisabledBtn((user.name !== '' && user.email !== '' && user.password !== '') ? false : true)
  }, [user])

  const handleName = (event) => {
    setUser({  ...user, name: event.target.value})
  }

  const handleEmail = (event) => {
    setUser({  ...user, email: event.target.value})
  }

  const handlePassword = (event) => {
    setUser({  ...user, password: event.target.value})
  }

  const handleSignup = () => {
    const userSignup = { name: user.name, email: user.email, password: user.password }
    AxiosNotAuth.post(`http://localhost:3000/login/signup`, userSignup)
      .then(res => {
        if (res.success) {
          Success(res.message)
          setTimeout(() => {
            signup(user.name, user.email, user.password)
          }, 1000)
        } else {
          Warning(res.message)
        }
      })
  }

  return (
    <Container fluid className="d-flex vh-100">
      <Row className="align-self-center w-100">
        <Col lg={3} md={4} sm={6} xs={12} className="mx-auto">
          <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control 
                type="name"
                name='name'
                placeholder="Enter name" 
                value={"BanhTuanKiet"} 
                onChange={handleName}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
                type="email"
                name='email'
                placeholder="Enter email" 
                value={"george.bluth@reqres.in"} 
                onChange={handleEmail}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control 
                type="password" 
                name='password'
                placeholder="Password" 
                value={"BanhTuanKiet123"} 
                onChange={handlePassword}
              />
            </Form.Group>

            <div className='d-flex justify-content-center'>
                <Button variant="outline-primary" disabled={false} onClick={handleSignup}>
                  Sign up
                </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Signup
