import React, { useContext } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { UserContext } from '../Context/UseContext'
import { useNavigate } from 'react-router-dom'
import '../Navigation/Navigation.css'

function Navigation({ setSelectedBrand, setSearch }) {
    const navigate = useNavigate()
    const { user, logout } = useContext(UserContext)

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const handleLogin = (event) => {
        user.auth ? logout() : navigate('/login')
    }

    const handleSignup = (event) => {
        navigate('/signup')
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary d-flex justify-content-center">
            <Container className='mx-1'>
                <Navbar.Brand href="" onClick={() => setSelectedBrand('')}>React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="" onClick={() => setSelectedBrand('Nike')}>Nike</Nav.Link>
                        <Nav.Link href="" onClick={() => setSelectedBrand('Adidas')}>Adidas</Nav.Link>
                        <Nav.Link href="" onClick={() => setSelectedBrand('Puma')}>Puma</Nav.Link>
                        <Nav.Link href="" onClick={() => setSelectedBrand('Vans')}>Vans</Nav.Link>
                        <input class="form-control me-lg-2 py-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch}/>
                    </Nav>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/profile">
                            {user && 
                                <i class="fa-solid fa-user"><span>{user.email}</span></i>
                            }
                        </NavDropdown.Item>
                        {!user.auth && 
                            (<NavDropdown.Item onClick={handleSignup}>
                                Signup
                            </NavDropdown.Item>)
                        }
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogin}>
                            {!user.auth ? "Log in" : "Log out"}
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation