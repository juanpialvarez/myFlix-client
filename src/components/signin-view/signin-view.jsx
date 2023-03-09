import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
          minLength="8"
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </label>
      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => {
            setBirthday(e.target.value);
          }}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
