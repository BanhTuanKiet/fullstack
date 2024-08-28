import React, { useContext } from 'react'
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap'
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
        (user.auth && user.auth !== undefined) ? logout() : navigate('/login')
    }

    const handleSignup = (event) => {
        navigate('/signup')
    }

    const handleProfile = (event) => {
        event.preventDefault()
        navigate('/profile')
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
                        <input className="form-control me-lg-2 py-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch}/>
                    </Nav>
                    <NavDropdown 
                        title= {user && 
                            <span>
                                <Image 
                                    src={user.avatar} 
                                    roundedCircle 
                                    style={{ width: '48px', height: '48px' }} >
                                </Image>
                            </span>}
                        // id="basic-nav-dropdown"
                    >
                        {(!user.auth && user.auth !== undefined) && 
                            (<NavDropdown.Item onClick={handleSignup}>
                                Signup
                            </NavDropdown.Item>)
                        }
                        {(!user.auth && user.auth !== undefined) && <NavDropdown.Divider />}
                        <NavDropdown.Item onClick={handleProfile}>Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogin}>
                            {(!user.auth && user.auth !== undefined) ? "Log in" : "Log out"}
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation