import React from 'react';

// ROUTING
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// COMPONENTS
import Header from './components/Header';
import Home from './components/Home';
import Movie from './components/Movie';
import Notfound from './components/Notfound';

// STYLES
import { GlobalStyle } from './GlobalStyle';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:movieId' element={<Movie />} />
      <Route path='/*' element={<Notfound />} />
    </Routes>
    <GlobalStyle />
  </Router>
);

export default App;
