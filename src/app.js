import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AvatarsPage from './avatars-page'
import CalendarPage from './calendar-page'
import Game from './game'
import Header from './header'
import HomePage from './home-page'
import MapsPage from './maps-page'
import NotFound from './not-found-page'
import NotesPage from './notes-page'
import ShopAndServicesPage from './shop-and-services-page'

import appendix from './appendix.json'
import dmNotes from './dm-notes.json'
import notes from './notes.json'

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <>
          <Routes>
            <Route path=':root?/:map?/:section?' element={<Header />}></Route>
          </Routes>
          <section className='section'>
            <div className='container'>
              <Routes>
                <Route path='/cos' element={<Game game='cos' page='notes' />}></Route>
                <Route path='/cos/notes/:section?' element={<Game game='cos' page='notes' />}></Route>
                <Route path='/cos/appendix/:section?' element={<Game game='cos' page='appendix' />}></Route>
                <Route path='/cos/dmNotes/:section?' element={<Game game='cos' page='dmNotes' />}></Route>
                <Route path='/cos/calendar' element={<Game game='cos' page='calendar' />}></Route>
                <Route path='/cm' element={<Game game='cm' page='notes' />}></Route>
                <Route path='/cm/notes/:section?' element={<Game game='cm' page='notes' />}></Route>
                <Route path='/cm/appendix/:section?' element={<Game game='cm' page='appendix' />}></Route>
                <Route path='/cm/dmNotes/:section?' element={<Game game='cm' page='dmNotes' />}></Route>
                <Route path='/cm/calendar' element={<Game game='cm' page='calendar' />}></Route>
                <Route path='/sj' element={<Game game='sj' page='notes' />}></Route>
                <Route path='/sj/notes/:section?' element={<Game game='sj' page='notes' />}></Route>
                <Route path='/sj/appendix/:section?' element={<Game game='sj' page='appendix' />}></Route>
                <Route path='/sj/dmNotes/:section?' element={<Game game='sj' page='dmNotes' />}></Route>
                <Route path='/sj/calendar' element={<Game game='sj' page='calendar' />}></Route>
                <Route path='*' element={<div />}></Route>
              </Routes>
              <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/master' element={<HomePage />}></Route>
                <Route path='/shop/:section?' element={<ShopAndServicesPage />}></Route>
                <Route path='/maps/:section?' element={<MapsPage />}></Route>
                <Route path='/avatars/:section?' element={<AvatarsPage />}></Route>

                <Route path='/cm' element={<NotesPage base='notes' notes={notes} game='cm' />}></Route>
                <Route path='/cm/calendar' element={<CalendarPage game='cm' />}></Route>
                <Route path='/cm/notes/:section?' element={<NotesPage base='notes' notes={notes} game='cm' />}></Route>
                <Route path='/cm/appendix/:section?' element={<NotesPage base='appendix' notes={appendix} game='cm' />}></Route>
                <Route path='/cm/dmNotes/:section?' element={<NotesPage base='dmNotes' notes={dmNotes} game='cm' />}></Route>

                <Route path='/cos' element={<NotesPage base='notes' notes={notes} game='cos' />}></Route>
                <Route path='/cos/calendar' element={<CalendarPage game='cos' />}></Route>
                <Route path='/cos/notes/:section?' element={<NotesPage base='notes' notes={notes} game='cos' />}></Route>
                <Route path='/cos/appendix/:section?' element={<NotesPage base='appendix' notes={appendix} game='cos' />}></Route>
                <Route path='/cos/dmNotes/:section?' element={<NotesPage base='dmNotes' notes={dmNotes} game='cos' />}></Route>

                <Route path='/sj' element={<NotesPage base='notes' notes={notes} game='sj' />}></Route>
                <Route path='/sj/calendar' element={<CalendarPage game='sj' />}></Route>
                <Route path='/sj/notes/:section?' element={<NotesPage base='notes' notes={notes} game='sj' />}></Route>
                <Route path='/sj/appendix/:section?' element={<NotesPage base='appendix' notes={appendix} game='sj' />}></Route>
                <Route path='/sj/dmNotes/:section?' element={<NotesPage base='dmNotes' notes={dmNotes} game='sj' />}></Route>
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