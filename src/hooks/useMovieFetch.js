import { useCallback, useEffect, useState } from "react";

// HELPERS
import { isPersistedState } from "../helpers";

// API
import API from '../API';

export const useMovieFetch = (movieId) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchMovie = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const movie = await API.fetchMovie(movieId);

      const credits = await API.fetchCredits(movieId);

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
      setError(true);
    }
  }, [movieId]);

  // INITIAL RENDER
  useEffect(() => {
    const sessionState = isPersistedState(movieId);

    if (sessionState) {
      setState(sessionState);
      setLoading(false);
      return;
    }

    fetchMovie();
  }, [movieId, fetchMovie]);

  // WRITE TO SESSION STORAGE
  useEffect(() => {
    sessionStorage.setItem(movieId,JSON.stringify(state))
  }, [movieId, state]);

  return { state, loading, error };
}