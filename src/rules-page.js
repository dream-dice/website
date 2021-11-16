import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const fetchChildren = async (setContent) => {
    try {
        const res = await fetch('/pages/rules.md', {
            headers: {
                accept: 'text/plain'
            }
        })
        const children = await res.text()
        if (children.includes('<!DOCTYPE html>')) setContent('There was an issue getting this service.')
        else setContent(children)
    } catch (err) {
        setContent('There was an issue getting this page')
    }
}


const Rules = () => {
    const [content, setContent] = useState('Loading ...')
    useEffect(() => {
        fetchChildren(setContent)
    }, [])

    return (
        <div className='mt-3'>
            <div className='content'>
            <ReactMarkdown plugins={[gfm]}>{content}</ReactMarkdown>
            </div>
        </div>
    )
}

export default Rules