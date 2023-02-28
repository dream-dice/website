import Cookies from 'js-cookie'
import React from 'react'
import { Link } from 'react-router-dom'

const Game = ({ game, page }) => {
  const isDm = Cookies.get('dm')
  return (
    <div className="tabs">
      <ul>
        <li className={`is-${page.includes('notes') ? 'active' : 'inactive'}`}>
          <Link to={`/${game}/notes`}>📝 Session Note</Link>
        </li>
        <li className={`is-${page.includes('calendar') ? 'active' : 'inactive'}`}>
          <Link to={`/${game}/calendar`}>📆 Calendar</Link>
        </li>
        <li className={`is-${page.includes('appendix') ? 'active' : 'inactive'}`}>
          <Link to={`/${game}/appendix`}>📚 Appendix</Link>
        </li>
        {isDm && <li className={`is-${page.includes('dmNotes') ? 'active' : 'inactive'}`}>
          <Link to={`/${game}/dmNotes`}>📜 DM Notes</Link>
        </li>}
      </ul>
    </div>
  )
}

export default Game