import React, { useState, useEffect } from 'react'
import useSongSearch from '../hooks/useSongSearch'
import { useSearchParams } from 'react-router-dom'
import styled from '@emotion/styled/macro'
import SongList from './songList'

const AudioSelectionContainer = styled.div`
    margin-top: 40px;
    margin-left: 10px;
    flex: 15%;
    width: 100px;
    padding: 10px;
    height: 600px;
    border: solid 1px black;
    border-radius: 5px;
    margin-bottom: 10px;
`

function AudioSelection() {
    const [ searchParams, setSearchParams ] = useSearchParams()
	const [ inputQuery, setInputQuery ] = useState(searchParams.get("q") || "")
    const [ songList, isSongLoading ] = useSongSearch(searchParams.get("q"))

    return (
        <AudioSelectionContainer> 
            <form onSubmit={e => {
                e.preventDefault()
                setSearchParams({ q: inputQuery })
                }}>
                <input value={inputQuery} onChange={e => setInputQuery(e.target.value)} />
                <button type="submit"> Search </button>
            </form>
            <div> {isSongLoading ? <p>loading songs</p> : <SongList songList={songList}/>} </div>
        </AudioSelectionContainer>
    )
}

export default AudioSelection