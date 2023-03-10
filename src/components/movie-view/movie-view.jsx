import PropType from "prop-types";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);

  console.log(movie);

  return (
    <div>
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
      <Row>
        {movies
          .filter((m) => m.genre.name === movie.genre.name)
          .map((m) => (
            <Col md={6} key={movie._id}>
              <MovieCard movie={m} />
            </Col>
          ))}
      </Row>
    </div>
  );
};

MovieView.propTypes = {
  image: PropType.string.isRequired,
  title: PropType.string.isRequired,
  genre: PropType.string.isRequired,
  director: PropType.string.isRequired,
  onBackClick: PropType.func.isRequired,
};
