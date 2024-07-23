import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from "react-icons/fa"

function Login() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPasword] = useState(false)

  const handlePassword = (event) => {
    setPassword(event.target.value)
    console.log(password)
  }

  const handleShowPassword = (event) => {
    // event.preventDefault()
    setShowPasword(!showPassword)
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ marginTop: "96px" }}>
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Form>
            <h3>Login</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
              <Form.Control 
                type={showPassword ? "text" : "password"} 
                placeholder="Password"
                value={password}
                onChange={handlePassword}
              />
              <div 
                className='position-absolute' 
                style={{ 
                  right: "10px", 
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer"
                }}
                onClick={handleShowPassword}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
