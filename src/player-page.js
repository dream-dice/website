import { useRouteMatch } from "react-router"
import players from './players.json'

const Player = () => {
    const {params: {name}} = useRouteMatch()
    if (!(name in players)) return <div>This player does not exist</div>

    const {title} = players[name]

    return (
        <div>{title}</div>
    )
}

export default Player