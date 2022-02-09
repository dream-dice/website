import React, { useState } from 'react';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'

import Menu from './menu'
import Header from './header'
import HomePage from './home-page'
import NotFound from './not-found-page'
import PlayerPage from './player-page'
import FactionManifestoPage from './faction-manifesto-page'
import FactionJobsPage from './faction-jobs-page';
import CreditsPage from './credits-page';
import RandomPage from './random-page';
import RulesPage from './rules-page';
import StoryPage from './story-page'
import SauceyPage from './saucey-page'
import FactionOverviewPage from './faction-overview-page'
import ServicePage from './service-page'

const MenuButton = ({ onClick, open }) => (
  <button onClick={onClick} className='button is-ghost is-menu'>
    <div className="navbar-burger" data-target="navMenuIndex">
      <span></span>
      <span></span>
      <span></span>
    </div>
    {open ? 'Close menu' : 'Open menu'}
  </button>
)

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <React.StrictMode>
      <Router>
        <>
          <Header />
          <section className='section pt-0'>
              <MenuButton onClick={() => { setMenuOpen(!menuOpen) }} open={menuOpen} />
            <div className='container'>
              <div className={`columns app is-menu-${menuOpen ? 'open' : 'closed'}`}>
                <div className='column is-3'>
                  <Menu closed={!menuOpen}></Menu>
                </div>
                <div className={`column is-${menuOpen ? 8 : 12} app-content scroll-to`}>
                  <Routes>
                    <Route path='/' exact element={<HomePage />}></Route>
                    <Route path='/player/:name' element={<PlayerPage />}></Route>
                    <Route path='/faction/:name/manifesto' element={<FactionManifestoPage />}></Route>
                    <Route path='/faction/:name/jobs' element={<FactionJobsPage />}></Route>
                    <Route path='/faction/overview' element={<FactionOverviewPage />}></Route>
                    <Route path='/credits' element={<CreditsPage />}></Route>
                    <Route path='/random' element={<RandomPage />}></Route>
                    <Route path='/rules' element={<RulesPage />}></Route>
                    <Route path='/story/:group/:page' element={<StoryPage />}></Route>
                    <Route path='/service/:service' element={<ServicePage />}></Route>
                    <Route path='/saucey' element={<SauceyPage />}></Route>
                    <Route element={<NotFound />}></Route>
                  </Routes>
                </div>
              </div>
            </div>
          </section>
        </>
      </Router>
    </React.StrictMode>
  )
}

export default App