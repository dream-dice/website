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

const Generator = ({ dispatch, state, name, title }) => (
    <div className='columns'>
        <div className='column is-4'>
            <button className='button is-fullwidth' onClick={() => {
                const value = generate(name)
                dispatch({
                    type: 'generate',
                    payload: {
                        name,
                        value
                    }
                })
            }}>{title}</button>
            </div>
            <div className='column is-4'>
            {state[name] && <button className='button is-text is-fullwidth'>{state[name]}</button>}
            </div>
        <div className='column is-4'>
            <button className='button is-ghost is-fullwidth' onClick={() => {
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
                {random[name].map(item => <li key={item}>{item}</li>)}
            </ul>}
        </div>
        
    </div>
)

const Random = () => {
    const [state, dispatch] = useReducer(reducer, { rich: 0, common: null, uncommon: null, open: [] })

    return (
        <div>
            <p>Random generator</p>
            <p>
                This page is here for shortcuts to be able to randomly generate things for my campaign, I use this with Discord to reward people in combination with Tatsu
            </p>
            <Generator dispatch={dispatch} state={state} name='common' title='Common'/>
            <Generator dispatch={dispatch} state={state} name='uncommon' title='Uncommon'/>
            <Generator dispatch={dispatch} state={state} name='attribute' title='Attribute'/>
            <Generator dispatch={dispatch} state={state} name='rare' title='Rare'/>
            <Generator dispatch={dispatch} state={state} name='feat' title='Feat'/>
            <Generator dispatch={dispatch} state={state} name='very-rare' title='Very Rare'/>
            <Generator dispatch={dispatch} state={state} name='legendary' title='Legendary'/>
        </div>
    )
}

export default Random