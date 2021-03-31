import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bulma/css/bulma.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom'

import Menu from './menu'
import HomePage from './home-page'
import NotFound from './not-found-page'
import PlayerPage from './player-page'
import FactionManifestoPage from './faction-manifesto-page'
import FactionJobsPage from './faction-jobs-page';
import GmAboutPage from './gm-about-page';
import GmCreditsPage from './gm-credits-page';
import GmRandomPage from './gm-random-page';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <section className='section'>
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
              <Route path='/about' component={GmAboutPage}></Route>
              <Route path='/credits' component={GmCreditsPage}></Route>
              <Route path='/random' component={GmRandomPage}></Route>
              <Route component={NotFound}></Route>
            </Switch>
            </div>
            </div>
          </div>
      </section>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.unregister();
