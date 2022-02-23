import React, { useState } from 'react';
import appendix from './appendix.json';
import Card from './card';
import Search from './search';

const filterAppendix = (searchTerms) => ({ title }) =>
    searchTerms
        .filter(
            searchTerm => title
                .toLowerCase()
                .replace(/\W*/g, '')
                .includes(searchTerm)
        ).length > 0


const CharactersPage = ({ game }) => {
    const [data, setData] = useState([])

    return (
        <div className='appendix'>
            <div>
                <Search
                    filter={filterAppendix}
                    data={appendix[game]}
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
                        .map((app, index) => (
                            <Card
                                key={app.name}
                                {...app}
                                first={index === 0}
                                isOpen={data.length === 1}
                            />
                        ))
                }
            </div>
        </div>
    )
}

export default CharactersPage