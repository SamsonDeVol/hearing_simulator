import { useEffect, useState } from 'react'

function useSearch(query) {
    const [ metaData, setMetaData ] = useState([])
    const [ songPreview, setSongPreview ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    useEffect(() => {
        let ignore = false
        const controller = new AbortController()
        async function fetchSearchResults() {
            setIsLoading(true)
            let responseBody = {}
            console.log("key", process.env.API_KEY)
            try {
                const response = await fetch(
                    // `https://freesound.org/apiv2/search/text/?query=${query}&token=${process.env.API_KEY}`,
                        `https://freesound.org/apiv2/sounds/${query}/?descriptors=lowlevel.mfcc,rhythm.bpm&token=${process.env.REACT_APP_API_KEY}`,                
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
                setMetaData(responseBody || [])
                setSongPreview(responseBody.previews['preview-hq-mp3'] || [])
                setIsLoading(false)
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
    
    return [ metaData, songPreview, isLoading ]
}

export default useSearch
