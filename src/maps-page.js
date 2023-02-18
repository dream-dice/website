import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from './card';
import maps from './maps.json';
import Search from './search';

const filterMaps = (searchTerms) => ({ title, description }) =>
    searchTerms
        .filter(
            searchTerm => {
                if (searchTerm === '') return true
                if (title.toLowerCase().includes(searchTerm)) return true
                if (description.toLowerCase().includes(searchTerm)) return true
                return false
            }
        ).length > 0

const MapsPage = () => {
    const [data, setData] = useState([])
    const {search} = useLocation()

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
                .filter(({hide}) => search.includes('show') || !hide)
                .sort(({ date: left }, { date: right }) => {
                    left = new Date(left).getTime()
                    right = new Date(right).getTime()
                    if (left < right) return 1
                    if (left > right) return -1
                    return 0
                })
                .map((map) => <Card
                    key={map.title}
                    {...map}
                    isOpen={data.length === 1}
                />)}
        </div>
    </div>
}

export default MapsPage