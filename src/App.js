import React, { createContext, useState } from 'react'
import { Route, Routes } from "react-router-dom";

import Header from './components/Header';

import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'

import './scss/app.scss'
import { useSelector } from 'react-redux';
import { selectIsAuth } from './redux/slices/authSlice';

export const SearchContext = createContext('')

function App() {
  const [searchValue, setSearchValue] = useState('')
  const isAuth = useSelector(selectIsAuth);


  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            {isAuth && <Route path='/cart' element={<Cart />} />}
            <Route path='/' element={<Home />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>

  );
}

export default App;
