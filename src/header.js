import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import Icon from './icon'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import metadata from './metadata.json'

const Header = () => {
    const { pathname } = useLocation()
    const [scrollTo, setScrollTo] = useState(window.innerWidth <= 768 ? '.scroll-to' : '.hero')

    const {title, className, description, image} = metadata[pathname] || metadata.notFound

    useEffect(() => {
        document.body.className = `is-${className}`

        const element = document.querySelector(scrollTo)
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.onresize = () => {
            setScrollTo(window.innerWidth <= 768 ? '.scroll-to' : '.hero')
        }

        return () => {
            window.onresize = null
            document.body.className = `is-home`
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
            <meta property="og:image" content={`http://dream-dice.blankstring.com${image}`} />
            <meta property="og:url" content={`http://dream-dice.blankstring.com${pathname}`} />
        </Helmet>
        </HelmetProvider>
        <section className="hero">
            <div className="hero-body">
                <div className='level'>
                    <div className='level-left'>
                        <div className='level-item'>
                            <div className='image is-128x128'>
                                <Icon />
                            </div>
                        </div>
                        <div className='level-item'>
                            <h1 className="title is-size-1">{title}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Header