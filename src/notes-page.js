import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Card from './card';
import Search from './search';

const filterNotes = (searchTerms) => ({ title }) =>
    searchTerms
        .filter(
            searchTerm => {
                if (searchTerm === '') return true
                if (title.toLowerCase().includes(searchTerm)) return true
                return false
            }
        ).length > 0

const NotesPage = ({ game, notes, base }) => {
    const { section = 'none' } = useParams()
    const [data, setData] = useState(notes[game])

    return <div>
        <div>
            <Search
                filter={filterNotes}
                data={notes[game]}
                onChange={(data) => {
                    setData(data)
                }}
            />
            {data
                .filter(note => {
                    if (section === 'none') return true
                    return `${note.index}` === section
                })
                .sort(({ index: left }, { index: right }) => {
                    if (right === 0) return 2
                    if (left === 0) return -2
                    if (left < right) return 1
                    if (left > right) return -1
                    return 0
                })
                .map((note) => <Card
                    key={note.name}
                    base={`${game}/${base}`}
                    section={note.index}
                    {...note}
                    isOpen={Number(section) === Number(note.index)}
                    clearSearch
                />)}
        </div>
    </div>
}

export default NotesPage