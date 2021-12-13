import { useParams } from 'react-router-dom'
import factions from './factions.json'
import Faction from './faction'

const Job = ({ description, status, rewards, title }) => (
    <div className="card mt-5">
        <div className="card-content">
            <div className="content">
                <h3>{title}</h3>
                <p>{description}</p>
                <h2 className='subtitle is-size-5'>Rewards</h2>
                <ul>
                    {rewards.map(reward => <li key={reward}>{reward}</li>)}
                </ul>
                <p className='has-text-right'>
                    <b>{status}</b>
                </p>
            </div>
        </div>
    </div>
)

const FactionJobs = () => {
    const { name } = useParams()
    const { title, jobs, contact = {} } = factions[name] || {}

    return (
        <Faction>
            <div className='mt-3'>
                <h1 className='title'>{title} Jobs</h1>
                <div className='card'>
                    <div className='card-content'>
                        <div className='level'>
                            <div className='level-left'>
                                <div className='level-item'>
                                    <div className="image is-128x128">
                                        <img src={`/players/${contact.name}.png`} alt={`${contact.title} Avatar`} />
                                    </div>
                                </div>
                                <div className='level-item'>
                                    <div className='content'>
                                        <p className='is-size-6 mb-0'>
                                            <i>{title} Contact</i>
                                        </p>
                                        <h2 className='subtitle is-size-3 mt-0'>{contact.title}</h2>
                                        <p className='is-size-4'>
                                            {contact.location}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='content'>
                            <p>
                                {contact.description}
                            </p>
                        </div>
                    </div>
                </div>
                {
                    jobs.length > 0 && <ul style={{ listStyleType: 'none' }}>
                        {jobs.map(({ description, status, rewards, title }) => (
                            <li key={description}>
                                <Job description={description} status={status} rewards={rewards} title={title} />
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </Faction>
    )
}

export default FactionJobs