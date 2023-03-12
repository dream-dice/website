import { capitalCase } from 'change-case'
import copy from 'copy-to-clipboard'
import Cookies from 'js-cookie'
import qs from 'qs'
import React, { useEffect, useState } from 'react'
import RenderIfVisible from 'react-render-if-visible'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import avatars from './avatars.json'
import NotFound from './not-found-page'
import Search from './search'

const NoAvatar = () => <div className='tile is-child pl-2 pr-2 is-invisible' />

const Avatar = ({ m, n, p, d, index, filename, tags }) => (
    <article className="tile is-child pl-2 pr-2">
        <div className='box'>
            <p className="title has-text-centered">{capitalCase(p || n || m)} {index > 0 ? `(${index})` : null}</p>
            <div className='is-flex is-justify-content-center mb-3 mt-1'>
                <figure className="image is-128x128">
                    <img alt={capitalCase(p || n || m)} src={`${window.location.origin}/hotlink-ok/avatars/${filename}`} />
                </figure>
            </div>
            <div className='buttons'>
                {d && <a className="button is-link is-fullwidth" href={`https://www.dndbeyond.com/monsters/${d}`} target="_blank" rel="noreferrer noopener">🔗 DDB</a>}
                <a href={`${window.location.origin}/hotlink-ok/avatars/${filename}`} download className='button is-fullwidth is-link'>📁 Download</a>
                <button className='button is-fullwidth is-link' onClick={() => { copy(`${window.location.origin}/hotlink-ok/avatars/${filename}`) }}>📋 Copy file URL</button>
                <button className='button is-fullwidth is-link' onClick={() => { copy(`https://raw.githubusercontent.com/dream-dice/website/master/public/hotlink-ok/avatars/${filename}`) }}>📋 Copy file GH URL</button>
                <button className='button is-fullwidth is-link' onClick={() => { copy(`${window.location.origin}/avatars/${filename.replace('.png', '')}`) }}>📋 Share URL</button>
            </div>
            {tags.length > 0 && (
                <div className='tags'>
                    {tags.map((tag) => <span key={tag} className='tag is-rounded'>{tag}</span>)}
                </div>
            )}
            <p className='content'>{filename}</p>
        </div>
    </article>
)

const Row = ({ avatars }) => <RenderIfVisible defaultHeight={450}>
    <div className="tile is-parent">
        <Avatar {...avatars[0]} />
        {(avatars[1] && <Avatar {...avatars[1]} />) || <NoAvatar />}
        {(avatars[2] && <Avatar {...avatars[2]} />) || <NoAvatar />}
        {(avatars[3] && <Avatar {...avatars[3]} />) || <NoAvatar />}
    </div>
</RenderIfVisible>

const filterAvatars = (searchTerms) => (props) =>
    searchTerms
        .filter(
            searchTerm => {
                if (searchTerm === '') return true
                return Object.values(props).some(value => {
                    return String(value).toLowerCase().includes(searchTerm)
                })
            }
        ).length > 0

const AvatarsPage = () => {
    const [data, setData] = useState([])
    const { section = 'none' } = useParams()
    const navigate = useNavigate()
    const { search } = useLocation()
    const { term = '', player = false, named = false } = qs.parse(search, { ignoreQueryPrefix: true })

    const isGm = Cookies.get('gm')

    useEffect(() => {
        if (section !== 'none') {
            const found = avatars.find(({ filename }) => filename.includes(section))
            setData([found])
            if (found) navigate(`/avatars?term=${found.m || found.n || found.p}&named=${'n' in found}&player=${'p' in found}`)
            else navigate(`/avatars?term=${section}`)
        }
    }, [])

    if (!isGm) return <NotFound />

    const filtered = data
        .filter(({ n, p }) => {
            if (typeof p !== 'undefined') return player === 'true'
            if (typeof n !== 'undefined') return named === 'true'
            return true
        })

    const rows = []
    const chunkSize = 4
    for (let i = 0; i < filtered.length; i += chunkSize) {
        rows.push(
            filtered
                .sort(({ filename: left }, { filename: right }) => {
                    if (left > right) return -1
                    if (left < right) return 1
                    return 0
                })
                .slice(i, i + chunkSize)
        )
    }

    return (
        <>
            <div className='content mt-5 mb-5 is-size-5'>
                <p className='mb-1'>
                    This page contains all the Avatars hosted for my campaigns. I don't own the images from these and are used for personal use in hobby games and not for profit.
                </p>
                <p className='mb-1'>
                    Each file has a name to help find and filter an avatar. This table describe the file names. The files follow the pattern "key1=value_key2=value-with-spaces"
                </p>
                <div clasName="table-container">
                    <table className='table is-striped is-narrow'>
                        <thead>
                            <tr>
                                <td>Key</td>
                                <td>Name</td>
                                <td>Comment</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>m</td>
                                <td>Monster</td>
                                <td>The monster name or race</td>
                            </tr>
                            <tr>
                                <td>p</td>
                                <td>Player</td>
                                <td>A player token</td>
                            </tr>
                            <tr>
                                <td>n</td>
                                <td>Named</td>
                                <td>A named token</td>
                            </tr>
                            <tr>
                                <td>d</td>
                                <td>DND Beyond</td>
                                <td>The token has a link in DDB with this name</td>
                            </tr>
                            <tr>
                                <td>tX</td>
                                <td>Tag</td>
                                <td>A tag to describe tokens</td>
                            </tr>
                            <tr>
                                <td>+I</td>
                                <td>Index</td>
                                <td>Increment for same token</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <Search
                filter={filterAvatars}
                data={avatars}
                onChange={(data) => {
                    setData(data)
                }}
            />


            <div className='mb-2'>
                <label className='checkbox mr-2'>
                    <input
                        type='checkbox'
                        checked={player === 'true'}
                        onChange={(evt) => { navigate(`/avatars?term=${term}&player=${evt.target.checked}&named=${named}`) }}
                    />
                    <span className='pl-1'>Show player tokens</span>
                </label>
                <label className='checkbox'>
                    <input
                        type='checkbox'
                        checked={named === 'true'}
                        onChange={(evt) => { navigate(`/avatars?term=${term}&player=${player}&named=${evt.target.checked}`) }}
                    />
                    <span className='pl-1'>Show named tokens</span>
                </label>
            </div>

            <div className="tile is-ancestor">
                <div className="tile is-vertical is-12">
                    {rows.map((row) => <Row key={row.map(({ filename }) => filename).join('_')} avatars={row} />)}
                </div>
            </div>
        </>
    )
}

export default AvatarsPage