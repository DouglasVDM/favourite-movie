import { useEffect, useState } from "react";

// HELPERS
import { isPersistedState } from "../helpers";

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

  const fetchMovies = async (page, searchTerm = '') => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);

      setState(previousState => ({
        ...movies,
        results:
          page > 1 ? [...previousState.results, ...movies.results] : [...movies.results]
      }));
    } catch (error) {
      setError(true);
    }
    setLoading(false)
  };

  // INITIAL RENDER AND SEARCH
  useEffect(() => {
    if (!searchTerm) {
      const sessionState = isPersistedState('homeState');
      
      if (sessionState) {
        console.log('Grabbing from sessionStorage')
        setState(sessionState);
        return;
      }
    }
    console.log('Grabbing from API')
    setState(initialState)
    fetchMovies(1, searchTerm)
  }, [searchTerm]);

  // LOAD MORE
  useEffect(() => {
    if (!isLoadingMore) return;

    fetchMovies(state.page + 1, searchTerm)
    setIsLoadingMore(false)

  }, [isLoadingMore, searchTerm, state.page])

  // WRITE TO SESSION STORAGE
  useEffect(() => {
    if (!searchTerm) sessionStorage.setItem('homeState', JSON.stringify(state))
  }, [searchTerm, state]);

  return { state, loading, error, searchTerm, setSearchTerm, isLoadingMore, setIsLoadingMore };
};