import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppendixPage from './appendix-page';
import CalendarPage from './calendar-page';
import CharactersPage from './characters-page';
import Game from './game';
import Header from './header';
import HomePage from './home-page';
import MapsPage from './maps-page';
import NotFound from './not-found-page';
import NotesPage from './notes-page';
import ShopAndServicesPage from './shop-and-services-page';

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
                <Route path='/maps' element={(<div />)}></Route>
                <Route path='/cos' element={<Game game='cos' page='notes' />}></Route>
                <Route path='/cos/characters' element={<Game game='cos' page='characters' />}></Route>
                <Route path='/cos/notes' element={<Game game='cos' page='notes' />}></Route>
                <Route path='/cos/appendix' element={<Game game='cos' page='appendix' />}></Route>
                <Route path='/cos/calendar' element={<Game game='cos' page='calendar' />}></Route>
                <Route path='/cm' element={<Game game='cm' page='notes' />}></Route>
                <Route path='/cm/characters' element={<Game game='cm' page='characters' />}></Route>
                <Route path='/cm/notes' element={<Game game='cm' page='notes' />}></Route>
                <Route path='/cm/appendix' element={<Game game='cm' page='appendix' />}></Route>
                <Route path='/cm/calendar' element={<Game game='cm' page='calendar' />}></Route>
                <Route path='/s' element={<Game game='s' page='notes' />}></Route>
                <Route path='/s/characters' element={<Game game='s' page='characters' />}></Route>
                <Route path='/s/notes' element={<Game game='s' page='notes' />}></Route>
                <Route path='/s/appendix' element={<Game game='s' page='appendix' />}></Route>
                <Route path='/s/calendar' element={<Game game='s' page='calendar' />}></Route>
              </Routes>
              <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/shop' element={<ShopAndServicesPage />}></Route>
                <Route path='/maps' element={<MapsPage />}></Route>
                <Route path='/cm' element={<NotesPage game='cm' />}></Route>
                <Route path='/cm/characters' element={<CharactersPage game='cm' />}></Route>
                <Route path='/cm/calendar' element={<CalendarPage game='cm' />}></Route>
                <Route path='/cm/notes' element={<NotesPage game='cm' />}></Route>
                <Route path='/cm/appendix' element={<AppendixPage game='cm' />}></Route>
                <Route path='/cos' element={<NotesPage game='cos' />}></Route>
                <Route path='/cos/characters' element={<CharactersPage game='cos' />}></Route>
                <Route path='/cos/calendar' element={<CalendarPage game='cos' />}></Route>
                <Route path='/cos/notes' element={<NotesPage game='cos' />}></Route>
                <Route path='/cos/appendix' element={<AppendixPage game='cos' />}></Route>
                <Route path='/s' element={<NotesPage game='s' />}></Route>
                <Route path='/s/characters' element={<CharactersPage game='s' />}></Route>
                <Route path='/s/calendar' element={<CalendarPage game='s' />}></Route>
                <Route path='/s/notes' element={<NotesPage game='s' />}></Route>
                <Route path='/s/appendix' element={<AppendixPage game='s' />}></Route>
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