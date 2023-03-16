// My Flix clien side
import { useState, useEffect, useRef } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../loggin-view/loggin-view";
import { SignupView } from "../signup-view/signup-view";
import { Col, Row, Form, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [filterMovies, setFilter] = useState(false);
  const [genre, setGenre] = useState(null);
  const [director, setDirector] = useState(null);
  const [filterData, setFilterData] = useState({});
  const filterRef = useRef(null);

  const handleFilter = (event) => {
    event.preventDefault();
    setFilter(true);
    setFilterData({
      genre: genre,
      director: director,
    });
  };
  const handleFilterReset = (event) => {
    event.preventDefault();
    setFilter(false);
    setGenre(null);
    setDirector(null);
    window.location.reload;
    filterRef.current.reset();
  };

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
        movies={movies}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />

      <br />
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
                    <MovieView movies={movies} user={user} token={token} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Row>
                  <Form ref={filterRef} onSubmit={handleFilter}>
                    <h2 className="text-danger">Filter</h2>
                    <Form.Group className="text-danger">
                      <Form.Label>Genre</Form.Label>
                      <Form.Select
                        className="text-danger"
                        onChange={(e) => {
                          e.target.value === "None"
                            ? setGenre(null)
                            : setGenre(e.target.value);
                        }}
                      >
                        <option value={null}>None</option>
                        {movies
                          .map((movie) => movie.genre.name)
                          .filter(
                            (value, index, movie) =>
                              movie.indexOf(value) === index
                          )
                          .map((genre) => (
                            <option>{genre}</option>
                          ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="text-danger">
                      <Form.Label>Director</Form.Label>
                      <Form.Select
                        className="text-danger"
                        onChange={(e) => {
                          e.target.value === "None"
                            ? setDirector(null)
                            : setDirector(e.target.value);
                        }}
                      >
                        <option value={null}>None</option>
                        {movies
                          .map((movie) => movie.director.name)
                          .filter(
                            (value, index, movie) =>
                              movie.indexOf(value) === index
                          )
                          .map((genre) => (
                            <option>{genre}</option>
                          ))}
                      </Form.Select>
                    </Form.Group>
                    <br />
                    <Button type="submit" onClick={handleFilter}>
                      Submit
                    </Button>
                    <Button type="click" onClick={handleFilterReset}>
                      Reset
                    </Button>
                  </Form>
                </Row>
                <Row>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>No Movies to Show</Col>
                  ) : filterMovies ? (
                    filterData.genre && !filterData.director ? (
                      <>
                        {movies
                          .filter(
                            (movie) => movie.genre.name === filterData.genre
                          )
                          .map((movie) => (
                            <Col
                              className="mb-5"
                              key={encodeURIComponent(movie._id)}
                              md={3}
                            >
                              <MovieCard
                                key={encodeURIComponent(movie._id)}
                                movie={movie}
                                user={user}
                                token={token}
                              />
                            </Col>
                          ))}
                      </>
                    ) : !filterData.genre && filterData.director ? (
                      <>
                        {movies
                          .filter(
                            (movie) =>
                              movie.director.name === filterData.director
                          )
                          .map((movie) => (
                            <Col
                              className="mb-5"
                              key={encodeURIComponent(movie._id)}
                              md={3}
                            >
                              <MovieCard
                                key={encodeURIComponent(movie._id)}
                                movie={movie}
                                user={user}
                                token={token}
                              />
                            </Col>
                          ))}
                      </>
                    ) : filterData.genre && filterData.director ? (
                      <>
                        {movies
                          .filter(
                            (movie) =>
                              movie.director.name === filterData.director &&
                              movie.genre.name === filterData.genre
                          )
                          .map((movie) => (
                            <Col
                              className="mb-5"
                              key={encodeURIComponent(movie._id)}
                              md={3}
                            >
                              <MovieCard
                                key={encodeURIComponent(movie._id)}
                                movie={movie}
                                user={user}
                                token={token}
                              />
                            </Col>
                          ))}
                      </>
                    ) : (
                      !filterData.genre &&
                      !filterData.director && (
                        <>
                          {movies.map((movie) => (
                            <Col
                              className="mb-5"
                              key={encodeURIComponent(movie._id)}
                              md={3}
                            >
                              <MovieCard
                                key={encodeURIComponent(movie._id)}
                                movie={movie}
                                user={user}
                                token={token}
                              />
                            </Col>
                          ))}
                        </>
                      )
                    )
                  ) : (
                    <>
                      {movies.map((movie) => (
                        <Col
                          className="mb-5"
                          key={encodeURIComponent(movie._id)}
                          md={3}
                        >
                          <MovieCard
                            movie={movie}
                            key={encodeURIComponent(movie._id)}
                            user={user}
                            token={token}
                          />
                        </Col>
                      ))}
                    </>
                  )}
                </Row>
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <ProfileView
                    user={user}
                    movies={movies}
                    token={token}
                    onSuccess={() => {
                      setUser(null);
                      setToken(null);
                      localStorage.clear();
                    }}
                    onDeregister={() => {
                      setUser(null);
                      setToken(null);
                      localStorage.clear();
                    }}
                  />
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;
