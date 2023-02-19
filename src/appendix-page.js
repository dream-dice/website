import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import appendix from './appendix.json';
import Card from './card';
import Search from './search';

const filterAppendix = (searchTerms) => ({ title }) =>
    searchTerms
        .filter(
            searchTerm => {
                if (searchTerm === '') return true
                if (title.toLowerCase().includes(searchTerm)) return true
                return false
            }
        ).length > 0


const CharactersPage = ({ game }) => {
    const { section = 'none' } = useParams()
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
                                base={`${game}/appendix`}
                                section={app.name}
                                first={index === 0}
                                isOpen={section === app.name}
                            />
                        ))
                }
            </div>
        </div>
    )
}

export default CharactersPage