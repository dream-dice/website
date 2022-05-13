import React, { useEffect, useReducer } from 'react'
import { Moon } from "lunarphase-js";
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

const reducer = (state, { type, payload }) => {
    if (type === 'reset') return { ...state, time: new Date(state.initialTime) }
    if (type === 'start') return { ...state, running: 'started' }
    if (type === 'stop') return { ...state, running: 'stopped' }
    if (type === 'combat') return { ...state, running: 'stopped', combat: true }
    if (type === 'combat-end') return { ...state, combat: false, time: new Date(state.time.getTime() + 6 * 1000), round: 0 }
    if (type === 'next-round') return { ...state, time: new Date(state.time.getTime() + 6 * 1000), round: state.round + 1 }
    if (type === 'previous-round') return { ...state, time: new Date(state.time.getTime() - 6 * 1000), round: state.round - 1 }
    if (type === 'update-round') {
        const { round: currentRound } = state
        const { round: updatedRound } = payload
        const diff = updatedRound - currentRound
        return { ...state, round: updatedRound, time: new Date(state.time.getTime() + diff * 6 * 1000) }
    }
    if (type === 'running') return { ...state, ...payload, running: 'running' }
    if (type === 'tick') return { ...state, time: new Date(state.time.getTime() + 1000) }
    if (type === 'skip') {
        let skip = state.skipValue * 1000
        if (state.skipType === 'days') skip = skip * 24 * 60 * 60
        if (state.skipType === 'hours') skip = skip * 60 * 60
        if (state.skipType === 'minutes') skip = skip * 60
        return { ...state, time: new Date(state.time.getTime() + skip) }
    }
    return { ...state, ...payload }
}

const Today = ({ time, weather }) => (
    <Card title='Today'>
        <div className='content'>
            <p><b>Date:</b> {time.toLocaleString()}, {timeOfDay(time)}</p>
            <p><b>Weather:</b> {weather}</p>
            <p><b>Moon Phase:</b> {moonPhase(time)}</p>
        </div>
    </Card>
)

const UpcomingEvents = ({ events }) => (
    <Card title='Upcoming Events'>
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
                                {time ? new Date(time).toLocaleString().replace(', 00:00:00', '') : 'No time'}
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

const Controls = ({ dispatch, running, combat }) => (
    <div className='field is-horizontal'>
        <div className='field-label is-normal' style={{ flexGrow: 0, minWidth: 50 }}>
            <label className='label'>Controls</label>
        </div>
        <div className='field-body'>
            <div className='field'>
                <div className='buttons'>
                    <button
                        className='button is-danger'
                        onClick={() => dispatch({ type: 'reset' })}
                    >
                        Reset
                    </button>
                    <button
                        disabled={running !== 'stopped' || combat}
                        className='button is-success'
                        onClick={() => dispatch({ type: 'start' })}
                    >
                        Start
                    </button>
                    <button
                        disabled={running !== 'running'}
                        className='button is-info'
                        onClick={() => dispatch({ type: 'stop' })}
                    >
                        Stop
                    </button>
                    <button
                        disabled={combat}
                        className='button is-warning'
                        onClick={() => dispatch({ type: 'combat' })}
                    >
                        Start combat
                    </button>
                </div>
            </div>
        </div>
    </div>
)

const Skip = ({ dispatch, skipValue, skipType }) => (
    <div className='field is-horizontal'>
        <div className='field-label is-normal' style={{ flexGrow: 0, minWidth: 50 }}>
            <label className='label'>Skip</label>
        </div>
        <div className='field-body'>
            <div className='field' style={{ flexGrow: 0, maxWidth: 75 }}>
                <div className='control'>
                    <input
                        className='input'
                        type='number'
                        value={skipValue}
                        onChange={({ target: { value } }) => {
                            dispatch(
                                {
                                    type: 'skip-value',
                                    payload: { skipValue: value }
                                }
                            )
                        }}
                    />
                </div>
            </div>
            <div className='field has-addons' style={{ flexGrow: 0 }}>
            <div className='control'>
                    <button
                        className={`button ${skipType === 'days' ? 'is-info' : ''}`}
                        onClick={() => {
                            dispatch(
                                {
                                    type: 'skip-type',
                                    payload: { skipType: 'days' }
                                }
                            )
                        }}
                    >
                        <span>Days</span>
                    </button>
                </div>
                <div className='control'>
                    <button
                        className={`button ${skipType === 'hours' ? 'is-info' : ''}`}
                        onClick={() => {
                            dispatch(
                                {
                                    type: 'skip-type',
                                    payload: { skipType: 'hours' }
                                }
                            )
                        }}
                    >
                        <span>Hours</span>
                    </button>
                </div>
                <div className='control'>
                    <button
                        className={`button ${skipType === 'minutes' ? 'is-info' : ''}`}
                        onClick={() => {
                            dispatch(
                                {
                                    type: 'skip-type',
                                    payload: { skipType: 'minutes' }
                                }
                            )
                        }}
                    >
                        <span>Minutes</span>
                    </button>
                </div>
                <div className='control'>
                    <button
                        className={`button ${skipType === 'seconds' ? 'is-info' : ''}`}
                        onClick={() => {
                            dispatch(
                                {
                                    type: 'skip-type',
                                    payload: { skipType: 'seconds' }
                                }
                            )
                        }}
                    >
                        <span>Seconds</span>
                    </button>
                </div>
            </div>
            <div className='field'>
                <div className='buttons'>
                    <button
                        className='button is-success'
                        onClick={() => dispatch({ type: 'skip' })}
                    >
                        Skip time
                    </button>
                </div>
            </div>
        </div>
    </div>
)

const Combat = ({ dispatch, combat, round }) => (
    <div className='field is-horizontal'>
        <div className='field-label is-normal' style={{ flexGrow: 0, minWidth: 50 }}>
            <label className='label'>Round</label>
        </div>
        <div className='field-body'>
            <div className='field' style={{ flexGrow: 0, maxWidth: 75 }}>
                <div className='control'>
                    <input
                        disabled={combat === false}
                        className='input'
                        type='number'
                        value={round}
                        onChange={({ target: { value } }) => {
                            dispatch({
                                type: 'update-round',
                                payload: {
                                    round: parseInt(value, 10)
                                }
                            })
                        }}
                    />
                </div>
            </div>
            <div className='field' style={{ flexGrow: 0 }}>
                <div className='control'>
                    <div className='buttons'>
                        <button
                            disabled={combat === false}
                            className='button is-danger'
                            onClick={() => dispatch({ type: 'combat-end' })}
                        >
                            End combat
                        </button>

                        <button
                            onClick={() => dispatch({ type: 'next-round' })}
                            disabled={combat === false}
                            className='button is-success'
                        >
                            Next round
                        </button>

                        <button
                            onClick={() => dispatch({ type: 'previous-round' })}
                            disabled={round <= 0}
                            className='button is-info'
                        >
                            Previous round
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

const CalendarPage = ({ game }) => {
    const data = calendar[game]
    const [
        {
            time,
            running,
            timeout,
            combat,
            round,
            skipValue,
            skipType
        },
        dispatch
    ] = useReducer(
        reducer,
        {
            time: new Date(new Date(data.time).getTime() + data.round * 6 * 1000),
            running: 'stopped',
            timeout: null,
            combat: data.combat,
            round: data.round,
            skipValue: 0,
            skipType: 'hours',
            initialTime: data.time
        }
    )

    useEffect(() => {
        if (running === 'started') {
            clearInterval(timeout)
            const newTimeout = setInterval(() => {
                dispatch({ type: 'tick' })
            }, 1000)
            dispatch({
                type: 'running',
                payload: { timeout: newTimeout }
            })
        } else if (running === 'stopped') {
            clearInterval(timeout)
        }
    }, [running, timeout])

    return (
        <div>
            <Today time={time} weather={data.weather} />
            <UpcomingEvents events={data.events} />
            <Card title='Controls'>
                <Controls dispatch={dispatch} running={running} combat={combat} />
                <Skip dispatch={dispatch} skipValue={skipValue} skipType={skipType} />
                <Combat dispatch={dispatch} combat={combat} round={round} />
            </Card>
        </div>
    )
}

export default CalendarPage