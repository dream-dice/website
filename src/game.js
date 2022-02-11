import React from 'react'
import { Link } from 'react-router-dom'

const Game = ({ game, path }) => (
    <div className="tabs">
  <ul>
    <li className={`is-${game === 'cos' ? 'active' : 'inactive'}`}>
      <Link to={`${path}/cos`}>Curse of Strahd</Link>
    </li>
    <li className={`is-${game === 'cm' ? 'active' : 'inactive'}`}>
    <Link to={`${path}/cm`}>Candlekeep Mysteries</Link>
    </li>
  </ul>
</div>
)

export default Game