import { useState,useEffect } from "react";

// Sample data for movies and watched movies
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
//http://www.omdbapi.com/?s=titanic&apikey=e52477cc
const key = "e52477cc";
const search = "lost";
const endPoint = `http://www.omdbapi.com/?s=${search}&apikey=${key}`;
/*const result = fetch(endPoint)
  .then((response)=>  response.json())
  .then((data) => data);*/
//console.log('our expected data==>',data);


export default function App() {
  useEffect(function(){
    fetch(`http://www.omdbapi.com/?s=${query}&apikey=${key}`)
    .then((response)=>  response.json())
    .then((data) => setmovies(data.Search));
  },[])
 
  const [query, setQuery] = useState("");
  const [movies, setmovies] = useState(['loading...']);
  const [watched, setwatched] = useState(tempWatchedData);

  return (
    <div>
      <NavBar query={query} setQuery={setQuery} movieCount={movies.length} />
      <main className="main">
        <MovieSection movies={movies} />
        <WatchedSection watched={watched} />
      </main>
    </div>
  );
}

function NavBar({ query, setQuery, movieCount }) {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img" aria-label="logo">
          🍿
        </span>
        <h1>React Flix</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className="num-results">
        Found <strong>{movieCount}</strong> results
      </p>
    </nav>
  );
}

function MovieSection({ movies }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SectionContainer title="Movies" isOpen={isOpen} setIsOpen={setIsOpen}>
      <ul className="list">
        {movies.map((movie) => (
          <MovieItem key={movie.imdbID} movie={movie} />
        ))}
      </ul>
    </SectionContainer>
  );
}

function WatchedSection({ watched }) {
  const [isOpen, setIsOpen] = useState(true);
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <SectionContainer
      title="Watched Movies"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <Summary
        count={watched.length}
        avgImdbRating={avgImdbRating}
        avgUserRating={avgUserRating}
        avgRuntime={avgRuntime}
      />
      <ul className="list">
        {watched.map((movie) => (
          <MovieItem key={movie.imdbID} movie={movie} />
        ))}
      </ul>
    </SectionContainer>
  );
}

function SectionContainer({ title, isOpen, setIsOpen, children }) {
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && (
        <>
          <h2>{title}</h2>
          {children}
        </>
      )}
    </div>
  );
}

function Summary({ count, avgImdbRating, avgUserRating, avgRuntime }) {
  return (
    <div className="summary">
      <p>
        <span>#️⃣</span> {count} movies
      </p>
      <p>
        <span>⭐️</span> {avgImdbRating}
      </p>
      <p>
        <span>🌟</span> {avgUserRating}
      </p>
      <p>
        <span>⏳</span> {avgRuntime} min
      </p>
    </div>
  );
}

function MovieItem({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <p>
        <span>🗓</span> {movie.Year}
      </p>
    </li>
  );
}
