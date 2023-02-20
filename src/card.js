import copy from 'copy-to-clipboard';
import React, { useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useLocation, useNavigate } from 'react-router-dom';
import gfm from 'remark-gfm';
import Markdown from './markdown';

const Card = ({
    image,
    index,
    title,
    subtitle,
    description,
    current,
    next,
    why,
    content,
    filename,
    date,
    dateTime,
    famous = [],
    notes = [],
    first = false,
    isOpen = false,
    children,
    base = null,
    section,
    clearSearch = false
}) => {
    const navigate = useNavigate()
    const { search } = useLocation()
    const [open, setOpen] = useState(isOpen)
    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    const showContent = description || content || famous.length > 0 || notes.length > 0

    return (
        <div className={`card mt-${first ? '0' : (open ? '5' : '2')} mb-${open ? '5' : '2'}`}>
            <button
                className="card-header"
                onClick={() => {
                    if (base !== null) {
                        navigate(
                            `${!open ? `/${base}/${section}` : `/${base}`}${!clearSearch ? search : ''}`
                        )
                    }
                    setOpen(!open)
                }}>
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
                {showContent && <div className='content'>
                    {description && (
                        <ReactMarkdown
                            remarkPlugins={[gfm]}
                            children={description}
                        />
                    )}
                    {filename && (
                        <div className='content'>
                            <div className="buttons mb-2">
                                <a href={`${window.location.origin}/${filename}`} download className='button is-link'>📁 Download</a>
                                <button className='button is-link' onClick={() => { copy(`${window.location.origin}/${filename}`) }}>📋 Copy file URL</button>
                            </div>
                            {filename.endsWith('jpg') && <img src={`${window.location.origin}/hotlink-ok/${filename}`} alt={title} />}
                            {filename.endsWith('mp4') && (
                                <video controls>
                                    <source src={`${window.location.origin}/hotlink-ok/${filename}`} type="video/mp4" />
                                </video>
                            )}
                        </div>
                    )}
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
