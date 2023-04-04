import { useDispatch } from 'react-redux'
import { createAudio, stopAudio } from '../redux/actions'
import usePreviewSearch from '../hooks/usePreviewSearch'

function SongItem(props){
    const [ metaData, songPreview, isLoading ] = usePreviewSearch(props.id)
    const dispatch = useDispatch()

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            dispatch(stopAudio())
            dispatch(createAudio(songPreview))
            }}>
            <h4>{props.name}</h4>
            <button>Choose Audio</button>
        </form>    
    )
}

export default SongItem
