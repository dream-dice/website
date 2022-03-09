import React, { useReducer, useState } from 'react'
import Card from './card'
import items from './items.json'
import chance from 'chance'

const links = {
    equipment: 'https://www.dndbeyond.com/equipment/',
    general: 'https://www.dndbeyond.com/equipment/',
    magicItem: 'https://www.dndbeyond.com/magic-items/',
    scrolls: 'https://www.dndbeyond.com/magic-items/spell-scroll/#',
    animals: 'https://www.dndbeyond.com/monsters/',
    name: 'https://www.google.com/search?tbm=isch&source=hp&biw=1280&bih=1304&q=dnd+'
}

const DDBLink = ({ href, name, keepCase = false }) => {
    let hrefName = name
    if (!keepCase) hrefName = name.toLowerCase()
    const url = `${href}${hrefName.replace(/ /g, '-').replace(/[,()']/g, '')}`
    if (href) return <a className='button is-ghost' target='_blank' href={url} rel="noopener noreferrer">{name}</a>
    return <button className='button is-black' >{name}</button>
}

const ItemTitle = ({ value, onChange, sort, onSort }) => (
    <th>
        <button className='button is-small is-fullwidth is-justify-content-start' onClick={() => {
            if (sort === 'asc') onSort('dsc')
            else if (sort === 'dsc') onSort('na')
            else if (sort === 'na') onSort('asc')
        }}>
            <div className={`arrow-${sort} mr-1`} />
            <span>Name</span>
        </button>
        <input
            type='text'
            className='input is-small'
            placeholder='Name'
            value={value}
            onChange={({ target: { value } }) => {
                onChange(value)
            }}
        />
    </th>
)


const ItemPrice = ({ value, onChange, sort, onSort }) => (
    <th>
        <button className='button is-small is-fullwidth is-justify-content-start' onClick={() => {
            if (sort === 'asc') onSort('dsc')
            else if (sort === 'dsc') onSort('na')
            else if (sort === 'na') onSort('asc')
        }}>
            <div className={`arrow-${sort} mr-1`} />
            <span>Price</span>
        </button>
        <input
            type='text'
            className='input is-small'
            placeholder='Max price in gp'
            value={value}
            onChange={({ target: { value } }) => {
                onChange(value)
            }}
        />
    </th>
)

const ItemType = ({ types, onToggle, onChange, open, checked, sort, onSort }) => {
    const checkedQuantity = Object.values(checked).reduce((prev, curr) => {
        if (curr) return prev + 1
        return prev
    }, 0)

    return (
        <th>
            <button className='button is-small is-fullwidth is-justify-content-start' onClick={() => {
                if (sort === 'asc') onSort('dsc')
                else if (sort === 'dsc') onSort('na')
                else if (sort === 'na') onSort('asc')
            }}>
                <div className={`arrow-${sort} mr-1`} />
                <span>Type</span>
            </button>
            <button className='button is-small is-fullwidth is-justify-content-start is-active' onClick={onToggle}>
                {open ? 'Hide' : 'Show'} filter {checkedQuantity > 0 && <span>({checkedQuantity})</span>}
            </button>
            {open && <div>
                {types.map(type => (
                    <div key={type}>
                        <label className='checkbox has-text-weight-light'>
                            <input type='checkbox' checked={checked[type]} onChange={({ target: { checked } }) => {
                                onChange({ type, checked })
                            }} />
                            <span className='pl-1'>{type}</span>
                        </label>
                    </div>
                ))}
            </div>}
        </th>
    )
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

const Shop = ({ itemType }) => {
    const initChecked = {}
    Object.values(items[itemType]).forEach(({ type }) => { initChecked[type] = false })

    const [{ typeOpen, checked, titleTerm, priceValue, sortTitle, sortPrice, sortType }, dispatch] = useReducer(
        (state, { type, payload }) => {
            if (type === 'type-toggle') state.typeOpen = payload.open
            if (type === 'type-checked') state.checked[payload.type] = payload.checked
            if (type === 'filter-title') state.titleTerm = payload.term
            if (type === 'max-price') state.priceValue = Number(payload.value) || ''
            if (type === 'sort-title') state.sortTitle = payload.sort
            if (type === 'sort-price') state.sortPrice = payload.sort
            if (type === 'sort-type') state.sortType = payload.sort
            return Object.assign({ ...state })
        }, {
        titleTerm: '',
        priceValue: '',
        typeOpen: false,
        checked: initChecked,
        sortTitle: 'asc',
        sortPrice: 'asc',
        sortType: 'asc'
    })

    const hasType = 'type' in items[itemType][0]
    const checkedQuantity = Object.values(checked).reduce((prev, curr) => {
        if (curr) return prev + 1
        return prev
    }, 0)

    return (
        <table className='table is-fullwidth is-striped is-narrow'>
            <thead>
                <tr>
                    <ItemTitle
                        sort={sortTitle}
                        value={titleTerm}
                        onSort={(sort) => { dispatch({ type: 'sort-title', payload: { sort } }) }}
                        onChange={(term) => { dispatch({ type: 'filter-title', payload: { term } }) }}
                    />
                    <ItemPrice
                        sort={sortPrice}
                        value={priceValue}
                        onSort={(sort) => { dispatch({ type: 'sort-price', payload: { sort } }) }}
                        onChange={(value) => { dispatch({ type: 'max-price', payload: { value } }) }}
                    />
                    {hasType && <ItemType
                        sort={sortType}
                        checked={checked}
                        open={typeOpen}
                        onSort={(sort) => { dispatch({ type: 'sort-type', payload: { sort } }) }}
                        onToggle={() => { dispatch({ type: 'type-toggle', payload: { open: !typeOpen } }) }}
                        onChange={({ type, checked }) => { dispatch({ type: 'type-checked', payload: { type, checked } }) }}
                        types={[...new Set(items[itemType].map(({ title, type }) => type || title))].sort()}
                    />}
                </tr>
            </thead>
            <tbody>
                {
                    items[itemType]
                        .filter(({ type }) => checkedQuantity === 0 || checked[type])
                        .filter(({ title }) => {
                            const searchTerms = titleTerm
                                .split(/[^A-Z0-9 ]/ig)
                                .filter(searchTerm => searchTerm !== '')
                                .map(t => t.toLowerCase().trim())

                            return titleTerm === '' ||
                                searchTerms.filter(term => title.toLowerCase().includes(term)).length > 0
                        })
                        .filter(({ price }) => {
                            return priceValue === '' ||
                                isNaN(priceValue) ||
                                priceToCopper(price) <= priceToCopper(`${priceValue}gp`)
                        })
                        .sort(({ title: leftTitle, price: leftPrice, type: leftType }, { title: rightTitle, price: rightPrice, type: rightType }) => {
                            if (sortPrice === 'asc' && priceToCopper(leftPrice) < priceToCopper(rightPrice)) return -3
                            if (sortPrice === 'asc' && priceToCopper(leftPrice) > priceToCopper(rightPrice)) return 3
                            if (sortPrice === 'dsc' && priceToCopper(leftPrice) < priceToCopper(rightPrice)) return 3
                            if (sortPrice === 'dsc' && priceToCopper(leftPrice) > priceToCopper(rightPrice)) return -3

                            if (sortType === 'asc' && leftType < rightType) return -2
                            if (sortType === 'asc' && leftType > rightType) return 2
                            if (sortType === 'dsc' && leftType < rightType) return 2
                            if (sortType === 'dsc' && leftType > rightType) return -2

                            if (sortTitle === 'asc' && leftTitle < rightTitle) return -1
                            if (sortTitle === 'dsc' && leftTitle > rightTitle) return -1
                            if (sortTitle === 'asc' && leftTitle < rightTitle) return 1
                            if (sortTitle === 'dsc' && leftTitle > rightTitle) return 1
                            return 0
                        })
                        .map(({ title, price, type }) => (
                            <tr key={title}>
                                <td>
                                    <DDBLink href={links[itemType]} name={title} />
                                </td>
                                <td>{price}</td>
                                {type && <td>{type}</td>}
                            </tr>
                        ))
                }
            </tbody>
        </table>
    )
}

const RandomGenerator = ({ href, title, random }) => {
    const [value, setValue] = useState(random())

    return (
        <div className="buttons has-addons">
            <button
                style={{
                    width: 120
                }}
                onClick={() => setValue(random())}
                className='button'
            >
                {title}
            </button>
            <DDBLink
                href={href}
                name={value}
            />
        </div>

    )
}

const RandomItem = ({ items, title, href }) => <RandomGenerator href={href} random={() => chance().pickone(items).title} title={title} />

const Random = () => (
    <div>
        <div className='mb-5'>
            <RandomItem items={items.general} title='Item' href={links.general} />
        </div>
        <div className='mb-5'>
            <RandomItem items={items.equipment} title='Equipment' href={links.equipment} />
        </div>
        <div className='mb-5'>
            <RandomItem items={items.magicItem} title='Magic item' href={links.magicItem} />
        </div>
        <div className='mb-5'>
            <RandomItem items={items.scrolls} title='Scroll' href={links.scrolls} />
        </div>
        <div className='mb-5'>
            <RandomItem items={items.animals} title='Animal' href={links.animals} />
        </div>
        <div>
            <RandomGenerator title='Male name' random={() => chance().first({ gender: 'male' })} href={links.name} />
            <RandomGenerator title='Female name' random={() => chance().first({ gender: 'female' })} href={links.name} />
        </div>
    </div>
)

const ShopAndServicesPage = () => {
    return (
        <div>
            <Card title='General'>
                <Shop itemType='general' />
            </Card>
            <Card title='Equipment'>
                <Shop itemType='equipment' />
            </Card>
            <Card title='Magic Items'>
                <Shop itemType='magicItem' />
            </Card>
            <Card title='Scrolls'>
                <Shop itemType='scrolls' />
            </Card>
            <Card title='Animals'>
                <Shop itemType='animals' />
            </Card>
            <Card title='Random'>
                <Random />
            </Card>
        </div>
    )
}

export default ShopAndServicesPage