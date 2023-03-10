import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand className="text-danger" as={Link} to={"/"}>
          My Flix
        </Navbar.Brand>
        <Navbar.Toggle
          className="text-danger"
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse className="text-danger" id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user ? (
              <>
                <Nav.Link className="text-danger" as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link className="text-danger" as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link className="text-danger" as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link className="text-danger" as={Link} to={`/profile`}>
                  Profile
                </Nav.Link>
                <Nav.Link className="text-danger" onClick={onLoggedOut}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
