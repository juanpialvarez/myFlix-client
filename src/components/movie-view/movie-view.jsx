import PropType from "prop-types";
import { Button } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
  return (
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
      <Button onClick={onBackClick}>Back</Button>
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
