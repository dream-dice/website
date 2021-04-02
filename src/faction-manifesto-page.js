import { useRouteMatch } from 'react-router'
import factions from './factions.json'
import Faction from './faction'

const FactionJobs = () => {
    const { params: { name } } = useRouteMatch()
    const { title, intro, leader, beliefs = [], offences = [], skill = {} } = factions[name] || {}

    return (
        <Faction>
            <div className='content mt-3'>
                <h1 className='title'>{title} Manifesto</h1>
                <div className='card'>
                    <div className='card-content'>
                        <p>
                            {intro}
                        </p>
                        <p className='has-text-right'>
                            <b>{leader}</b>
                        </p>
                    </div>
                </div>
                <h2 className='subtitle'>Beliefs</h2>
                <ul>
                    {beliefs.map(belief => <li key={belief}>{belief}</li>)}
                </ul>
                <h2 className='subtitle'>Offences</h2>
                <ul>
                    {offences.map(offense => <li key={offense}>{offense}</li>)}
                </ul>
                <h2 className='subtitle'>Skill</h2>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
            </div>
        </Faction>

    )
}

export default FactionJobs