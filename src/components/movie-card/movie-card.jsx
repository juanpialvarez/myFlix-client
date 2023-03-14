import PropType from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const MovieCard = ({ movie, user, token }) => {
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
        console.log(data);
        console.log(movie._id);
        console.log(user.userName);
        alert("Movie removed from favorites");
      })
      .catch((e) => {
        console.log(e);
        alert("Something went wrong");
      });
  };

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
        <Button
          as={Link}
          to={`/movies/${encodeURIComponent(movie._id)}`}
          className="text-decoration-none"
          variant="link"
        >
          Open
        </Button>
        <Card.Footer>
          <Button onClick={handleAddClick}>Add</Button>
          <Button onClick={handleRemoveClick}>Remove</Button>
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
