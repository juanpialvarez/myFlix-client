import PropType from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

export const MovieCard = ({ movie }) => {
  return (
    <Card
      as={Link}
      to={`/movies/${encodeURIComponent(movie._id)}`}
      style={{ cursor: "pointer" }}
      className="text-decoration-none h-100"
    >
      <Card.Img variant="top" src={movie.imagePath} />
      <Card.Title>{movie.title}</Card.Title>
      <Card.Body className="text-truncate"> {movie.description} </Card.Body>
      <div>
        <Card.Footer>
          <Button className="text-decoration-none">Open</Button>
        </Card.Footer>
      </div>
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
