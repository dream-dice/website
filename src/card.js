import React, { useEffect, useState } from 'react'
import Markdown from './markdown'
import factions from './factions.json'

const Card = ({
    image,
    title,
    faction,
    rank,
    renown,
    race,
    description,
    content,
    date,
    class: playerClass = [],
    famous = [],
    notes = [],
    first = false,
    isOpen = false
}) => {
    const { title: factionTitle } = factions[faction] || {}
    const [open, setOpen] = useState(isOpen)
    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    const showMeta = race || playerClass.length > 0 || factionTitle

    return (
        <div className={`card mt-${first ? '0' : (open ? '5' : '2')} mb-${open ? '5' : '2'}`}>
            <button className="card-header" onClick={() => setOpen(!open)}>
                <div className='card-header-title'>
                    {image && (
                        <div className={`image is-${open ? '64x64' : '32x32'} mr-2`}>
                            <img src={`/avatars/${image}.png`} alt={title} key={title} />
                        </div>
                    )}
                    <span className={`text has-text-left is-size-${open ? '3' : '5'} is-size-${open ? '5' : '6'}-mobile`}>
                        {title}
                    </span>
                    {date && <span className='card-header-date'>{new Date(date).toLocaleDateString()}</span>}
                </div>
            </button>
            {open && <div className="card-content">
                {showMeta && (
                    <div className='level'>
                        <div className='level-left'>
                            <div className='level-item'>
                                <div className="content">
                                    <h2 className='subtitle'>
                                        {(race || playerClass.length > 0) && <div className='is-size-4 mb-2'>
                                            <span className='pr-2'>{race}</span>
                                            {playerClass.map(({ title, level }) => (<span key={title} className='has-text-weight-light mr-1'>{title} {level && <span>{level}</span>}</span>))}
                                        </div>}
                                        {factionTitle && <div className='is-size-6'>
                                            <span className='pr-2'>{factionTitle}</span>
                                            <span className='has-text-weight-light'>{rank} {renown >= 0 && <span>({renown})</span>}</span>
                                        </div>}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className='content'>
                    {description && <p>{description}</p>}
                    {content && <Markdown path={content} />}
                    {famous.length > 0 && <>
                        <h2 className='subtitle'>
                            Famously
                        </h2>
                        <ul>
                            {famous.map(item => <li key={item}>{item}</li>)}
                        </ul>
                    </>}
                    {notes.length > 0 && <>
                        <h2 className='subtitle'>
                            Notes
                        </h2>
                        <ul>
                            {notes.map(item => <li key={item}>{item}</li>)}
                        </ul>
                    </>}
                </div>
            </div>
            }
        </div>
    )
}

export default Card
