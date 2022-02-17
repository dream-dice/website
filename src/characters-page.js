import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import qs from 'qs'
import Card from './card'
import players from './players.json'

const CharactersPage = ({ game }) => {
    const navigate = useNavigate()
    const {pathname, search} = useLocation()
    const query = qs.parse(search, {ignoreQueryPrefix: true})
    const term = query.term || ''

    const searchTerm = term.toLowerCase().replace(/\W*/g, '')

    return (
        <div className='characters'>
            <div>
                <input
                    className="input mb-4"
                    type="text"
                    placeholder="Search name"
                    value={term}
                    onChange={({ target: { value } }) => {
                        navigate(`${pathname}?term=${value}`)
                    }}
                />
                {
                    players[game]
                        .filter(({ title }) => title.toLowerCase()
                            .replace(/\W*/g, '')
                            .includes(searchTerm)
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