import { useEffect, useState } from 'react'

function useSongSearch(query) {
    const [ songList, setsongList ] = useState([])
    const [ isSongLoading, setIsSongLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    useEffect(() => {
        let ignore = false
        const controller = new AbortController()
        async function fetchSearchResults() {
            setIsSongLoading(true)
            let responseBody = {}
            console.log("key", process.env.API_KEY)
            try {
                const response = await fetch(
                    `https://freesound.org/apiv2/search/text/?query=${query}&token=${process.env.REACT_APP_API_KEY}`,
                )
                if (response.status !== 200) {
                    console.log("== status:", response.status)
                    setError(true)
                } else {
                    setError(false)
                    responseBody = await response.json()
                }
            } catch (e) {
                if (e instanceof DOMException) {
                    console.log("HTTP request cancelled")
                } else {
                    setError(true)
                    console.error("Error:", e)
                    throw e
                }
            }
            if (!ignore) {
                setsongList(responseBody.results || [])
                setIsSongLoading(false)
            }
        }
        if (query) {
            fetchSearchResults()
        }
        return () => {
            ignore = true
            controller.abort()
        }
    }, [ query ])
    
    return [ songList, isSongLoading ]
}

export default useSongSearch
