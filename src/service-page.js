import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import services from './services.json'
import { useEffect, useReducer, useState } from 'react';

const fetchChildren = async (path, setChildren) => {
    try {
        const res = await fetch(path, {
            headers: {
                accept: 'text/plain'
            }
        })
        const children = await res.text()
        if (children.includes('<!DOCTYPE html>')) setChildren('There was an issue getting this service.')
        else setChildren(children)
    } catch (err) {
        setChildren('There was an issue getting this page')
    }
}

const priceToCopper = (price) => {
    return price
        .split(' ')
        .map(chunk => {
            const value = parseInt(chunk, 10)
            if (chunk.includes('sp')) return value * 10
            if (chunk.includes('ep')) return value * 50
            if (chunk.includes('gp')) return value * 100
            if (chunk.includes('pp')) return value * 1000
            return value
        })
        .reduce((prev, curr) => prev + curr, 0)
}

const sort = (price) => (left, right) => {
    const leftPrice = priceToCopper(left.price)
    const rightPrice = priceToCopper(right.price)
    if (leftPrice < rightPrice) return price === 'asc' ? 1 : -1
    if (leftPrice > rightPrice) return price === 'asc' ? -1 : 1
    return 0
}

const filter = ({ items, search }) => items.filter(({ title }) => title.toLowerCase().includes(search.toLowerCase()))

const itemsReducer = (state, { type, payload }) => {
    if (type === 'sort') {
        const { kind } = payload
        return {
            ...state,
            [kind]: state[kind] === 'asc' ? 'dsc' : 'asc'
        }
    }
    if (type === 'search') {
        const { search } = payload
        return {
            ...state,
            search
        }
    }
    return state
}

const Items = ({ items }) => {
    const [{ price, search }, dispatch] = useReducer(itemsReducer, { price: 'asc', search: '', items })

    return (
        <table className='table is-striped is-narrow is-fullwidth'>
            <thead>
                <tr>
                    <th>

                        <input
                            type='text'
                            className='input is-small'
                            placeholder='Name'
                            value={search}
                            onChange={({ target: { value: search } }) => {
                                dispatch({
                                    type: 'search',
                                    payload: {
                                        search
                                    }
                                })
                            }}
                        />

                    </th>
                    <th>
                        <button
                            className='button is-small'
                            onClick={() => {
                                dispatch({
                                    type: 'sort',
                                    payload: {
                                        kind: 'price'
                                    }
                                })
                            }}
                        >
                            <div className={`arrow-${price} mr-1`} />
                            <span>Price</span>
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>{
                filter({ items, search })
                    .sort(sort(price))
                    .map(({ title, price }) => (
                        <tr key={title}>
                            <td>{title}</td>
                            <td>{price}</td>
                        </tr>
                    ))
            }</tbody>
        </table>
    )
}

const Service = () => {
    const { service } = useParams()
    const path = `/service/${service}.md`
    const [children, setChildren] = useState('Loading')

    useEffect(() => {
        if (service in services) {
            fetchChildren(path, setChildren)
        }
    }, [path, service])


    if (!(service in services)) return <div>Service not found!</div>

    const { title, items = [] } = services[service]

    return (
        <div className='mt-3'>
            <div className='content'>
                <h1 className='title'>{title}</h1>
                <ReactMarkdown plugins={[gfm]}>{children}</ReactMarkdown>
                {
                    items.length > 0 && <Items items={items} />
                }
            </div>
        </div>
    )
}

export default Service