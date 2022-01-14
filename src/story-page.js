import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
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
    const {group, page} = useParams()
    const path = `/pages/${group}/${page}.md`
    const [children, setChildren] = useState('Loading')

    useEffect(() => {
        fetchChildren(path, setChildren)
    }, [path])

    return (
        <div className='content mt-3'>
            <ReactMarkdown
                plugins={[gfm]}
                components={{
                    link: LinkMarkdown
                }}
                children={children}
            />
        </div>
    )
}

export default Story