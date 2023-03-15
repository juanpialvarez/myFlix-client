import PropType from "prop-types";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ movies, user, token }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);

  const handleAddClick = (event) => {
    event.preventDefault();

    fetch(
      `https://myflix94.herokuapp.com/users/${user.userName}/movies/${movie._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => alert("Movie added to favorites"))
      .catch((e) => {
        console.log(e);
        alert("Something went wrong");
      });
  };

  const handleRemoveClick = (event) => {
    event.preventDefault();

    fetch(
      `https://myflix94.herokuapp.com/users/${user.userName}/movies/${movie._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        alert("Movie removed from favorites");
      })
      .catch((e) => {
        console.log(e);
        alert("Something went wrong");
      });
  };

  return (
    <>
      <div>
        <div>
          <img className="w-100" src={movie.imagePath} />
        </div>
        <div>
          <span className="text-danger">Title: </span>
          <span className="text-danger">{movie.title}</span>
        </div>
        <div>
          <span className="text-danger">Genre: </span>
          <span className="text-danger">{movie.genre.name}</span>
        </div>
        <div>
          <span className="text-danger">Director: </span>
          <span className="text-danger">{movie.director.name}</span>
        </div>
        <Link to={"/"}>
          <Button className="back-button">Back</Button>
        </Link>
      </div>
      <br />
      <h2 className="text-danger"> Similar Movies</h2>
      <div>
        {" "}
        <Button onClick={handleAddClick}>Add</Button>
        <Button onClick={handleRemoveClick}>Remove</Button>
      </div>
      <Row>
        {movies
          .filter((m) => m.genre.name === movie.genre.name)
          .map((m) => (
            <Col md={6} key={encodeURIComponent(movie._id)}>
              <MovieCard movie={m} user={user} token={token} />
            </Col>
          ))}
      </Row>
    </>
  );
};

// MovieView.propTypes = {
//   image: PropType.string.isRequired,
//   title: PropType.string.isRequired,
//   genre: PropType.string.isRequired,
//   director: PropType.string.isRequired,
// };
