import React from 'react'

// HOOKS
import { useHomeFetch } from '../hooks/useHomeFetch';

// CONFIG
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';

// IMAGE
import NoImage from '../images/no_image.jpg';

const Home = () => {
  const { state, loading, error } = useHomeFetch();

  console.log('state:', state);

  return (
    <div>
      Home Page
    </div>
  )
}

export default Home;
