import {useEffect, useState } from "react";
import {motion, AnimatePresence} from 'framer-motion'
import "./App.css";
import Movie from './Movie';
import GenreButton from "./GenreButton"


function App() {

  const[popular, setPopular] = useState([]);
  const[filtered, setFiltered] = useState([]);
  const[genres, setGenres] = useState([]);
  const[activeGenre, setActiveGenre] = useState(0);

  useEffect(()=>{
    fetchPopular();
    fetchGenres();
  }, [])


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjgxNjliNDk1ZmI4YzliMWI4ZWNiMTVhMDY0YmE1MCIsInN1YiI6IjY2MDNlYzNjN2Y2YzhkMDE2MzcxMWMyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RKatvP247ruQ979oZps0K4ka8b8yD5CNUXOipK8SCGk'
    }
  };

    const fetchPopular  = async () => {
      const responseMov = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);

      const movies = await responseMov.json();
      console.log(movies);
      setPopular(movies.results);
      setFiltered(movies.results);
    }

    const fetchGenres  = async () => {
      const responseGen = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);

      const fGenres = await responseGen.json();
      setGenres(fGenres.genres);
      console.log(fGenres);
    }

  return (
  <div className="App">

    <div className="button-container">

      <button 
        id="all-genre-btn"
        onClick={() => setActiveGenre(0)}
      > All
      </button>

      {genres && genres.map(genre => {
        return <GenreButton
          key={genre.id}
          genre={genre}
          popular={popular} 
          setFiltered={setFiltered}
          activeGenre={activeGenre}
          setActiveGenre={setActiveGenre}
          />
      })}

    </div>

    <motion.div layout className="popular-movies">
      <AnimatePresence>
      {filtered && filtered.map(movie=> {
        return <Movie 
          key={movie.id}
          movie={movie}/>
      })}
      </AnimatePresence>
    </motion.div>
  </div>
  )
}

export default App;

