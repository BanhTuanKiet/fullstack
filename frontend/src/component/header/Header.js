import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Input from '../searching/Input'

function Header({ data, setData }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary w-100 ">
      <Container className='col-12 col-lg-9'>
        <Navbar.Brand href="">Shopping</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Category" id="basic-nav-dropdown">
              <NavDropdown.Item href="/nike">Nike</NavDropdown.Item>
              <NavDropdown.Item href="/adidas">Adidas</NavDropdown.Item>
              <NavDropdown.Item href="/puma">Puma</NavDropdown.Item>
              <NavDropdown.Item href="/vans">Vans</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Price" id="basic-nav-dropdown">
              <NavDropdown.Item href="/50">$50</NavDropdown.Item>
              <NavDropdown.Item href="/100">$100</NavDropdown.Item>
              <NavDropdown.Item href="/150">$150</NavDropdown.Item>
              <NavDropdown.Item href="/200">$200</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Color" id="basic-nav-dropdown">
              <NavDropdown.Item href="/light">Light</NavDropdown.Item>
              <NavDropdown.Item href="/dark">Dark</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Container className='col-12 col-lg-3'>
        <div className='d-flex flex-row w-100'>
          <Input data={data} setData={setData} />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
