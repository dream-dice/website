import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from './card';
import maps from './maps.json';
import Search from './search';
import { capitalCase } from 'change-case';

const filterMaps = (searchTerms) => ({ name }) =>
    searchTerms
        .filter(
            searchTerm => {
                if (searchTerm === '') return true
                if (name.toLowerCase().includes(searchTerm)) return true
                return false
            }
        ).length > 0

const MapsPage = () => {
    const [data, setData] = useState([])
    const { section = 'none' } = useParams()

    return <div className='maps'>
        <p className='content mt-5 mb-5 is-size-5'>
            All of these maps are made using <a href='https://www.dungeonalchemist.com/'>Dungeon Alchemist</a> and are available for anyone to use. I use the maps for my own campaign and if anyone finds them helpful, please feel free to use them. The maps come as they are with no promises that they will even be available
        </p>
        <div>
            <Search
                filter={filterMaps}
                data={maps}
                onChange={(data) => {
                    setData(data)
                }}
            />
            {data
                .sort(({ name: left }, { name: right }) => {
                    if (left < right) return -1
                    if (left > right) return 1
                    return 0
                })
                .map(({ name, filename }) => <Card
                    key={name}
                    base='maps'
                    section={name}
                    filename={`/maps/${filename}`}
                    title={capitalCase(name)}
                    isOpen={section === name}
                />
                )
            }
        </div>
    </div>
}

export default MapsPage