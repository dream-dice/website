import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from './card';
import notes from './notes.json';
import Search from './search';

const filterNotes = (searchTerms) => ({ title, description, notes }) =>
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

const NotesPage = ({ game }) => {
    const { section = 'none' } = useParams()
    const [data, setData] = useState([])

    return <div className='notes'>
        <div>
            <Search
                filter={filterNotes}
                data={notes[game]}
                onChange={(data) => {
                    setData(data)
                }}
            />
            {data
                .sort(({ date: left }, { date: right }) => {
                    left = new Date(left).getTime()
                    right = new Date(right).getTime()
                    if (left < right) return 1
                    if (left > right) return -1
                    return 0
                })
                .map((note, index) => <Card
                    key={note.name}
                    base={`${game}/notes`}
                    section={note.index}
                    {...note}
                    isOpen={section === note.index}
                />)}
        </div>
    </div>
}

export default NotesPage