import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { useState, useEffect } from "react";
export const ProfileView = ({ movies, user, tk, onDeregister, onSuccess }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [showUser, setShowUser] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showBirthday, setShowBirthday] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [birthday, setBirthday] = useState();
  const [token, setToken] = useState(storedToken ? storedToken : tk);

  const handleCloseUser = () => setShowUser(false);
  const handleShowUser = () => setShowUser(true);
  const handleCloseEmail = () => setShowEmail(false);
  const handleShowEmail = () => setShowEmail(true);
  const handleCloseBirthday = () => setShowBirthday(false);
  const handleShowBirthday = () => setShowBirthday(true);
  const handleClosePassword = () => setShowPassword(false);
  const handleShowPassword = () => setShowPassword(true);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleSubmitUser = (event) => {
    event.preventDefault();

    fetch(
      `https://myflix94.herokuapp.com/users/username/${user.userName}/${username}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
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
  const handleSubmitEmail = (event) => {
    event.preventDefault();
    fetch(
      `https://myflix94.herokuapp.com/users/email/${user.userName}/${email}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
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

  const handleSubmitBirthday = (event) => {
    event.preventDefault();

    fetch(
      `https://myflix94.herokuapp.com/users/birthday/${user.userName}/${birthday}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
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

  const handleSubmitPassword = (event) => {
    event.preventDefault();
    const data = {
      password: password,
    };

    fetch(`https://myflix94.herokuapp.com/users/password/${user.userName}`, {
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
          <span className="text-danger">{user.userName} </span>
          <br />
          <Button onClick={handleShowUser}>Update</Button>
          <Modal show={showUser} onHide={handleCloseUser}>
            <Modal.Header closeButton>
              <Modal.Title>Update Username</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmitUser}>
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
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleCloseUser}
                >
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              Successfully Updating Your Data Will Log You Out
              <Button variant="secondary" onClick={handleCloseUser}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <br />
        <div>
          <span className="text-danger">Email: </span>
          <span className="text-danger">{user.email} </span>
          <br />
          <Button onClick={handleShowEmail}>Update</Button>
          <Modal show={showEmail} onHide={handleCloseEmail}>
            <Modal.Header closeButton>
              <Modal.Title>Update Email</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmitEmail}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className="text-danger"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    minLength="8"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleCloseEmail}
                >
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              Successfully Updating Your Data Will Log You Out
              <Button variant="secondary" onClick={handleCloseEmail}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <br />
        <div>
          <span className="text-danger">Brithday: </span>
          <span className="text-danger">{user.birthday}</span>
          <br />
          <Button onClick={handleShowBirthday}>Update</Button>
          <Modal show={showBirthday} onHide={handleCloseBirthday}>
            <Modal.Header closeButton>
              <Modal.Title>Update Birthday</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmitBirthday}>
                <Form.Group controlId="formBirthday">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    className="text-danger"
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    minLength="8"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleCloseBirthday}
                >
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              Successfully Updating Your Data Will Log You Out
              <Button variant="secondary" onClick={handleCloseBirthday}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <br />
        <div>
          <Button onClick={handleShowPassword}>Update Password</Button>
          <Modal show={showPassword} onHide={handleClosePassword}>
            <Modal.Header closeButton>
              <Modal.Title>Update Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmitPassword}>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className="text-danger"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength="8"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleClosePassword}
                >
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              Successfully Updating Your Data Will Log You Out
              <Button variant="secondary" onClick={handleClosePassword}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div>
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
