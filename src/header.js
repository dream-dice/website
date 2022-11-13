import React from 'react'
import { useEffect } from "react"
import { useLocation } from "react-router"
import { Link } from 'react-router-dom'
import Icon from './icon'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import metadata from './metadata.json'
import Discord from './discord'

const HeroFootLink = ({ pathname, to, label }) => (
    <li className={(to === pathname || (to !== '/' && pathname.includes(to))) ? 'is-active' : 'is-inactive'}>
        <Link className="navbar-item" to={to}>{label}</Link>
    </li>
)

const HeroHead = ({ title }) => (
    <div className="hero-head">
        <nav className="navbar">
            <div className="container">
                <div className="navbar-brand">
                    <Link className="navbar-item" to='/'>
                        <div className='image is-96x96 is-hidden-touch'>
                            <Icon />
                        </div>
                        <div className='image is-32x32 is-hidden-desktop'>
                            <Icon />
                        </div>
                    </Link>
                    <h1 className="navbar-item title is-size-1 is-hidden-touch">{title}</h1>
                    <h1 className="navbar-item title is-size-6 is-hidden-desktop">{title}</h1>
                    <div className='navbar-item external-links is-flex is-align-items-center'>
                        <a href='https://discord.com/channels/819872538548371517/819872538548371519' target='_blank' rel="noreferrer">
                            <div className='image is-24x24 is-hidden-touch'>
                                <Discord />
                            </div>
                            <div className='image is-16x16 is-hidden-desktop'>
                                <Discord />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
)

const Header = () => {
    let { pathname } = useLocation()
    pathname = pathname.replace(/\/$/g, '')
    if (pathname === '') pathname = '/'

    const { title, className, description, image } = metadata[pathname] || metadata.notFound

    useEffect(() => {
        document.documentElement.className = `is-${className}`
        return () => {
            document.documentElement.className = `is-home`
        }
    })

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="og:image" content={`http://intrepid-crusaders.blankstring.com${image}`} />
                    <meta property="og:url" content={`http://intrepid-crusaders.blankstring.com${pathname}`} />
                </Helmet>
            </HelmetProvider>
            <section className="hero is-small" scrape={window.location.href}>
                <HeroHead title={title} />
                <div className="hero-foot">
                    <nav className="tabs">
                        <div className="container">
                            <ul>
                                <HeroFootLink pathname={pathname} to='/' label='🏠 Home' />
                                <HeroFootLink pathname={pathname} to={`/cm`} label='🕯️ Candlekeep Mysteries' />
                                <HeroFootLink pathname={pathname} to={`/cos`} label='🧛 Curse of Strahd' />
                                <HeroFootLink pathname={pathname} to={'/shop'} label='🛍️ Shops & Services' />
                            </ul>
                        </div>
                    </nav>
                </div>
            </section>
        </>
    )
}

export default Header