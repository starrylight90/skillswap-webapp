import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css';

const MyNavbar = () => {
    return (
        <Navbar bg="primary" variant="dark" expand="sm">
            <Navbar.Brand href="#home">Skill Swap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {/* Use Link instead of a regular anchor tag */}
                    <Nav.Link as={Link} to="/AboutUs">About Us</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNavbar;

