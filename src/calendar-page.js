import React from 'react'
import { Moon } from 'lunarphase-js';
import Card from './card'
import calendar from './calendar.json'

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

const CalendarPage = ({ game }) => {
    const { events, time, weather } = calendar[game]

    return (
        <div>
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