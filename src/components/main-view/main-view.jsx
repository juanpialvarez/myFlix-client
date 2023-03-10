// My Flix clien side
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../loggin-view/loggin-view";
import { SignupView } from "../signup-view/signup-view";
import { Col, Button, Container, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useParams } from "react-router";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetch("https://myflix94.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row>
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>No Movies to Show</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>No Movies to Show</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-5" key={movie._id} md={3}>
                        <MovieCard movie={movie} />
                        <Button>+</Button>
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <ProfileView user={user} movies={movies} />
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
  // return (
  //   <Row className="justify-content-md-center">
  //     {!user ? (
  //       <Col md={5} className="text-danger">
  //         <h1 className="text-danger">My Flix</h1>
  //         <LoginView
  //           onLoggedIn={(user, token) => {
  //             setToken(token);
  //             setUser(user);
  //           }}
  //         />
  //         or
  //         <SignupView />
  //       </Col>
  //     ) : movies.length === 0 ? (
  //       <Col md={5}>
  //         <h2>No Movies to Show</h2>
  //       </Col>
  //     ) : selectedMovie ? (
  //       <Col md={8}>
  //         <MovieView
  //           movie={selectedMovie}
  //           onBackClick={() => setSelectedMovie(null)}
  //         />
  //         <hr />
  //         <h2 className="text-danger">Similar Movies</h2>
  //         <Row>
  //           {movies
  //             .filter((movie) => movie.genre.name == selectedMovie.genre.name)
  //             .map((movie) => (
  //               <Col md={4} key={movie._id}>
  //                 <MovieCard
  //                   movie={movie}
  //                   onMovieClick={(newSelectedMovie) => {
  //                     setSelectedMovie(newSelectedMovie);
  //                   }}
  //                 />
  //               </Col>
  //             ))}
  //         </Row>
  //       </Col>
  //     ) : (
  //       <>
  //         <Row>
  //           <Col md={3}>
  //             <Button
  //               onClick={() => {
  //                 setUser(null);
  //                 setToken(null);
  //                 localStorage.clear();
  //               }}
  //             >
  //               Logout
  //             </Button>
  //           </Col>
  //         </Row>

  //         {movies.map((movie) => (
  //           <Col key={movie._id} md={3}>
  //             <MovieCard
  //               movie={movie}
  //               onMovieClick={(newSelectedMovie) => {
  //                 setSelectedMovie(newSelectedMovie);
  //               }}
  //             />
  //           </Col>
  //         ))}
  //       </>
  //     )}
  //   </Row>
  // );
};

export default MainView;
