import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import factions from './factions.json'
import story from './story.json'
import players from './players.json'
import services from './services.json'

const titleCase = (name) => `${name[0].toUpperCase()}${name.slice(1, name.length)}`

const MenuLink = ({ to, children }) => {
    const { pathname } = useLocation()
    const isActive = `is-${pathname === to ? 'active' : 'inactive'}`
    return <Link to={to} className={isActive}>{children}</Link>
}

const StoryLinks = () => {
    const { pathname } = useLocation()
    const [open, setOpen] = useState({
        vampires: navigator.userAgent === "ReactSnap" || pathname.includes('story/vampire-hunters'),
        seekers: navigator.userAgent === "ReactSnap" || pathname.includes('story/seekers')
    })
    return (
        <div>
            <li>
                <button className='button is-ghost' onClick={() => setOpen({ vampires: !open.vampires })}>The Vampire Hunters</button>
                {open.vampires && <ul>
                    {story.vampireHunters.map(({ to, title }) => <li key={to}><MenuLink to={`/story/${to}`}>{title}</MenuLink></li>)}
                </ul>}
            </li>
            <li>
                <button className='button is-ghost' onClick={() => setOpen({ seekers: !open.seekers })}>The Seekers</button>
                {open.seekers && <ul>
                    {story.seekers.map(({ to, title }) => <li key={to}><MenuLink to={`/story/${to}`}>{title}</MenuLink></li>)}
                </ul>}
            </li>
        </div>
    )
}

const FactionLinks = ({ name, title }) => {
    return (
        <li>
            <MenuLink to={`/faction/${name}/manifesto`}>{title}</MenuLink>
        </li>
    )
}

const calculateMenuHeight = () => window.innerHeight - document.getElementsByClassName('hero')[0].getBoundingClientRect().height - 30

const Menu = () => {
    const [menuHeight, setMenuHeight] = useState(window.innerHeight)
    let currentFaction = null
    useEffect(() => {
        setMenuHeight(calculateMenuHeight())
        window.onresize = () => { setMenuHeight(calculateMenuHeight()) }
        return () => { window.onresize = null }
    }, [])

    return (
        <aside className="menu mt-3" style={{ height: menuHeight }}>
            <ul className="menu-list">
                <li>
                    <MenuLink to='/'>Home</MenuLink>
                </li>
            </ul>
            <p className="menu-label">
                Library
            </p>
            <ul className="menu-list">
                <StoryLinks />
                <li><MenuLink to='/saucey'>The Wizard's Staff</MenuLink></li>
            </ul>
            <p className="menu-label">
                Factions
            </p>
            <ul className="menu-list">
                <li><MenuLink to='/faction/overview'>Overview</MenuLink></li>
                {Object
                    .entries(factions)
                    .sort((left, right) => {
                        if (left[0] < right[0]) return -2
                        if (left[0] > right[0]) return 2
                        return 0
                    })
                    .map(([name, { title, jobs }]) => <FactionLinks key={name} name={name} title={title} />)}
            </ul>
            <p className="menu-label">
                Barovia Services
            </p>
            <ul className="menu-list">
                {Object.entries(services).map(([name, { title }]) => (
                    <li key={name}><MenuLink to={`/service/${name}`}>{title}</MenuLink></li>
                ))}
            </ul>
            <p className="menu-label">
                Players
            </p>
            <ul className="menu-list">
                {Object.entries(players)
                    .sort((left, right) => {
                        if (left[1].faction < right[1].faction) return -2
                        if (left[1].faction > right[1].faction) return 2
                        if (left[1].title < right[1].title) return -1
                        if (left[1].title > right[1].title) return 1
                        return 0
                    })
                    .map(([name, { status, faction }]) => {
                        const newFaction = currentFaction !== faction
                        if (currentFaction !== faction) currentFaction = faction
                        return <div key={name}>
                            {newFaction && <li style={{marginTop: 15, marginBottom: 5, fontSize: '1.1em'}}><i>{titleCase(faction)}</i></li>}
                            <li><MenuLink to={`/player/${name}`}><span>{titleCase(name)}</span>{status && <b> - {status}</b>}</MenuLink></li>
                        </div>
                    }
                    )}
            </ul>
            <p className="menu-label">
                Game Master
            </p>
            <ul className="menu-list">
                <li><MenuLink to='/rules'>My Rules</MenuLink></li>
                <li><MenuLink to='/random'>Random</MenuLink></li>
                <li><MenuLink to='/credits'>Credits</MenuLink></li>
            </ul>
        </aside>
    )
}

export default Menu