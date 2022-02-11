import React, { useState } from 'react'
import Card from './card'
import players from './players.json'

const CharactersPage = ({ game }) => {
    const [term, setTerm] = useState('')

    return (
        <div className='characters'>
            <div>
                <input
                    className="input mb-4"
                    type="text"
                    placeholder="Search name"
                    onChange={({ target: { value } }) => setTerm(value.toLowerCase().replace(/\W*/g, ''))}
                />
                {
                    players[game]
                        .filter(({ title }) => title.toLowerCase()
                            .replace(/\W*/g, '')
                            .includes(term)
                        )
                        .sort(({title: left}, {title: right}) => {
                            if (left < right) return -1
                            if (left > right) return 1
                            return 0
                        })
                        .map((player, index) => (
                            <Card
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