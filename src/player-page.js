import { useRouteMatch } from "react-router"
import players from './players.json'
import factions from './factions.json'
import { useEffect } from "react"

const Player = () => {
    const { params: { name } } = useRouteMatch()
    const {
        title,
        faction,
        rank,
        renown,
        race,
        class: playerClass,
        level,
        description
    } = players[name] || {}

    useEffect(() => {
        if (faction in factions) document.body.className = `is-${faction}`
        return () => {
            document.body.className = `is-home`
        }
    })

    const { title: factionTitle } = factions[faction]
    if (!(name in players)) return <div>This player does not exist</div>

    return (
        <div className='card p-5'>
            <div className='level'>
                <div className='level-left'>
                    <div className='level-item'>
                        <div className="image is-128x128">
                            <img src={`/players/${name}.png`} alt={`${title} Avatar`} />
                        </div>
                    </div>
                    <div className='level-item'>
                        <div className="content">
                            <h1 className='title is-size-2 mb-4'>{title}</h1>
                            <h2 className='subtitle'>
                                <div className='is-size-4 mb-1'>
                                    <span className='pr-2'>{race}</span>
                                    <span className='has-text-weight-light'>{playerClass}({level})</span>
                                </div>
                                <div className='is-size-6'>
                                    <span className='pr-2'>{factionTitle}</span>
                                    <span className='has-text-weight-light'>{rank} ({renown})</span>
                                </div>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className='content'>
                <p>{description}</p>
                <h2 className='subtitle'>
                    Famously
                </h2>
                <ul>
                    <li>Doing a thing</li>
                    <li>Doing another thing</li>
                </ul>
            </div>
        </div>
    )
}

export default Player


// Name
// Faction, rank
// Race/Class(es) <- if there are icons for these that would be cool, if not then I don't care
// Level

// Description

// Things of Note

// * blah
// * blah
// * blah

// Favoured Actions

// * blah
// * blah
// * blah
