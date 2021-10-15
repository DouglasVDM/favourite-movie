import React, { useEffect, useState } from 'react'

// CONFIG
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';

// API
import API from '../API';

// IMAGE
import NoImage from '../images/no_image.jpg'

const Home = () => {
  const [state, setState] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMovies = async (page, searchTerm = '') => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);
      console.log('movies:', movies)

      setState(previousState => ({
        ...movies,
        results:
          page > 1 ? [...previousState.results, ...movies.results] : [...movies.results]
      }));
    } catch (error) {
      console.error(error.message)
      setError(true);
    }
    setLoading(false)
  };

  // INITIAL RENDER
  useEffect(() => {
    fetchMovies(1)
  }, []);

  console.log('state:', state)


  return (
    <div>
      Home Page
    </div>
  )
}

export default Home
