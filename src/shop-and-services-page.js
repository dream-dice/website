import React, { useReducer, useState } from 'react'
import Card from './card'
import items from './items.json'
import names from './names.json'
import tables from './tables.json'
import chance from 'chance'
import copy from 'copy-to-clipboard'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

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
    if (href) return <a className='button is-ghost' target='_blank' href={url} rel='noopener noreferrer'>{name}</a>
    return <button className='button is-text' onClick={() => { copy(name) }}>{name}</button>
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
        <div className='table-container'>
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
        </div>
    )
}

const RandomGenerator = ({ href, title, random }) => {
    const [value, setValue] = useState(random())

    return (
        <div className='buttons has-addons'>
            <button
                style={{
                    padding: 15,
                    minWidth: 120
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
            <RandomGenerator title='Male' random={() => chance().pickone(names.male)} href={links.name} />
            <RandomGenerator title='Female' random={() => chance().pickone(names.female)} href={links.name} />
            <RandomGenerator title='Last' random={() => chance().pickone(names.last)} href={links.name} />
            <RandomGenerator title='Dragons' random={() => chance().pickone(names.dragon)} href={links.name} />
            <RandomGenerator title='Undead' random={() => chance().pickone(names.undead)} href={links.name} />
            <RandomGenerator title='Trees' random={() => chance().pickone(names.trees)} href={links.name} />
            <RandomGenerator title='Bullywugs' random={() => chance().pickone(names.bullywug)} href={links.name} />
            <RandomGenerator title='Pixie' random={() => chance().pickone(names.pixie)} href={links.name} />
        </div>
    </div>
)

const Treasure = () => {
    const [challenge, setChallenge] = useState(tables.challenge04)
    const { table } = challenge

    const magicItem = (items) => {
        const side = chance().integer({ min: 1, max: 100 })
        const found = items.find(({ range }) => range[0] <= side && range[1] >= side)
        if (typeof found === 'undefined') {
            console.log(side, found)
            return 'what now?'
        }
        return found.value
    }

    const checkAll = () => {
        const items = tables.magicC
        for (let side = 1; side < 100; side++) {
            const found = items.find(({ range }) => range[0] <= side && range[1] >= side)
            if (typeof found === 'undefined') {
                console.log(side, found)
            }
        }
    }
    checkAll()

    const items = (max, item) => {
        if (max === null) return []
        const length = chance().integer({ min: 1, max })
        return Array.from({ length }, () => magicItem(tables[item]))
    }

    const coins = (playerCount, { cpM, cpS, spM, spS, epM, epS, gpM, gpS, ppM, ppS }) => {
        const cp = cpM * chance().integer({ min: 1, max: 6 }) * cpS
        const sp = spM * chance().integer({ min: 1, max: 6 }) * spS
        const ep = epM * chance().integer({ min: 1, max: 6 }) * epS
        const gp = gpM * chance().integer({ min: 1, max: 6 }) * gpS
        const pp = ppM * chance().integer({ min: 1, max: 6 }) * ppS
        return {
            cp: Math.round(cp / playerCount),
            sp: Math.round(sp / playerCount),
            ep: Math.round(ep / playerCount),
            gp: Math.round(gp / playerCount),
            pp: Math.round(pp / playerCount)
        }
    }

    const loot = (count, max, loot) => {
        if (count === null || max === null) return []
        let length = Array.from({ length: count }).reduce((prev) => prev + chance().integer({ min: 1, max }), 0)
        return Array.from({ length }, () => chance().pickone(tables[loot]))
    }

    const [players, setPlayers] = useState(3)

    const side = chance().integer({ min: 1, max: 100 })
    const found = table.find(({ range }) => range[0] <= side && range[1] >= side)
    const [treasure, setTreasure] = useState({
        coins: coins(players, challenge.coins),
        items: items(found.iD || null, found.item),
        loot: loot(found.lM || null, found.iD || null, found.loot)
    })

    const generate = (players) => {
        const side = chance().integer({ min: 1, max: 100 })
        const found = table.find(({ range }) => range[0] <= side && range[1] >= side)
        setTreasure({
            coins: coins(players, challenge.coins),
            items: items(found.iD || null, found.item),
            loot: loot(found.lM || null, found.iD || null, found.loot)
        })
    }

    return (
        <div>
            <div className='field'>
                <label className='label'>Challenge</label>
                <div className='control'>
                    <div className='select'>
                        <select onChange={({ target: { value } }) => {
                            setChallenge(tables[value])
                            generate(players)
                        }}>
                            <option value='challenge04'>Challenge 0-4</option>
                            <option value='challenge04'>Challenge 5-10</option>
                            <option value='challenge04'>Challenge 11-16</option>
                            <option value='challenge04'>Challenge 17+</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='field'>
                <label className='label'>Number of Players</label>
                <div className='control' style={{ maxWidth: 171 }}>
                    <input
                        className='input'
                        type='number'
                        placeholder='Number of players'
                        value={players}
                        onChange={({ target: { value } }) => {
                            setPlayers(value)
                            generate(value)
                        }} />
                </div>
            </div>
            <div className='field'>

                <div className='control'>
                    <button className='button is-info' onClick={() => generate(players)}>Generate</button>
                </div>
            </div>

            <div className='content'>
                <h3>Coins Each</h3>
                <p>
                    <b>CP</b><span> {treasure.coins.cp}</span>
                    <br />
                    <b>SP</b><span> {treasure.coins.sp}</span>
                    <br />
                    <b>EP</b><span> {treasure.coins.ep}</span>
                    <br />
                    <b>GP</b><span> {treasure.coins.gp}</span>
                    <br />
                    <b>PP</b><span> {treasure.coins.pp}</span>
                </p>
                <h3>Gems or Art</h3>
                {treasure.loot.length === 0 && <div>There are no gems or art</div>}
                <ul>
                    {treasure.loot.map((value, index) => <li key={`loot-${index}`}>{value}</li>)}
                </ul>

                <h3>Magic Items</h3>
                {treasure.items.length === 0 && <div>There are no items</div>}
                <ul>
                    {treasure.items.map((value, index) => <li key={`item-${index}`}>{value}</li>)}
                </ul>
                <button className='button is-info' onClick={() => {
                    copy(`__Treasure__
**CP** ${treasure.coins.cp}, **SP** ${treasure.coins.sp}, **EP** ${treasure.coins.ep}, **GP** ${treasure.coins.gp}, **PP** ${treasure.coins.pp}
**Gems or Art**
${treasure.loot.length === 0 ? 'no art' : treasure.loot.join('\n')}
**Items**
${treasure.items.length === 0 ? 'no items' : treasure.items.join('\n')}`)

                }}>Copy to clipboard</button>
            </div>

        </div>
    )
}

const Tables = () => (
    <div>
        <RandomGenerator title='Trinkets' random={() => chance().pickone(tables.trinkets)} />
        <RandomGenerator title='Feywild Trinkets' random={() => chance().pickone(tables.feywildTrinkets)} />
        <RandomGenerator title='Horror Trinkets' random={() => chance().pickone(tables.horrorTrinkets)} />
        <RandomGenerator title='Soggy Court Honorifics' random={() => chance().pickone(tables.soggyCourtHonorifics)} />
        <RandomGenerator title='25gp Art Object' random={() => chance().pickone(tables['25Art'])} />
        <RandomGenerator title='250gp Art Object' random={() => chance().pickone(tables['250Art'])} />
        <RandomGenerator title='750gp Art Object' random={() => chance().pickone(tables['750Art'])} />
        <RandomGenerator title='2500gp Art Object' random={() => chance().pickone(tables['2500Art'])} />
        <RandomGenerator title='7500gp Art Object' random={() => chance().pickone(tables['7500Art'])} />
        <RandomGenerator title='Magic Item A' random={() => chance().pickone(tables.magicA.map(({ value }) => value))} />
        <RandomGenerator title='Magic Item B' random={() => chance().pickone(tables.magicB.map(({ value }) => value))} />
        <RandomGenerator title='Magic Item C' random={() => chance().pickone(tables.magicC.map(({ value }) => value))} />
        <RandomGenerator title='Magic Item D' random={() => chance().pickone(tables.magicD.map(({ value }) => value))} />
        <RandomGenerator title='Magic Item E' random={() => chance().pickone(tables.magicE.map(({ value }) => value))} />
        <RandomGenerator title='Magic Item F' random={() => chance().pickone(tables.magicF.map(({ value }) => value))} />
        <RandomGenerator title='Magic Item G' random={() => chance().pickone(tables.magicG.map(({ value }) => value))} />
        <RandomGenerator title='Magic Item H' random={() => chance().pickone(tables.magicH.map(({ value }) => value))} />
        <RandomGenerator title='Magic Item I' random={() => chance().pickone(tables.magicI.map(({ value }) => value))} />
    </div>
)

const ShopAndServicesPage = () => {
    const { section = 'none' } = useParams()
    const navigate = useNavigate()
    const routeTo = (section) => (open) => navigate(open ? `/shop/${section}` : '/shop')

    return (
        <div>
            <Card
                title='🫖 General'
                section='general'
                base='shop'
                isOpen={section === 'general'}
            >
                <Shop itemType='general' />
            </Card>
            <Card
                title='⚔️ Equipment'
                section='equipment'
                base='shop'
                isOpen={section === 'equipment'}
            >
                <Shop itemType='equipment' />
            </Card>
            <Card
                title='🪄 Magic Items'
                section='magicItems'
                base='shop'
                isOpen={section === 'magicItems'}
            >
                <Shop itemType='magicItem' />
            </Card>
            <Card
                title='📜 Scrolls'
                section='scrolls'
                base='shop'
                isOpen={section === 'scrolls'}
            >
                <Shop itemType='scrolls' />
            </Card>
            <Card
                title='🐐 Animals'
                section='animals'
                base='shop'
                isOpen={section === 'animals'}
            >
                <Shop itemType='animals' />
            </Card>
            <Card
                title='🎲 Random'
                section='random'
                base='shop'
                isOpen={section === 'random'}
            >
                <Random />
            </Card>
            <Card
                title='🧮 Tables'
                section='tables'
                base='shop'
                isOpen={section === 'tables'}
            >
                <Tables />
            </Card>
            <Card
                title='🪙 Treasure'
                section='treasure'
                base='shop'
                isOpen={section === 'treasure'}
            >
                <Treasure />
            </Card>
        </div>
    )
}

export default ShopAndServicesPage