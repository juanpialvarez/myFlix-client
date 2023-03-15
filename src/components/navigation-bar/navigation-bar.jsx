import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut, movies }) => {
  const [title, setTitle] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    const movie = new Promise((resolve, reject) => {
      let m = movies.filter((m) => title.includes(m.title));
      if (m && m.length > 0) {
        resolve(m);
      } else {
        reject(`Movie ${title} not found`);
      }
    });
    movie
      .then((m) => {
        [m] = m;
        window.location.replace(`/movies/${encodeURIComponent(m._id)}`);
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          My Flix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                <Form onSubmit={handleSubmit} className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    value={title}
                    className="me-2 text-danger"
                    aria-label="Search"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Button variant="outline-primary" type="submit">
                    Search
                  </Button>
                </Form>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
