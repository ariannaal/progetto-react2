
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../App.css';
import logo from "../assets/images/logo.png"

function MyNavbar() {
    return (
        <Navbar collapseOnSelect expand="lg" className='navbar' variant="dark">
            <Container fluid>
                <Navbar.Brand href="#home" className="d-flex align-items-center">
                    <img
                        alt="logo"
                        src={logo}
                        width="90px"
                        height="90px"
                        className="d-inline-block align-top me-2"
                    />
                    ClearSky
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="#home" className="me-2">Home</Nav.Link>
                        <Nav.Link href="#features">About us</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;