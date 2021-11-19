import { useParams } from "react-router"
import players from './players.json'
import factions from './factions.json'

const Player = () => {
    const { name } = useParams()
    const {
        title,
        faction,
        rank,
        renown,
        race,
        class: playerClass = [],
        description,
        famous = []
    } = players[name] || {}

    const { title: factionTitle } = factions[faction]
    if (!(name in players)) return <div>This player does not exist</div>

    return (
        <div className='card p-5 mt-3'>
            <div className='level'>
                <div className='level-left'>
                    <div className='level-item'>
                        <div className="image is-128x128">
                            <img src={`/players/${name}.png`} alt={`${title} Avatar`} />
                        </div>
                    </div>
                    <div className='level-item'>
                        <div className="content">
                            <h1 className='title is-size-2 mb-5'>{title}</h1>
                            <h2 className='subtitle'>
                                <div className='is-size-4 mb-2'>
                                    <span className='pr-2'>{race}</span>
                                    {playerClass.map(({title, level}) => (<span key={title} className='has-text-weight-light mr-1'>{title} ({level})</span>))}
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
                    {famous.map(item => <li key={item}>{item}</li>)}
                </ul>
            </div>
        </div>
    )
}

export default Player
