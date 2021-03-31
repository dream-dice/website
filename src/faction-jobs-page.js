import { useRouteMatch } from 'react-router'
import factions from './factions.json'

const FactionJobs = () => {

    const {params: {name}} = useRouteMatch()
    if (!(name in factions)) return <div>This faction does not exist</div>

    const {title} = factions[name]

    return (
        <div>{title} Jobs</div>
    )
}

export default FactionJobs