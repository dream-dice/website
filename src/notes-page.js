import React, { useState } from 'react'
import Card from './card'
import notes from './notes.json'

const NotesPage = ({ game }) => {
    const [term, setTerm] = useState('')
    return <div className='notes'>
        <div>
            <input
                className="input mb-4"
                type="text"
                placeholder="Search content"
                onChange={({ target: { value } }) => setTerm(value.toLowerCase().replace(/\W*/g, ''))}
            />
            {notes[game]
                .filter(({ title, description, notes }) => {
                    if (term === '') return true
                    if (title.toLowerCase().replace(/\W*/g, '').includes(term)) return true
                    if (description.toLowerCase().replace(/\W*/g, '').includes(term)) return true
                    if (notes.join(' ').toLowerCase().replace(/\W*/g, '').includes(term)) return true
                    return false

                })
                .sort(({ name: left }, { name: right }) => {
                    if (left < right) return 1
                    if (left > right) return -1
                    return 0
                })
                .map(note => <Card key={note.name} {...note} />)}
        </div>
    </div>
}

export default NotesPage