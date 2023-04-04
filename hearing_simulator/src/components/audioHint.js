import styled from '@emotion/styled/macro'
import './audioInterface.css'
const HintContainer = styled.div`
    margin-right: 10px;
    margin-top: 40px;
    flex: 15%;
    padding: 10px;
    text-align: center;
    border: solid 1px black;
    border-radius: 5px;
    margin-bottom: 10px;
`

function AudioHint() {
    return (
        <HintContainer>
        <p> How to use:
        <br></br><br></br>
        1. Search for an audio sound in the <span className="bold-text">Search Bar</span>
        <br></br><br></br>
        2. Press  <span className="bold-text">Choose Audio</span>
        <br></br><br></br>
        3. Adjust <span className="bold-text">Yellow Frequency Notchs</span> on the graph 
        <br></br><br></br>
        4. Press the <span className="bold-text">Play Button</span> beneath the graph</p>
        </HintContainer>
    )
}

export default AudioHint