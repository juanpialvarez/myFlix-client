import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovie] = useState([
    {
      _id: 1,
      title: "The Shawshank Redemption",
      description:
        "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
      genre: {
        name: "Drama",
        description:
          "Should contain numerous consecutive scenes of characters portrayed to effect a serious narrative throughout the title, usually involving conflicts and emotions. This can be exaggerated upon to produce melodrama.",
      },
      director: {
        name: "Frank Darabont",
        biography:
          "Frank Árpád Darabont is an American film director, screenwriter and producer. He has been nominated for three Academy Awards and a Golden Globe Award. In his early career, he was primarily a screenwriter for such horror films as A Nightmare on Elm Street 3: Dream Warriors (1987), The Blob (1988) and The Fly II (1989). As a director, he is known for his film adaptations of Stephen King novellas and novels, such as The Shawshank Redemption (1994), The Green Mile (1999), and The Mist (2007).",
        birth: { $date: { $numberLong: "-344736000000" } },
        death: null,
      },
      imagePath:
        "https://www.imdb.com/title/tt0111161/mediaviewer/rm1690056449/?ref_=tt_ov_i",
      actors: ["Tim Robbins", "Morgan Freeman"],
      featured: false,
    },
    {
      _id: 2,
      title: "The Dark Knight Rises",
      description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      genre: {
        name: "Action",
        description:
          "Should contain numerous scenes where action is spectacular and usually destructive. Often includes non-stop motion, high energy physical stunts, chases, battles, and destructive crises (floods, explosions, natural disasters, fires, etc.)",
      },
      director: {
        name: "Christopher Nolan",
        biography:
          "Christopher Edward Nolan is a British-American filmmaker. Known for his Hollywood blockbusters with complex storytelling, Nolan is considered a leading filmmaker of the 21st century. His films have grossed $5 billion worldwide. The recipient of many accolades, he has been nominated for five Academy Awards, five BAFTA Awards and six Golden Globe Awards. In 2015, he was listed as one of the 100 most influential people in the world by Time, and in 2019, he was appointed Commander of the Order of the British Empire for his contributions to film.",
        birth: { $date: "1970-07-30T00:00:00Z" },
        death: null,
      },
      imagePath:
        "https://www.imdb.com/title/tt0468569/mediaviewer/rm4023877632/?ref_=tt_ov_i",
      actors: ["Christian Bale", "Heath Ledger"],
      featured: false,
    },
    {
      _id: 3,
      title: "The Lord of the Rings: The Return of the King",
      description:
        "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
      genre: {
        name: "Fantasy",
        description:
          "Should contain numerous consecutive scenes of characters portrayed to effect a magical and/or mystical narrative throughout the title. Usually has elements of magic, supernatural events, mythology, folklore, or exotic fantasy worlds.",
      },
      director: {
        name: "Peter Jackson",
        biography:
          " Sir Peter Jackson made history with The Lord of the Rings trilogy, becoming the first person to direct three major feature films simultaneously. The Fellowship of the Ring, The Two Towers and The Return of the King were nominated for and collected a slew of awards from around the globe, with The Return of the King receiving his most impressive collection of awards. This included three Academy Awards® (Best Adapted Screenplay, Best Director and Best Picture), two Golden Globes (Best Director and Best Motion Picture-Drama), three BAFTAs (Best Adapted Screenplay, Best Film and Viewers' Choice), a Directors Guild Award, a Producers Guild Award and a New York Film Critics Circle Award.",
        birth: { $date: { $numberLong: "-257904000000" } },
        death: null,
      },
      imagePath:
        "https://www.imdb.com/title/tt0167260/mediaviewer/rm584928512/?ref_=tt_ov_i",
      actors: ["Elijah Wood", "Viggo Mortensen"],
      featured: false,
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>there are no movies!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

export default MainView;
