import React, { useState } from 'react'
import Player from './player'
import Game from './game'
import players from './players.json'

const CharactersPage = ({ game }) => {
    const [term, setTerm] = useState('')

    return (
        <div className='characters'>
            <Game game={game} />
            <div>
                <input
                    className="input mb-4"
                    type="text"
                    placeholder="Search name"
                    onChange={({ target: { value } }) => setTerm(value)}
                />
                {
                    Object.values(players)
                        .filter(({ game: playerGame }) => playerGame === game)
                        .filter(({ title }) => title.toLowerCase()
                            .replace(/\W*/g, '')
                            .includes(
                                term.toLowerCase()
                                    .replace(/\W*/g, '')
                            )
                        )
                        .sort(({title: left}, {title: right}) => {
                            if (left < right) return -1
                            if (left > right) return 1
                            return 0
                        })
                        .map((player, index) => (
                            <Player
                                key={player.name}
                                {...player}
                                first={index === 0}
                            />
                        ))
                }
            </div>
        </div>
    )
}

export default CharactersPage