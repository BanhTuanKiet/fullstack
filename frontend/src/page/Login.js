import React, { useContext, useEffect, useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { UserContext } from '../Context/UseContext'
import { Bounce, toast } from 'react-toastify'
import Validation from '../Utils/Validation'
import axios from 'axios'

function Login() {
    const { user, setUser, login, loginWithoutAcc } = useContext(UserContext)
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setDisabledBtn((user.email !== '' && user.password !== '') ? false : true)
        if (checked) {
          loginWithoutAcc()
        }
    }, [user, checked])

    const convertObject = (object) => {
      let stringNotify = ''
      if (object.email === '') {
        stringNotify = object.password
      } else if (object.password === '') {
        stringNotify = object.email
      } else {
        stringNotify = object.email + "\n" + object.password
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

    const handleLogin = () => {
      const valid = Validation(user)

      if (valid.email === '' && valid.password === '') {
        // toast.success(`Welcome ${user.email}.`, {
        //   position: "top-right",
        //   autoClose: 800,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        //   transition: Bounce,
        // })

        setTimeout(() => {
          axios.post(`http://localhost:3000/login`, user)
          .then(res => {
            if (res.data.success) {
              const jsonUsername = JSON.stringify(res.data.name)
              let username = ''
              for (let i = 10; i < 22; i++) {
                username += jsonUsername[i]
              }
              console.log(username)
              login(username, user.email, user.password)
            }
            if (!res.data.success) {
              toast.warning(((res.data.message)), {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              })
            }
          })
        }, 1200)
      } else {
        const respond = convertObject(valid)
        toast.warning(((respond)), {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        })
      }
    }

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
                <Button variant="outline-primary" onClick={handleLogin} disabled={disabledBtn}>
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
