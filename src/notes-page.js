import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import qs from 'qs'
import Card from './card'
import notes from './notes.json'

const NotesPage = ({ game }) => {
    const navigate = useNavigate()
    const {pathname, search} = useLocation()
    const query = qs.parse(search, {ignoreQueryPrefix: true})
    const term = query.term || ''

    const searchTerm = term.toLowerCase().replace(/\W*/g, '')

    return <div className='notes'>
        <div>
            <input
                className="input mb-4"
                type="text"
                placeholder="Search content"
                value={term}
                onChange={({ target: { value } }) => {
                    navigate(`${pathname}?term=${value}`)
                }}
            />
            {notes[game]
                .filter(({ title, description, notes }) => {
                    if (searchTerm === '') return true
                    if (title.toLowerCase().replace(/\W*/g, '').includes(searchTerm)) return true
                    if (description.toLowerCase().replace(/\W*/g, '').includes(searchTerm)) return true
                    if (notes.join(' ').toLowerCase().replace(/\W*/g, '').includes(searchTerm)) return true
                    return false

                })
                .sort(({ date: left }, { date: right }) => {
                    left = new Date(left).getTime()
                    right = new Date(right).getTime()
                    if (left < right) return 1
                    if (left > right) return -1
                    return 0
                })
                .map(note => <Card key={note.name} {...note} />)}
        </div>
    </div>
}

export default NotesPage