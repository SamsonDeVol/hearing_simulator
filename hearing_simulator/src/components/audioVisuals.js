import React from 'react'
import { useSelector } from 'react-redux'
import GraphFrequencies from './audioGraph'
import './audioInterface.css'
import { getAudio } from '../redux/selectors'
import AudioPlayButton from './audioPlayButton'
import FrequencyLabels from './audioFrequencyLabels'
import VolumeLabels from './audioVolumeLabels'
import styled from '@emotion/styled/macro'

const VisualsContainer = styled.div`
	position: absolute;
	top: 45px;
	left: 120px;
	width: 660px;
	height: 400px;
`
function AudioVisuals() {
	const audio = useSelector(getAudio)

	const playClickHandler = (event) => {
		if (audio.audioContext.state === 'suspended') {
		  audio.audioContext.resume();
		}
		if(event === false){ 
		  audio.audioElement.play()
		} else if(event === true){
		  audio.audioElement.pause()
		}
	  }
	
    return (
      <VisualsContainer>
		{/* <FrequencyLabels/>
		<VolumeLabels/> */}
        { audio ? <GraphFrequencies analyser={audio.analyser}/> : <p> failed to load graph </p> }
        <br></br><AudioPlayButton audio={audio} playClickHandler={playClickHandler}/>
	</VisualsContainer>
    )
}

export default AudioVisuals
