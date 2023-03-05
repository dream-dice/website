import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const LinkMarkdown = ({ href, children }) => {
    return <Link to={href}>{children}</Link>
}

const CheckbxMardown = ({checked}) => <label className='checkbox pr-1'>
<input type='checkbox' defaultChecked={checked} />
</label>

const fetchChildren = async (path, setChildren) => {
    try {
        const res = await fetch(path, {
            headers: {
                accept: 'text/plain'
            }
        })
        const children = await res.text()
        if (children.includes('<!DOCTYPE html>')) setChildren('There was an issue getting this document')
        else setChildren(children)
    } catch (err) {
        setChildren('There was an issue getting this page')
    }
}

const Markdown = ({ path }) => {
    const [children, setChildren] = useState('Loading')

    useEffect(() => {
        fetchChildren(path, setChildren)
    }, [path])

    return (
        <div className='content mt-3'>
            <ReactMarkdown
                remarkPlugins={[gfm]}
                components={{
                    link: LinkMarkdown,
                    input: CheckbxMardown
                }}
                children={children}
            />
        </div>
    )
}

export default Markdown