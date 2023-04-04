import SongItem from './songItem'
import styled from '@emotion/styled/macro'

const SongListContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 500px;
    overflow-y: auto;
    
`
function SongList(props) {
    console.log("list", props.songList)
    return (
        <SongListContainer> 
            {props.songList.map(song => <SongItem key={song.id} {...song} />)}
        </SongListContainer>
    )
}

export default SongList