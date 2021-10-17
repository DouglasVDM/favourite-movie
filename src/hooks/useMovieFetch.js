import { useCallback, useEffect, useState } from "react";

// API
import API from '../API';

export const useMovieFetch = (movieId) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  console.log('state:', state);

  // 
  const fetchMovie = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const movie = await API.fetchMovie(movieId);
      console.log('movie:', movie)

      const credits = await API.fetchCredits(movieId);
      console.log('credits:', credits)

      // GET DIRECTORS ONLY
      const directors = credits.crew.filter(
        member => member.job === 'Director'
      );

      setState({
        ...movie,
        actors: credits.cast,
        directors
      });

      setLoading(false)
    } catch (error) {
      console.error(error.message)
      setError(true);
    }
  }, [movieId]);

  // INITIAL RENDER
  useEffect(() => {
    fetchMovie();
  }, [movieId, fetchMovie]);


  return { state, loading, error };
}