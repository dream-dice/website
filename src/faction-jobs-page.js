import { useEffect } from 'react'
import { useRouteMatch } from 'react-router'
import factions from './factions.json'

const Job = ({ description, status }) => (
    <div className="card mt-5">
        <div className="card-content">
            <div className="content">
                {description}
            </div>
        </div>
    </div>
)

const FactionJobs = () => {
    const { params: { name } } = useRouteMatch()
    

    useEffect(() => {
        if (name in factions) document.body.className = `is-${name}`
        return () => {
            document.body.className = `is-home`
        }
    })

    if (!(name in factions)) return <div>This faction does not exist</div>

    

    const { title, jobs } = factions[name]

    return (
        <div className='faction-jobs'>
            <h1 className='title lobster'>{title} Jobs</h1>
            <ul>
                {jobs.map(({ description, status }) => <li key={description}><Job description={description} /></li>)}
            </ul>
        </div>
    )
}

export default FactionJobs