import { Button, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { Link } from "react-router-dom";
export const ProfileView = ({
  movies,
  user,
  onUsernameUpdate,
  onDeregister,
}) => {
  return (
    <>
      <h1 className="text-danger">Profile</h1>
      <div>
        <div>
          <span className="text-danger">Name: </span>
          <span className="text-danger">{user.userName}</span>
          <Button onClick={onUsernameUpdate}>Update</Button>
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
          <Button onClick={onDeregister}>Deregister</Button>
        </div>
      </div>
      <Row>
        {user.favouriteMovies.length > 0 &&
          movies
            .filter((m) => user.favouriteMovies.includes(m._id))
            .map((m) => (
              <>
                <Col md={6} key={m._id}>
                  <MovieCard movie={m} />
                  <Button>Remove</Button>
                </Col>
              </>
            ))}
      </Row>
    </>
  );
};
