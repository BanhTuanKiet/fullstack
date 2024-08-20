import React, { useContext, useEffect, useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UseContext'

function Signup() {
  const navigate = useNavigate()
  const { signup } = useContext(UserContext)
  const [disabledBtn, setDisabledBtn] = useState(true)
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

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

  return (
    <Container fluid className="d-flex vh-100">
      <Row className="align-self-center w-100">
        <Col lg={3} md={4} sm={6} xs={12} className="mx-auto">
          <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
                type="name"
                name='name'
                placeholder="Enter name" 
                value={user.name} 
                onChange={handleName}
              />
            </Form.Group>

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
                type="password" 
                name='password'
                placeholder="Password" 
                value={user.password} 
                onChange={handlePassword}
              />
            </Form.Group>

            <div className='d-flex justify-content-center'>
                <Button variant="outline-primary" disabled={disabledBtn} 
                  onClick={() => {
                    signup(user.email, user.password)
                    navigate('/login')
                  }
                }>
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
