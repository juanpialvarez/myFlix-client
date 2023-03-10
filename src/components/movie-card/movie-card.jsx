import PropType from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card
      as={Link}
      to={`/movies/${encodeURIComponent(movie._id)}`}
      style={{ cursor: "pointer" }}
      className="text-decoration-none"
    >
      <Card.Img variant="top" src={movie.imagePath} />
      <Card.Title>{movie.title}</Card.Title>
      <Card.Body> {movie.description} </Card.Body>
      <Button
        as={Link}
        to={`/movies/${encodeURIComponent(movie._id)}`}
        className="text-decoration-none"
        variant="link"
      >
        Open
      </Button>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropType.shape({
    title: PropType.string,
    description: PropType.string,
    image: PropType.string,
  }).isRequired,
};
