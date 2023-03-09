import PropType from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card
      onClick={() => {
        onMovieClick(movie);
      }}
      style={{ cursor: "pointer" }}
    >
      <Card.Img variant="top" src={movie.imagePath} />
      <Card.Title>{movie.title}</Card.Title>
      <Card.Body> {movie.description} </Card.Body>
      <Button
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        Open
      </Button>
    </Card>
  );
};

MovieCard.propTypes = {
  book: PropType.shape({
    title: PropType.string,
  }).isRequired,
  onMovieClick: PropType.func.isRequired,
};
