import React from 'react';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom'

import Menu from './menu'
import Header from './header'
import HomePage from './home-page'
import NotFound from './not-found-page'
import PlayerPage from './player-page'
import FactionManifestoPage from './faction-manifesto-page'
import FactionJobsPage from './faction-jobs-page';
import CreditsPage from './credits-page';
import RandomPage from './random-page';
import StoryPage from './story-page'
import SauceyPage from './saucey-page'
import FactionOverviewPage from './faction-overview-page'
import ServicePage from './service-page'

const App = () => (
<React.StrictMode>
    <Router>
      <>
      <Header />
      <section className='section pt-0'>
          <div className='container'>
            <div className='columns'>
              <div className='column is-3'>
              <Menu></Menu>
              </div>
            <div className='column is-8'>
            <Switch>
              <Route path='/' exact component={HomePage}></Route>
              <Route path='/player/:name' component={PlayerPage}></Route>
              <Route path='/faction/:name/manifesto' component={FactionManifestoPage}></Route>
              <Route path='/faction/:name/jobs' component={FactionJobsPage}></Route>
              <Route path='/faction/overview' component={FactionOverviewPage}></Route>
              <Route path='/credits' component={CreditsPage}></Route>
              <Route path='/random' component={RandomPage}></Route>
              <Route path='/story/:page' component={StoryPage}></Route>
              <Route path='/service/:service' component={ServicePage}></Route>
              <Route path='/saucey' component={SauceyPage}></Route>
              <Route component={NotFound}></Route>
            </Switch>
            </div>
            </div>
          </div>
      </section>
      </>
    </Router>
  </React.StrictMode>
)

export default App