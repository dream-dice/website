import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharactersPage from './characters-page';
import Header from './header';
import HomePage from './home-page';
import NotFound from './not-found-page';

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <>
          <Header />
          <section className='section'>
            <div className='container'>
              <Routes>
                <Route path='/' exact element={<HomePage />}></Route>
                <Route path='/characters' exact element={<CharactersPage game='cos'/>}></Route>
                <Route path='/characters/cos' exact element={<CharactersPage game='cos'/>}></Route>
                <Route path='/characters/cm' exact element={<CharactersPage game='cm'/>}></Route>
                <Route element={<NotFound />}></Route>
              </Routes>
            </div>
          </section>
        </>
      </Router>
    </React.StrictMode>
  )
}

export default App