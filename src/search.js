import React, { useCallback, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import qs from 'qs'

const Search = ({ data, filter, onChange }) => {
    const navigate = useNavigate()
    const { pathname, search } = useLocation()
    const query = qs.parse(search, { ignoreQueryPrefix: true })
    const term = query.term || ''

    const found = useCallback((value) => {
        if (navigator.userAgent === 'ReactSnap') return []

        const searchTerms = value
            .split(/[^A-Z0-9 ]/ig)
            .filter(searchTerm => searchTerm !== '')
            .map(t => t.toLowerCase().trim())

        if (searchTerms.length > 0) return data.filter(filter(searchTerms))
        return data
    }, [data, filter])

    onChange = useCallback(onChange, [onChange])

    useEffect(() => {
        onChange(found(term))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return (
        <input
            className='input mb-4'
            type='text'
            placeholder='Search name'
            value={term}
            onChange={({ target: { value } }) => {
                navigate(`${pathname}?${qs.stringify({...query, term: value})}`)
                onChange(found(value))
            }}
        />
    )
}

export default Search