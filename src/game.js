import React from 'react'
import { Link } from 'react-router-dom'

const Game = ({ game, page }) => (
  <div className="tabs">
    <ul>
      <li className={`is-${page.includes('characters') ? 'active' : 'inactive'}`}>
        <Link to={`/${game}/characters`}>Players & NPCs</Link>
      </li>
      <li className={`is-${page.includes('notes') ? 'active' : 'inactive'}`}>
        <Link to={`/${game}/notes`}>Session Note</Link>
      </li>
      <li className={`is-${page.includes('appendix') ? 'active' : 'inactive'}`}>
        <Link to={`/${game}/appendix`}>Appendix</Link>
      </li>
      <li className={`is-${page.includes('calendar') ? 'active' : 'inactive'}`}>
        <Link to={`/${game}/calendar`}>Calendar</Link>
      </li>
    </ul>
  </div>
)

export default Game