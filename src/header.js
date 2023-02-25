import Cookies from 'js-cookie';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLocation, useParams } from "react-router";
import { Link } from 'react-router-dom';
import appendix from './appendix.json';
import Discord from './discord';
import Icon from './icon';
import maps from './maps.json';
import metadata from './metadata.json';
import notes from './notes.json';

const HeroFootLink = ({ pathname, to, label }) => (
    <li className={(to === pathname || (to !== '/' && pathname.startsWith(to))) ? 'is-active' : 'is-inactive'}>
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
    let { pathname, search } = useLocation()
    pathname = pathname.replace(/\/$/g, '')
    if (pathname === '') pathname = '/'

    const { section = 'none' } = useParams()

    let { title, description } = metadata[pathname] || metadata.notFound
    if (pathname.includes('notes') && section !== 'none') {
        const game = pathname.split('/')[1]
        const data = notes[game].find(({ index }) => index === section) || null
        if (data !== null) {
            title = data.title
            description = data.description
        }
    } else if (pathname.includes('appendix') && section !== 'none') {
        const game = pathname.split('/')[1]
        const data = appendix[game].find(({ name }) => name === section) || null
        if (data !== null) {
            title = data.title
            description = data.description
        }
    } else if (pathname.includes('maps') && section !== 'none') {
        const data = maps.find(({ name }) => name === section) || null
        if (data !== null) {
            title = data.title
            description = data.description
        }
    }

    const { accept } = Cookies.get()
    const [_, acceptChanged] = useState(accept)

    useEffect(() => {
        const queryString = qs.parse(search, { ignoreQueryPrefix: true })
        const isDm = 'dm' in queryString
        const isGm = 'gm' in queryString
        const accepted = accept === 'true'
        if (isDm && accepted) {
            Cookies.set('dm', true)
            Cookies.set('gm', true)
        } else if (isGm && accepted) {
            Cookies.set('gm', true)
        }
    }, [])

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="og:image" content={`http://intrepid-crusaders.blankstring.com/icon.png`} />
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
                                <HeroFootLink pathname={pathname} to={'/cm'} label='🕯️ Candlekeep Mysteries' />
                                <HeroFootLink pathname={pathname} to={'/sj'} label='👾 Spelljammer' />
                                <HeroFootLink pathname={pathname} to={'/cos'} label='🧛 Curse of Strahd' />
                                <HeroFootLink pathname={pathname} to={'/shop'} label='🛍️ Shops & Services' />
                                <HeroFootLink pathname={pathname} to={'/maps'} label='📍 Maps' />
                            </ul>
                        </div>
                    </nav>
                </div>
            </section>
            {typeof accept === 'undefined' && (
                <div className='cookie-banner'>
                    <section className='p-3'>
                        <nav className="level is-mobile">
                            <div className="level-item has-text-centered">
                                <div className='content'>
                                    <p>This website contains cookies to remember query terms, and if you wanted to adhear to cookies.</p>
                                </div>
                            </div>
                            <div className="level-item has-text-centered">
                                <div className='buttons'>
                                    <button
                                        onClick={() => {
                                            acceptChanged(true)
                                            Cookies.set('accept', true)
                                        }}
                                        className='button is-info'>
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => {
                                            acceptChanged(false)
                                            Cookies.set('accept', false)
                                        }}
                                        className='button is-danger'>
                                        Decline
                                    </button>
                                </div>
                            </div>
                        </nav>
                    </section>
                </div>
            )}
        </>
    )
}

export default Header