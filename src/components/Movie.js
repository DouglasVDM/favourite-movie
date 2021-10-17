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
import BreadCrumb from './BreadCrumb';

const Movie = () => {
  const { movieId } = useParams();
  const { state: movie, loading, error } = useMovieFetch(movieId);

  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong...</div>

  console.log('movie:', movie)
  return (
    <>
      <BreadCrumb movieTitle={movie.original_title} />
    </>
  );
};

export default Movie;
