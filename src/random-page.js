import React from 'react'
import Chance from 'chance'
import { useReducer } from 'react'
import random from './random.json'

const chance = Chance()
const generate = (name) => chance.pickone(random[name])

const reducer = (state, { type, payload: { name, value } }) => {
    if (type === 'toggle') {
        const { open } = state
        if (open.includes(name)) return { ...state, open: open.filter(item => item !== name) }
        else return { ...state, open: open.concat(name) }
    }
    if (type === 'generate') return { ...state, [name]: value }
    return state
}

const DDBLink = ({ href, name, keepCase = false }) => {
    let hrefName = name
    if (!keepCase) hrefName = name.toLowerCase()
    const url = `${href}${hrefName.replace(/ /g, '-').replace(/[,()']/g, '')}`
    return <a target='_blank' href={url} rel="noopener noreferrer">{name}</a>
}

const Generator = ({ dispatch, state, name, title, href, keepCase }) => (
    <div>
        <div className='is-flex random'>
            <div className='random-list'>
                <button
                    style={{
                        justifyContent: 'left'
                    }}
                    className='button is-ghost is-fullwidth'
                    onClick={() => {
                        dispatch({
                            type: 'toggle',
                            payload: {
                                name
                            }
                        })
                    }}>{state.open.includes(name) ? 'Collapse' : 'Expand'} {title} List</button>
                {state.open.includes(name) && <ul style={{
                    overflow: 'auto',
                    maxHeight: 100
                }}>
                    {random[name].sort().map(item => <li key={item}>{<DDBLink name={item} href={href} keepCase={keepCase} />}</li>)}
                </ul>}
            </div>
            <div className='random-roll'>
                <button
                    className='button is-fullwidth'
                    onClick={() => {
                        const value = generate(name)
                        dispatch({
                            type: 'generate',
                            payload: {
                                name,
                                value
                            }
                        })
                    }}>Roll {title}</button>
            </div>
            <div className='random-result is-hidden-mobile'>
                {state[name] && <DDBLink name={state[name]} href={href} />}
            </div>
        </div>
        <div className={`random-result is-visible-mobile is-hidden-tablet${state[name] ? '' : ' is-hidden'}`}>
            {state[name] && <DDBLink name={state[name]} href={href} />}
        </div>
    </div>

)

const Random = () => {
    const [state, dispatch] = useReducer(reducer, { rich: 0, common: null, uncommon: null, open: [] })

    return (
        <div className='mt-3'>
            <div className='content'>
                <h1 className='title'>Random Item Generator</h1>
                <p>
                    As part of the Discord server everyone is rewarded using <a href='https://tatsu.gg/'>Tatsu</a>. Here are the generators which I use to roll for random items.
                </p>
            </div>
            <Generator dispatch={dispatch} state={state} name='common' title='Common' href='https://www.dndbeyond.com/equipment/' />
            <Generator dispatch={dispatch} state={state} name='uncommon' title='Uncommon' href='https://www.dndbeyond.com/magic-items/' />
            <Generator dispatch={dispatch} state={state} name='attribute' title='Attribute' href='https://www.dndbeyond.com/sources/phb/using-ability-scores#' keepCase />
            <Generator dispatch={dispatch} state={state} name='rare' title='Rare' href='https://www.dndbeyond.com/magic-items/' />
            <Generator dispatch={dispatch} state={state} name='feat' title='Feat' href='https://www.dndbeyond.com/feats/' />
            <Generator dispatch={dispatch} state={state} name='very-rare' title='Very Rare' href='https://www.dndbeyond.com/magic-items/' />
            <Generator dispatch={dispatch} state={state} name='legendary' title='Legendary' href='https://www.dndbeyond.com/magic-items/' />
        </div>
    )
}

export default Random