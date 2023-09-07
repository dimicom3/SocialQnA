import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import NavDropdown from "react-bootstrap/esm/NavDropdown";
import Navbar from 'react-bootstrap/Navbar';
import { logOut } from "../service/auth.service";

interface Props {
  user?: any
}

export default function NavbarMain(props: Props) {
  function handleLogOut()
  {
    logOut();
    window.location.reload();
  }

  return (
    <Navbar bg="white" expand="lg">
      <Container>
        <Navbar.Brand href="/">SocialQnA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          {Object.keys(props.user).length ? (
            <Nav className="me-right">
              <NavDropdown title={props.user.email} id="basic-nav-dropdown">
                <NavDropdown.Item href={`/profile/${props.user.id}`}>
                  Profil
                </NavDropdown.Item>
                <NavDropdown.Item href="/settings">
                  Podesavanja
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4" onClick={handleLogOut}>
                  Odjavi se
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ): (
            <Nav className="me-right">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register" color="success">Register</Nav.Link>
            </Nav>
          ) }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}