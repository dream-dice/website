import { useEffect } from 'react'
import { useRouteMatch } from 'react-router'
import factions from './factions.json'

const Faction = ({children}) => {
    const { params: { name } } = useRouteMatch()
    useEffect(() => {
        if (name in factions) document.body.className = `is-${name}`
        return () => {
            document.body.className = `is-home`
        }
    })
    if (!(name in factions)) return <div className='p-5 is-size-4 has-text-danger'>This faction does not exist!</div>
    const { title } = factions[name]
    return (
        <div>
            <div className='is-flex'>
                    <div className='mr-3 is-hidden-mobile' style={{minWidth: 100}}>
                        <img src={`/flags/${name}-flag.png`} alt={`${title} Flag`} />
                    </div>
                    <div>{children}</div>
            </div>
        </div>
    )
}

export default Faction