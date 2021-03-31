import { useState } from 'react'
import { Link } from 'react-router-dom'
import {useLocation} from 'react-router-dom'

import factions from './factions.json'
import story from './story.json'
import players from './players.json'

const MenuLink = ({to, children}) => {
    const {pathname} = useLocation()
    const isActive = `is-${pathname === to ? 'active' : 'inactive'}`
    return <Link to={to} className={isActive}>{children}</Link>
}

const StoryLinks = () => {
    const [open, setOpen] = useState(true)
    return (
        <li>
            <button className='button is-ghost' onClick={() => setOpen(!open)}>As the Sotry Unfolds, in Barovia</button>
            {!open && <ul>
                {story.map(({to, title}) => <li key={to}><MenuLink to={`/sotry/${to}`}>{title}</MenuLink></li>)}
            </ul> }
        </li>
    )
}

const FactionLinks = ({name, title}) => {
    const [open, setOpen] = useState(true)
    return (
        <li>
            <button className='button is-ghost' onClick={() => setOpen(!open)}>{title}</button>
            {!open && <ul>
                <li>
                    <MenuLink to={`/faction/${name}/manifesto`}>Manifesto</MenuLink>
                </li>
                <li>
                    <MenuLink to={`/faction/${name}/jobs`}>Jobs</MenuLink>
                </li>
            </ul> }
        </li>
    )
}

const Menu = () => {
    return (
        <aside className="menu">
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
                <li><MenuLink to='/saucey'>A Saucey Tale</MenuLink></li>
            </ul>
            <p className="menu-label">
                Factions
            </p>
            <ul className="menu-list">
                { Object.entries(factions).map(([name, {title}]) => <FactionLinks key={name} name={name} title={title} />) }
            </ul>
            <p className="menu-label">
                Players
            </p>
            <ul className="menu-list">
            { Object.entries(players).map(([name, {title, status}]) => <li key={name}><MenuLink to={`/player/${name}`}>{title}{status && ` (${status})`}</MenuLink></li>) }
            </ul>
            <p className="menu-label">
                Game Master
            </p>
            <ul className="menu-list">
                <li><MenuLink to='/about'>About</MenuLink></li>
                <li><MenuLink to='/random'>Random</MenuLink></li>
                <li><MenuLink to='/credits'>Credits</MenuLink></li>
            </ul>
        </aside>
    )
}

export default Menu