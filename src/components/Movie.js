import React from 'react';
import { useParams } from 'react-router-dom';

// CONFIG
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';

// COMPONENTS
import Grid from './Grid';
import Spinner from './Spinner';

// HOOK
import { useMovieFetch } from '../hooks/useMovieFetch';

// IMAGE
import NoImage from '../images/no_image.jpg';

const Movie = () => {
  const { movieId } = useParams();
  const { state: movie, loading, error } = useMovieFetch(movieId);

  console.log('movie:',movie)
  return (
    <>
      Movie
    </>
  )
}

export default Movie;
