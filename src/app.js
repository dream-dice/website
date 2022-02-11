import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharactersPage from './characters-page';
import Header from './header';
import HomePage from './home-page';
import NotesPage from './notes-page'
import NotFound from './not-found-page';
import Game from './game';

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <>
          <Header />
          <section className='section'>
            <div className='container'>
            <Routes>
              <Route path='/characters' exact element={<Game game='cos' path='/characters' />}></Route>
              <Route path='/characters/cos' exact element={<Game game='cos' path='/characters' />}></Route>
              <Route path='/characters/cm' exact element={<Game game='cm' path='/characters' />}></Route>
              <Route path='/notes' exact element={<Game game='cos' path='/notes' />}></Route>
              <Route path='/notes/cos' exact element={<Game game='cos' path='/notes' />}></Route>
              <Route path='/notes/cm' exact element={<Game game='cm' path='/notes' />}></Route>
            </Routes>
              <Routes>
                <Route path='/' exact element={<HomePage />}></Route>
                <Route path='/characters' exact element={<CharactersPage game='cos' />}></Route>
                <Route path='/characters/cos' exact element={<CharactersPage game='cos' />}></Route>
                <Route path='/characters/cm' exact element={<CharactersPage game='cm' />}></Route>
                <Route path='/notes' exact element={<NotesPage game='cm' />}></Route>
                <Route path='/notes/cos' exact element={<NotesPage game='cos' />}></Route>
                <Route path='/notes/cm' exact element={<NotesPage game='cm' />}></Route>
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