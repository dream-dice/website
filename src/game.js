import React from 'react'
import { Link } from 'react-router-dom'

const Game = ({ game }) => (
    <div className='level'>
        <div className='level-left'>
            <div className='level-item'>
                {game !== 'cos' && <Link to='/characters/cos' className='oswald has-text-weight-medium'>Curse of Strahd</Link>}
                {game === 'cos' && <span className='oswald has-text-weight-bold'>Curse of Strahd</span>}
            </div>
            <div className='level-item'>
                {game !== 'cm' && <Link to='/characters/cm' className='oswald has-text-weight-medium'>Candlekeep Mysteries</Link>}
                {game === 'cm' && <span className='oswald has-text-weight-bold'>Candlekeep Mysteries</span>}
            </div>
        </div>
    </div>
)

export default Game