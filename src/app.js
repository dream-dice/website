import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharactersPage from './characters-page';
import Header from './header';
import HomePage from './home-page';
import NotesPage from './notes-page'
import NotFound from './not-found-page';
import Game from './game';
import AppendixPage from './appendix-page'
import ShopAndServicesPage from './shop-and-services-page'

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <>
          <Header />
          <section className='section'>
            <div className='container'>
              <Routes>
                <Route path='/' element={(<div />)}></Route>
                <Route path='/shop' element={(<div />)}></Route>
                <Route path='/cos' element={<Game game='cos' page='characters' />}></Route>
                <Route path='/cos/characters' element={<Game game='cos' page='characters' />}></Route>
                <Route path='/cos/notes' element={<Game game='cos' page='notes' />}></Route>
                <Route path='/cos/appendix' element={<Game game='cos' page='appendix' />}></Route>
                <Route path='/cm' element={<Game game='cm' page='characters' />}></Route>
                <Route path='/cm/characters' element={<Game game='cm' page='characters' />}></Route>
                <Route path='/cm/notes' element={<Game game='cm' page='notes' />}></Route>
                <Route path='/cm/appendix' element={<Game game='cm' page='appendix' />}></Route>
              </Routes>
              <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/shop' element={<ShopAndServicesPage />}></Route>
                <Route path='/cos' element={<CharactersPage game='cos' />}></Route>
                <Route path='/cm' element={<CharactersPage game='cm' />}></Route>
                <Route path='/cos/characters' element={<CharactersPage game='cos' />}></Route>
                <Route path='/cm/characters' element={<CharactersPage game='cm' />}></Route>
                <Route path='/cos/notes' element={<NotesPage game='cos' />}></Route>
                <Route path='/cm/notes' element={<NotesPage game='cm' />}></Route>
                <Route path='/cos/appendix' element={<AppendixPage game='cos' />}></Route>
                <Route path='/cm/appendix' element={<AppendixPage game='cm' />}></Route>
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