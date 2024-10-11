import React, { useContext, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap'
import AxiosNotAuth from '../CustomineAxios/AxiosNotAuth'
import { UserContext } from '../Context/UseContext'
import { useNavigate } from 'react-router-dom'
import '../Navigation/Navigation.css'

function Navigation({ setSearch, setNewData }) {
    const [selectedBrand, setSelectedBrand] = useState('')
    const { user, logout } = useContext(UserContext)

    const navigate = useNavigate()

    const fetchDataByBrand = async (event) => {
        const curSelectedBrand = event.target.id
    
        if (selectedBrand === curSelectedBrand) {
            return
        }
    
        setSelectedBrand(curSelectedBrand)
    
        try {
            if (curSelectedBrand === '') {
                console.log("Fetching all data")
                const res = await AxiosNotAuth.get()
                if (res.success) {
                    setNewData(res.data)
                }
            } else {
                console.log(`Fetching data for brand: ${curSelectedBrand}`)
                const res = await AxiosNotAuth.get(`company/${curSelectedBrand}`)
                if (res.success) {
                    setNewData(res.data)
                }
            }
        } catch (error) {
            console.error("Error fetching data by brand:", error)
        }
    }
    

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const handleLogin = () => {
        (user.auth && user.auth !== undefined) ? logout() : navigate('/login')
    }

    const handleSignup = (event) => {
        event.preventDefault()
        navigate('/signup')
    }

    const handleProfile = (event) => {
        event.preventDefault()
        navigate('/profile')
    }

    const handleCart = (event) => {
        event.preventDefault()
        navigate(`/cart`)
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary d-flex justify-content-center">
            <Container className='mx-1'>
                <Navbar.Brand href="" onClick={fetchDataByBrand}>React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="" id='Nike' onClick={fetchDataByBrand}>Nike</Nav.Link>
                        <Nav.Link href="" id='Adidas' onClick={fetchDataByBrand}>Adidas</Nav.Link>
                        <Nav.Link href="" id='Puma' onClick={fetchDataByBrand}>Puma</Nav.Link>
                        <Nav.Link href="" id='Vans' onClick={fetchDataByBrand}>Vans</Nav.Link>
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
                        <NavDropdown.Item onClick={handleCart}>Cart</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleProfile}>Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogin}>
                            {(!user.auth && user.auth !== undefined) ? "Log in" : "Log out"}
                        </NavDropdown.Item>
                        {(!user.auth && user.auth !== undefined) && <NavDropdown.Divider />}
                        {(!user.auth && user.auth !== undefined) && 
                            (<NavDropdown.Item onClick={handleSignup}>
                                Signup
                            </NavDropdown.Item>)
                        }
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation