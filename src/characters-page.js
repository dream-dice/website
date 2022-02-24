import React, { useState } from 'react';
import Card from './card';
import NoResults from './no-results';
import players from './players.json';
import Search from './search';

const filterCharacters = (searchTerms) => ({ title }) =>
    searchTerms
        .filter(
            searchTerm => {
                if (searchTerm === '') return true
                if (title.toLowerCase().includes(searchTerm)) return true
                return false
            }
        ).length > 0

const CharactersPage = ({ game }) => {
    const [data, setData] = useState([])
    return (
        <div className='characters'>
            <div>
                <Search
                    filter={filterCharacters}
                    data={players[game]}
                    onChange={(data) => {
                        setData(data)
                    }}
                />
                {
                    data
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
                                isOpen={data.length === 1}
                            />
                        ))
                }
                { data.length === 0 && <NoResults />}
            </div>
        </div>
    )
}

export default CharactersPage