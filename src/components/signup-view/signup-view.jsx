import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const SignupView = () => {
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [birthday, setBirthday] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      userName: user,
      email: email,
      password: password,
      birthday: birthday,
    };

    fetch("https://myflix94.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup Successful");
        window.location.reload;
      } else {
        alert("Signup Failed");
      }
    });
  };

  return (
    <Form className="text-danger" onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          className="text-danger"
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
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
          required
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
          required
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
          required
          className="text-danger"
        />
      </Form.Group>
      <br />
      <Button type="submit">Submit</Button>
    </Form>
  );
};
