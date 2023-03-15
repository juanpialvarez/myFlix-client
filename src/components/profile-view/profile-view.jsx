import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { useState, useEffect } from "react";
export const ProfileView = ({
  movies,
  user,
  token,
  onDeregister,
  onSuccess,
}) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [birthday, setBirthday] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      userName: username || user.userName,
      email: email || user.email,
      birthday: birthday || user.birthday,
      password: password || user.password,
    };

    fetch(`https://myflix94.herokuapp.com/users/update/${user.userName}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          alert("Update Successful");
          window.location.reload;
          response.json();
          onSuccess();
        } else {
          alert("Update Failed");
        }
      })
      .then((data) => {})
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    fetch(`https://myflix94.herokuapp.com/users/${user.userName}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          alert("Account Deleted");
          window.location.reload;
          response.json();
          onDeregister();
        } else {
          alert("Account Deleted");
        }
      })
      .then((data) => {})
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetch(`https://myflix94.herokuapp.com/users/${user.userName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFavoriteMovies(data.favouriteMovies);
      })
      .catch((e) => {
        console.log(e);
        alert("error");
      });
  }, [token]);

  return (
    <>
      <h1 className="text-danger">Profile</h1>
      <div>
        <div>
          <span className="text-danger">Name: </span>
          <span className="text-danger">{user.userName}</span>
        </div>
        <div>
          <span className="text-danger">Email: </span>
          <span className="text-danger">{user.email}</span>
        </div>
        <div>
          <span className="text-danger">Brith Day: </span>
          <span className="text-danger">{user.birthday}</span>
        </div>
        <div>
          <br />
          <Button onClick={handleShow}>Update</Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Update</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    className="text-danger"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength="8"
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className="text-danger"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className="text-danger"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="formBirthday">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => {
                      setBirthday(e.target.value);
                    }}
                    className="text-danger"
                  />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit" onClick={handleClose}>
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              Successfully Updating Your Data Will Log You Out
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <br />
          <br />
          <Button onClick={handleDelete}>Deregister</Button>
          <br />
        </div>
      </div>
      <Row>
        <h1 className="text-danger">Favorite Movies</h1>
        {favoriteMovies.length > 0 &&
          movies
            .filter((m) => favoriteMovies.includes(m._id))
            .map((m) => (
              <>
                <Col className="mb-10" md={3} key={encodeURIComponent(m._id)}>
                  <MovieCard movie={m} />
                </Col>
              </>
            ))}
      </Row>
    </>
  );
};
