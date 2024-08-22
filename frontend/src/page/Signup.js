import React, { useContext, useEffect, useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UseContext'
import Validation from '../Utils/Validation'
import axios from 'axios'
import { Bounce, toast } from 'react-toastify'

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

  const handleSignup = () => {
    // const valid = Validation(user)
    // console.log(valid)

    // if (valid.email === '' && valid.name === '' && valid.password === '') {
    //   setTimeout(() => {
    //     axios
    //       .post(`http://localhost:3000/signup`, user)
    //       .then(res => {
    //         if (res.data.success) {
    //           signup(user.name, user.email, user.password)
    //         }
    //         if (!res.data.success) {
    //           toast.warning(((res.data.message)), {
    //             position: "top-right",
    //             autoClose: 1500,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //             transition: Bounce,
    //           })
    //         }
    //       })
    //   }, 1200)
    // } else {
    //   toast.warning(((JSON.stringify(valid))), {
    //     position: "top-right",
    //     autoClose: 1500,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //     transition: Bounce,
    //   })
    // }
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

                onChange={handlePassword}
              />
            </Form.Group>

            <div className='d-flex justify-content-center'>
                <Button variant="outline-primary" disabled={disabledBtn} 
                  onClick={() => {
                    // signup(user.email, user.password)
                    // navigate('/login')
                    handleSignup()
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
