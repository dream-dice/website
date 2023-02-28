import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import dmNotes from './dm-notes.json'
import Card from './card'
import Search from './search'
import Cookies from 'js-cookie'
import NotFound from './not-found-page'

const filterDmNotes = (searchTerms) => ({ title }) =>
    searchTerms
        .filter(
            searchTerm => {
                if (searchTerm === '') return true
                if (title.toLowerCase().includes(searchTerm)) return true
                return false
            }
        ).length > 0


const DmNotesPage = ({ game }) => {
    const { section = 'none' } = useParams()
    const [data, setData] = useState([])

    const isDm = Cookies.get('dm')

    if (!isDm) return <NotFound />

    return (
        <div>
            <div>
                <Search
                    filter={filterDmNotes}
                    data={dmNotes[game]}
                    onChange={(data) => {
                        setData(data)
                    }}
                />
                {
                    data
                        .sort(({ date: left }, { date: right }) => {
                            if (new Date(left).getTime() < new Date(right).getTime()) return -1
                            if (new Date(left).getTime() > new Date(right).getTime()) return 1
                            return 0
                        })
                        .map((app, index) => (
                            <Card
                                key={app.name}
                                {...app}
                                base={`${game}/dmNotes`}
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

export default DmNotesPage