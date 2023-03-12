import Cookies from 'js-cookie'
import qs from 'qs'
import React, { useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useLocation, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import appendix from './appendix.json'
import dmNotes from './dm-notes.json'
import Discord from './discord'
import Icon from './icon'
import maps from './maps.json'
import metadata from './metadata.json'
import notes from './notes.json'
import avatars from './avatars.json'
import { capitalCase } from 'change-case'

const HeroFootLink = ({ pathname, to, label }) => (
    <li className={(to === pathname || (to !== '/' && pathname.startsWith(to))) ? 'is-active' : 'is-inactive'}>
        <Link className='navbar-item' to={to}>{label}</Link>
    </li>
)

const HeroHead = ({ title, openSettings }) => (
    <div className='hero-head'>
        <nav className='navbar'>
            <div className='container'>
                <div className='navbar-brand'>
                    <Link className='navbar-item' to='/'>
                        <div className='image is-96x96 is-hidden-touch'>
                            <Icon />
                        </div>
                        <div className='image is-32x32 is-hidden-desktop'>
                            <Icon />
                        </div>
                    </Link>
                    <h1 className='navbar-item title is-size-1 is-hidden-touch'>{title}</h1>
                    <h1 className='navbar-item title is-size-6 is-hidden-desktop'>{title}</h1>
                    <div className='navbar-item external-links is-flex is-align-items-center'>
                        <button className='button is-ghost is-large p-0' onClick={openSettings}>⚙️</button>
                        <a href='https://discord.com/channels/819872538548371517/819872538548371519' target='_blank' rel='noreferrer'>
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

const Settings = ({
    closeSettings,
    changeSettings,
    accept,
    isGm,
    cos,
    cm,
    sj
}) => (
    <div className='modal is-active'>
        <div className='modal-background' onClick={closeSettings}></div>
        <div className='modal-content'>
            <nav className={`panel ${isGm ? 'is-primary' : ''} ${typeof accept === 'undefined' ? 'is-danger' : ''}`}>
                <p className="panel-heading">
                    {(typeof accept === 'undefined' && 'You need to accept cookies') || (isGm ? 'Settings - Master' : 'Settings')}
                </p>
                <label className="panel-block">
                    <input
                        onChange={() => {
                            changeSettings('everything')
                        }}
                        type="checkbox"
                        disabled={typeof accept === 'undefined'}
                        checked={cos && cm && sj}
                    />
                    Show everything
                </label>
                <label className="panel-block">
                    <input
                        onChange={() => changeSettings('cos')}
                        type="checkbox"
                        disabled={typeof accept === 'undefined'}
                        checked={cos}
                    />
                    Show Curse of Strahd campaign
                </label>
                <label className="panel-block">
                    <input
                        onChange={() => changeSettings('cm')}
                        type="checkbox"
                        disabled={typeof accept === 'undefined'}
                        checked={cm}
                    />
                    Show Candlekeep campaign
                </label>
                <label className="panel-block">
                    <input
                        onChange={() => changeSettings('sj')}
                        type="checkbox"
                        disabled={typeof accept === 'undefined'}
                        checked={sj}
                    />
                    Show Spelljammer campaign
                </label>
                <label className="panel-block">
                    <input
                        onChange={() => changeSettings('accept')}
                        type="checkbox"
                        disabled={typeof accept === 'undefined'}
                        checked={accept === 'true'}
                    />
                    Accept cookies
                </label>
            </nav>
        </div>
        <button className='modal-close is-large' aria-label='close' onClick={closeSettings}></button>
    </div>
)

const fetchChildren = async (path, setChildren) => {
    try {
        const res = await fetch(path, {
            headers: {
                accept: 'text/plain'
            }
        })
        const children = await res.text()
        if (children.includes('<!DOCTYPE html>')) setChildren('There was an issue getting this document')
        else setChildren(children)
    } catch (err) {
        setChildren('There was an issue getting this page')
    }
}

const Header = () => {
    let { pathname, search } = useLocation()
    pathname = pathname.replace(/\/$/g, '')
    if (pathname === '') pathname = '/'
    const { section = 'none', map = 'none' } = useParams()

    const [settingsVisisble, showSettings] = useState(false)

    const { accept, sj, cm, cos } = Cookies.get()
    const [settings, changeSettings] = useState({
        accept,
        sj: sj === 'true',
        cm: cm === 'true',
        cos: cos === 'true'
    })

    const [accepted, acceptChanged] = useState(accept === 'true')
    const queryString = qs.parse(search, { ignoreQueryPrefix: true })
    const containsDm = 'dm' in queryString
    const containsMaster = pathname.includes('master')
    const isGm = containsDm || containsMaster || Cookies.get('gm') === 'true'

    const [{ title, description, icon }, setMeta] = useState({
        ...metadata[pathname] || metadata.notFound,
        icon: 'http://intrepid-crusaders.blankstring.com/icon.png'
    })
    const contentPage = (contentData) => {
        const game = pathname.split('/')[1]
        const data = contentData[game].find(({ index }) => Number(index) === Number(section)) || null
        if (data !== null) {
            setMeta({
                title: data.title,
                description: `The notes for ${data.title}`,
                icon
            })

            fetchChildren(data.content, (description) => {
                setMeta({
                    title: data.title,
                    description,
                    icon
                })
            })
        }
    }
    const setMetaData = () => {
        setMeta({
            ...metadata[pathname] || metadata.notFound,
            icon: 'http://intrepid-crusaders.blankstring.com/icon.png'
        })
        if (pathname.includes('notes') && section !== 'none') {
            contentPage(notes)
        } else if (pathname.includes('appendix') && section !== 'none') {
            contentPage(appendix)
        } else if (pathname.includes('dmNotes') && section !== 'none') {
            contentPage(dmNotes)
        } else if (pathname.includes('maps') && map !== 'none') {
            const data = maps.find(({ name }) => name === map) || null
            if (data !== null) {
                setMeta({
                    title: data.title,
                    description: data.description,
                    icon: data.filename
                })
            }
        } else if (pathname.includes('avatars')) {
            if (section !== 'none' || 'term' in queryString) {
                const found = avatars.find(({ filename, n, m, p }) => filename.startsWith(section) || (p || n || m) === queryString.term)
                if (found) {
                    const { n, m, p, index, filename } = found
                    setMeta({
                        title: capitalCase(p || n || m) + (index > 0 ? ` (${index})` : ''),
                        description: `The avatar for ${title}`,
                        icon: `https://intrepid-crusaders.blankstring.com/hotlink-ok/avatars/${filename}`
                    })
                }
            }
        }
    }

    useEffect(() => {
        if (containsDm) {
            Cookies.set('dm', true)
            Cookies.set('gm', true)
        } else if (containsMaster) {
            Cookies.set('gm', true)
        }
    }, [containsDm, containsMaster])

    useEffect(() => {
        setMetaData()
    }, [pathname, section])

    const showDefaultTab = (tab) => {
        if (!accepted) return true
        return tab === 'true'
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{title}</title>
                    <meta name='description' content={description} />
                    <meta property='og:title' content={title} />
                    <meta property='og:description' content={description} />
                    <meta property='og:image' content={icon} />
                    <meta property='og:url' content={`http://intrepid-crusaders.blankstring.com${pathname}`} />
                </Helmet>
            </HelmetProvider>
            {settingsVisisble && (
                <Settings
                    closeSettings={() => showSettings(false)}
                    {...settings}
                    isGm={isGm}
                    changeSettings={(setting) => {
                        if (setting === 'everything') {
                            if (accepted) {
                                Cookies.set('cos', true)
                                Cookies.set('sj', true)
                                Cookies.set('cm', true)
                            }
                            changeSettings({
                                accept: true,
                                cos: true,
                                sj: true,
                                cm: true
                            })
                        } else if (setting === 'accept' && accepted) {
                            Cookies.remove('accept')
                            Cookies.remove('sj')
                            Cookies.remove('cos')
                            Cookies.remove('cm')
                            Cookies.remove('gm')
                            Cookies.remove('dm')
                            changeSettings({
                                accept: false,
                                cos: false,
                                sj: false,
                                cm: false
                            })
                        } else {
                            if (accepted) Cookies.set(setting, !settings[setting])
                            changeSettings({
                                ...settings,
                                [setting]: !settings[setting]
                            })
                        }
                    }}
                />
            )}
            <section className='hero is-small' scrape={window.location.href}>
                <HeroHead title={title} openSettings={() => showSettings(true)} />
                <div className='hero-foot'>
                    <nav className='tabs'>
                        <div className='container'>
                            <ul>
                                <HeroFootLink pathname={pathname} to='/' label='🏠 Home' />
                                {showDefaultTab(cm) && <HeroFootLink pathname={pathname} to={'/cm'} label='🕯️ Candlekeep Mysteries' />}
                                {showDefaultTab(sj) && <HeroFootLink pathname={pathname} to={'/sj'} label='👾 Spelljammer' />}
                                {cos === 'true' && <HeroFootLink pathname={pathname} to={'/cos'} label='🧛 Curse of Strahd' />}
                                <HeroFootLink pathname={pathname} to={'/shop'} label='🛍️ Shops & Services' />
                                <HeroFootLink pathname={pathname} to={'/maps'} label='📍 Maps' />
                                {isGm && <HeroFootLink pathname={pathname} to={'/avatars'} label='🧑 Avatars' />}
                            </ul>
                        </div>
                    </nav>
                </div>
            </section>
            {typeof accept === 'undefined' && (
                <div className='cookie-banner'>
                    <section className='p-3'>
                        <nav className='level'>
                            <div className='level-item has-text-centered'>
                                <div className='content'>
                                    <p>This website contains cookies to remember query terms, and if you wanted to adhear to cookies.</p>
                                </div>
                            </div>
                            <div className='level-item has-text-centered'>
                                <div className='buttons'>
                                    <button
                                        onClick={() => {
                                            acceptChanged(true)
                                            Cookies.set('accept', true)
                                            Cookies.set('sj', true)
                                            Cookies.set('cm', true)
                                            changeSettings({
                                                accept: true,
                                                cos: false,
                                                sj: true,
                                                cm: true
                                            })
                                        }}
                                        className='button is-info'>
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => {
                                            acceptChanged(false)
                                            Cookies.set('accept', false)
                                            Cookies.remove('sj')
                                            Cookies.remove('cos')
                                            Cookies.remove('cm')
                                            Cookies.remove('gm')
                                            Cookies.remove('dm')
                                            changeSettings({
                                                accept: false,
                                                cos: false,
                                                sj: true,
                                                cm: true
                                            })
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