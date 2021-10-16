import { useEffect, useState } from "react";

// API
import API from '../API';

const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0
}

export const useHomeFetch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  console.log('searchTerm:', searchTerm);

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

  // INITIAL RENDER AND SEARCH
  useEffect(() => {
    setState(initialState)
    fetchMovies(1, searchTerm)
  }, [searchTerm]);

  // LOAD MORE
  useEffect(() => {
    if (!isLoadingMore) return;

    fetchMovies(state.page + 1, searchTerm)
    setIsLoadingMore(false)

  }, [isLoadingMore, searchTerm, state.page])

  return { state, loading, error, searchTerm, setSearchTerm, isLoadingMore, setIsLoadingMore };
}