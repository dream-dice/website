import React from 'react'
import { Moon } from 'lunarphase-js';
import Card from './card'
import calendar from './calendar.json'
import { createEvent } from 'ics'
import Discord from './discord';

const timeOfDay = (time) => {
    const hour = time.getHours()
    if (hour >= 0 && hour < 4) return 'Late Night'
    if (hour >= 4 && hour < 8) return 'Early Morning'
    if (hour >= 8 && hour < 12) return 'Morning'
    if (hour >= 12 && hour < 16) return 'Afternoon'
    if (hour >= 16 && hour < 20) return 'Evening'
    if (hour >= 20 && hour < 24) return 'Night'
    return 'Unknown'
}

const moonPhase = (date) => {
    return `${Moon.lunarPhaseEmoji(date)} ${Moon.lunarPhase(date)} `
}

const Today = ({ time, weather }) => (
    <div className='content'>
        <p><b>Date:</b> {time.toLocaleString('en-GB', { timeZone: 'UTC' })}, {timeOfDay(time)}</p>
        <p><b>Weather:</b> {weather}</p>
        <p><b>Moon Phase:</b> {moonPhase(time)}</p>
    </div>
)

const Events = ({ events }) => (
    <Card title='Events' isOpen>
        <div className='table-container'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Event</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(({ time, value }) => (
                        <tr key={value}>
                            <td>
                                {time ? new Date(time).toLocaleString('en-GB', { timeZone: 'UTC' }).replace(', 00:00:00', '') : 'No time'}
                            </td>
                            <td>
                                {value}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Card>
)

const NextSession = ({ title, description, date, discord }) => (
    <div className='content'>
        <h3 className='subtitle mb-1'>{title}</h3>
        <p>{description}</p>
        <div className='buttons'>
            <button
                className='button is-link'
                onClick={() => {
                    date = new Date(date)

                    const event = {
                        start: [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes()],
                        duration: { hours: 2, minutes: 30 },
                        title: title,
                        description: description,
                        url: 'http://foundry.blankstring.com',
                        categories: ['game', 'dnd'],
                        organizer: { name: 'Luke Preston', email: 'lukejpreston@gmail.com' }
                    }

                    createEvent(event, (error, value) => {
                        var element = document.createElement('a');
                        element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(value)}`);
                        element.setAttribute('download', `${title}.ics`);
                        element.style.display = 'none';
                        document.body.appendChild(element);
                        element.click();
                        document.body.removeChild(element);
                    })
                }}
            >
                📆 Download event
            </button>
            <a
                disabled={typeof discord === 'undefined'}
                className='button is-text'
                href={discord || undefined}
                rel='noopener noreferrer'
                target='_blank'
            >
                <span className='icon mr-1'>
                    <Discord />
                </span>
                Discord link
            </a>
        </div>
    </div>
)

const CalendarPage = ({ game }) => {
    const { events, nextSession, time, weather } = calendar[game]

    return (
        <div>
            <Card
                title='Next Session'
                subtitle={new Date(nextSession.date).toLocaleString('en-GB', { timeZone: 'UTC' })}
                isOpen
            >
                <NextSession {...nextSession} />
            </Card>
            <Card
                title='Today'
                subtitle={new Date(time).toLocaleString('en-GB', { timeZone: 'UTC' })}
                isOpen
            >
                <Today time={new Date(time)} weather={weather} />
            </Card>
            <Events events={events} />
        </div >
    )
}

export default CalendarPage