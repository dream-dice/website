import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const MenuLink = ({ to, children }) => {
    const { pathname } = useLocation()
    const isActive = `is-${pathname === to ? 'active' : 'inactive'}`
    return <Link to={to} className={isActive}>{children}</Link>
}

const calculateMenuHeight = () => window.innerHeight - document.getElementsByClassName('hero')[0].getBoundingClientRect().height - 100

const Menu = () => {
    const [menuHeight, setMenuHeight] = useState(window.innerHeight)
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
        </aside>
    )
}

export default Menu
