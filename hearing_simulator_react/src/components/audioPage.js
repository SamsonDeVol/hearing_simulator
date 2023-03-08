import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import useSearch from '../hooks/useSearch'
import { createAudio } from '../redux/actions.js'
import { getAudio } from '../redux/selectors'

import AudioInterface from './audioInterface'

function AudioPage () {
    const [ searchParams, setSearchParams ] = useSearchParams()
	const [ inputQuery, setInputQuery ] = useState(searchParams.get("q") || "")
	const [ metaData, songPreview, isLoading ] = useSearch(searchParams.get("q"))

	const dispatch = useDispatch()

	useEffect(() => {
    	dispatch(createAudio(songPreview))
  	}, [songPreview]);

    const audio = useSelector(getAudio) 

    return (
        <div> 
            <form onSubmit={e => {
                e.preventDefault()
                setSearchParams({ q: inputQuery })
                }}>
                <input value={inputQuery} onChange={e => setInputQuery(e.target.value)} />
                <button type="submit"> Search </button>
			</form>
            <div> {!audio ? <p>loading</p> : <AudioInterface/>} </div>
        </div>
    )
}

export default AudioPage
