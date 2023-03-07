import PropType from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
  );
};

MovieCard.propTypes = {
  book: PropType.shape({
    title: PropType.string,
  }).isRequired,
  onBookClick: PropType.func.isRequired,
};
