import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Navbar.css';

const MyNavbar = () => {
    return (
        <Navbar bg="primary" variant="dark" expand="sm">
            <Navbar.Brand href="#home">Skill Swap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="#about">About Us</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNavbar;

