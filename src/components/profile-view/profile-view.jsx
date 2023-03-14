import { Button, Row, Col, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { useState, useEffect } from "react";
export const ProfileView = ({
  movies,
  user,
  token,
  onUpdateClick,
  onDeregister,
}) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
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
          <span className="text-danger">Emeil</span>
          <span className="text-danger">{user.email}</span>
        </div>
        <div>
          <span className="text-danger">Brith Day: </span>
          <span className="text-danger">{user.birthday}</span>
        </div>
        <div>
          <br />
          <Button onClick={onUpdateClick}>Update</Button>
          <br />
          <br />
          <Button onClick={onDeregister}>Deregister</Button>
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
                <Col md={3} key={m._id}>
                  <MovieCard
                    className="mb-10"
                    key={m._id}
                    movie={m}
                    user={user}
                    token={token}
                  />
                </Col>
              </>
            ))}
      </Row>
    </>
  );
};
