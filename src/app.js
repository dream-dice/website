import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppendixPage from './appendix-page';
import CalendarPage from './calendar-page';
import Game from './game';
import Header from './header';
import HomePage from './home-page';
import MapsPage from './maps-page';
import AvatarsPage from './avatars-page';
import NotFound from './not-found-page';
import NotesPage from './notes-page';
import ShopAndServicesPage from './shop-and-services-page';

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <>
          <Routes>
            <Route path='/' element={<Header />}></Route>
            <Route path='/master' element={<Header />}></Route>
            <Route path='/avatars/:section?' element={<Header />}></Route>
            <Route path='/shop/:section?' element={<Header />}></Route>
            <Route path='/maps/:section?' element={<Header />}></Route>
            <Route path='/cos' element={<Header />}></Route>
            <Route path='/cos/notes/:section?' element={<Header />}></Route>
            <Route path='/cos/appendix/:section?' element={<Header />}></Route>
            <Route path='/cos/calendar' element={<Header />}></Route>
            <Route path='/cm' element={<Header />}></Route>
            <Route path='/cm/notes/:section?' element={<Header />}></Route>
            <Route path='/cm/appendix/:section?' element={<Header />}></Route>
            <Route path='/cm/calendar' element={<Header />}></Route>
            <Route path='/sj' element={<Header />}></Route>
            <Route path='/sj/notes/:section?' element={<Header />}></Route>
            <Route path='/sj/appendix/:section?' element={<Header />}></Route>
            <Route path='/sj/calendar' element={<Header />}></Route>
          </Routes>
          <section className='section'>
            <div className='container'>
              <Routes>
                <Route path='/' element={<div />}></Route>
                <Route path='/master' element={<div />}></Route>
                <Route path='/shop/:section?' element={<div />}></Route>
                <Route path='/maps/:section?' element={<div />}></Route>
              <Route path='/avatars/:section?' element={<div />}></Route>
                <Route path='/cos' element={<Game game='cos' page='notes' />}></Route>
                <Route path='/cos/notes/:section?' element={<Game game='cos' page='notes' />}></Route>
                <Route path='/cos/appendix/:section?' element={<Game game='cos' page='appendix' />}></Route>
                <Route path='/cos/calendar' element={<Game game='cos' page='calendar' />}></Route>
                <Route path='/cm' element={<Game game='cm' page='notes' />}></Route>
                <Route path='/cm/notes/:section?' element={<Game game='cm' page='notes' />}></Route>
                <Route path='/cm/appendix/:section?' element={<Game game='cm' page='appendix' />}></Route>
                <Route path='/cm/calendar' element={<Game game='cm' page='calendar' />}></Route>
                <Route path='/sj' element={<Game game='sj' page='notes' />}></Route>
                <Route path='/sj/notes/:section?' element={<Game game='sj' page='notes' />}></Route>
                <Route path='/sj/appendix/:section?' element={<Game game='sj' page='appendix' />}></Route>
                <Route path='/sj/calendar' element={<Game game='sj' page='calendar' />}></Route>
              </Routes>
              <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/master' element={<HomePage />}></Route>
                <Route path='/shop/:section?' element={<ShopAndServicesPage />}></Route>
                <Route path='/maps/:section?' element={<MapsPage />}></Route>
                <Route path='/avatars/:section?' element={<AvatarsPage />}></Route>
                <Route path='/cm' element={<NotesPage game='cm' />}></Route>
                <Route path='/cm/calendar' element={<CalendarPage game='cm' />}></Route>
                <Route path='/cm/notes/:section?' element={<NotesPage game='cm' />}></Route>
                <Route path='/cm/appendix/:section?' element={<AppendixPage game='cm' />}></Route>
                <Route path='/cos' element={<NotesPage game='cos' />}></Route>
                <Route path='/cos/calendar' element={<CalendarPage game='cos' />}></Route>
                <Route path='/cos/notes/:section?' element={<NotesPage game='cos' />}></Route>
                <Route path='/cos/appendix/:section?' element={<AppendixPage game='cos' />}></Route>
                <Route path='/sj' element={<NotesPage game='sj' />}></Route>
                <Route path='/sj/calendar' element={<CalendarPage game='sj' />}></Route>
                <Route path='/sj/notes/:section?' element={<NotesPage game='sj' />}></Route>
                <Route path='/sj/appendix/:section?' element={<AppendixPage game='sj' />}></Route>
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