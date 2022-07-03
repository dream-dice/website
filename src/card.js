import React, { useEffect, useState } from 'react'
import Markdown from './markdown'
import factions from './factions.json'

const Card = ({
    image,
    index,
    title,
    subtitle,
    faction,
    rank,
    renown,
    race,
    description,
    current,
    next,
    why,
    content,
    date,
    dateTime,
    class: playerClass = [],
    famous = [],
    notes = [],
    first = false,
    isOpen = false,
    children
}) => {
    const { title: factionTitle } = factions[faction] || {}
    const [open, setOpen] = useState(isOpen)
    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    const showMeta = race || playerClass.length > 0 || factionTitle

    const showContent = description || content || famous.length > 0 || notes.length > 0

    return (
        <div className={`card mt-${first ? '0' : (open ? '5' : '2')} mb-${open ? '5' : '2'}`}>
            <button className="card-header" onClick={() => setOpen(!open)}>
                <div style={{ width: '100%' }}>
                    <div className='card-header-title'>
                        {image && (
                            <div className={`image is-${open ? '64x64' : '32x32'} mr-2`}>
                                <img src={`/avatars/${image}.png`} alt={title} key={title} />
                            </div>
                        )}
                        {index && (
                            <div className={`card-index mr-2 is-${open ? 'open' : 'closed'} lato`}>
                                <span>{index}</span>
                            </div>
                        )}
                        <span className={`text has-text-left is-size-${open ? '3' : '5'} is-size-${open ? '5' : '6'}-mobile`}>
                            {title}
                        </span>
                        {date && <span className='card-header-date'>{new Date(date).toLocaleDateString()}</span>}
                        {dateTime && <span className='card-header-date'>{new Date(dateTime).toLocaleString('en-GB', { timeZone: 'UTC' })}</span>}
                    </div>
                </div>
                {subtitle && (
                    <div className='card-header-subtitle'>
                        <span className={`text has-text-left is-size-${open ? '5' : '7'} is-size-${open ? '5' : '6'}-mobile`}>
                            {subtitle}
                        </span>
                    </div>
                )}
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
                {showContent && <div className='content'>
                    {description && <p>{description}</p>}
                    {content && <Markdown path={content} />}
                    {current && (
                        <div className='content'>
                            <h3>What are we currently doing?</h3>
                            <p>{current}</p>
                        </div>
                    )}
                    {next && (
                        <div className='content'>
                            <h3>What are we are we doing next?</h3>
                            <p>{next}</p>
                        </div>
                    )}
                    {why && (
                        <div className='content'>
                            <h3>Why are we doing this?</h3>
                            <p>{why}</p>
                        </div>
                    )}
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
                        <div>
                            <ul>
                                {notes.map(({ title, value }) => (
                                    <li
                                        key={value || title}
                                        style={{ listStyle: title ? 'none' : 'initial' }}
                                    >
                                        {title && <h4 className='mt-4'>{title}</h4>}
                                        {value && <span>{value}</span>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>}
                </div>}
                {children}
            </div>
            }
        </div>
    )
}

export default Card
