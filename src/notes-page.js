import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import qs from 'qs'
import Card from './card'
import notes from './notes.json'

const NotesPage = ({ game }) => {
    const navigate = useNavigate()
    const { pathname, search } = useLocation()
    const query = qs.parse(search, { ignoreQueryPrefix: true })
    const term = query.term || ''


    const searchTerms = term
        .split(/[^A-Z0-9 ]/ig)
        .filter(searchTerm => searchTerm !== '')
        .map(t => t.toLowerCase())

    let found = notes[game]
    if (searchTerms.length > 0) {
        found = notes[game]
            .filter(({ title, description, notes }) =>
                searchTerms
                    .filter(
                        searchTerm => {
                            if (searchTerm === '') return true
                            if (title.toLowerCase().includes(searchTerm)) return true
                            if (description.toLowerCase().includes(searchTerm)) return true
                            if (notes.join(' ').toLowerCase().includes(searchTerm)) return true
                            return false
                        }
                    ).length > 0
            )
    }


    return <div className='notes'>
        <div>
            <input
                className="input mb-4"
                type="text"
                placeholder="Search content"
                value={term}

                onChange={({ target: { value } }) => {
                    navigate(`${pathname}?term=${encodeURIComponent(value)}`)
                }}
            />
            {found
                .sort(({ date: left }, { date: right }) => {
                    left = new Date(left).getTime()
                    right = new Date(right).getTime()
                    if (left < right) return 1
                    if (left > right) return -1
                    return 0
                })
                .map(note => <Card key={note.name} {...note} open={found.length === 1} />)}
        </div>
    </div>
}

export default NotesPage