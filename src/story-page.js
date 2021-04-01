import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from "react-router-dom";
import gfm from 'remark-gfm';

const LinkMarkdown = ({ href, children }) => {
    return <Link to={href}>{children}</Link>
}

const fetchChildren = async (path, setChildren) => {
    try {
        const res = await fetch(path, {
            headers: {
                accept: 'text/plain'
            }
        })
        const children = await res.text()
        if (children.includes('<!DOCTYPE html>')) setChildren('There was an issue getting this page, [Forward](forward)')
        else setChildren(children)
    } catch (err) {
        setChildren('There was an issue getting this page')
    }
}

const Story = () => {
    const {page} = useParams()
    const path = `/pages/${page}.md`
    const [children, setChildren] = useState('Loading')

    useEffect(() => {
        document.body.className = `is-story`
        fetchChildren(path, setChildren)
        return () => {
            document.body.className = `is-home`
        }
    }, [path])

    return (
        <div className='content'>
            <ReactMarkdown
                plugins={[gfm]}
                renderers={{
                    link: LinkMarkdown
                }}
                children={children}
            />
        </div>
    )
}

export default Story