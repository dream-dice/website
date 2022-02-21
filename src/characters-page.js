import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import qs from 'qs'
import Card from './card'
import players from './players.json'

const CharactersPage = ({ game }) => {
    const navigate = useNavigate()
    const { pathname, search } = useLocation()
    const query = qs.parse(search, { ignoreQueryPrefix: true })
    const term = query.term || ''

    const searchTerms = term
        .split(/[^A-Z0-9 ]/ig)
        .filter(searchTerm => searchTerm !== '')
        .map(t => t.toLowerCase())

    let found = players[game]
    if (searchTerms.length > 0) {
        found = players[game]
            .filter(({ title }) =>
                searchTerms
                    .filter(
                        searchTerm => title
                            .toLowerCase()
                            .includes(searchTerm)
                    ).length > 0
            )
    }

    return (
        <div className='characters'>
            <div>
                <input
                    className="input mb-4"
                    type="text"
                    placeholder="Search name"
                    value={term}
                    onChange={({ target: { value } }) => {
                        navigate(`${pathname}?term=${encodeURIComponent(value)}`)
                    }}
                />
                {
                    found
                        .sort(({ title: left }, { title: right }) => {
                            if (left < right) return -1
                            if (left > right) return 1
                            return 0
                        })
                        .map((player, index) => (
                            <Card
                                key={player.name}
                                {...player}
                                first={index === 0}
                                isOpen={found.length === 1}
                            />
                        ))
                }
            </div>
        </div>
    )
}

export default CharactersPage