import { useEffect } from "react"
import { useLocation } from "react-router"


const Header = () => {
    const {pathname} = useLocation()
    useEffect(() => {
        const element = document.querySelector('.hero')
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })

    let title = "Luke's Campaign"
    if (pathname.includes('player')) title = 'Player Details'
    if (pathname.includes('story')) title = 'As the Story Unfolds'
    if (pathname.includes('saucey')) title = "The Wizard's Staff"
    if (pathname.includes('faction') && pathname.includes('manifesto')) title = 'Faction Manifesto'
    if (pathname.includes('faction') && pathname.includes('jobs')) title = 'Faction Jobs'
    if (pathname.includes('random')) title = "Random Generator's"
    if (pathname.includes('credits')) title = "Credits & Attributes"

    return (
        <section className="hero">
            <div className="hero-body">
                <p className="title">{title}</p>
            </div>
        </section>
    )
}

export default Header