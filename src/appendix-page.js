import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import qs from 'qs'
import Card from './card'
import appendix from './appendix.json'

const CharactersPage = ({ game }) => {
    const navigate = useNavigate()
    const { pathname, search } = useLocation()
    const query = qs.parse(search, { ignoreQueryPrefix: true })
    const term = query.term || ''

    const searchTerms = term
        .split(/\W/g)
        .filter(searchTerm => searchTerm !== '')
        .map(t => t.toLowerCase())
        

    let found = appendix[game]
    if (searchTerms.length > 0) {
        found = appendix[game]
            .filter(({ title }) =>
                searchTerms
                    .filter(
                        searchTerm => title
                            .toLowerCase()
                            .replace(/\W*/g, '')
                            .includes(searchTerm)
                    ).length > 0
            )
    }

    return (
        <div className='appendix'>
            <div>
                <input
                    className="input mb-4"
                    type="text"
                    placeholder="Search appendix item"
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
                        .map((app, index) => (
                            <Card
                                key={app.name}
                                {...app}
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