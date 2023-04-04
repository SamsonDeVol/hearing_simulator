import React from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled/macro'

import { getAudio } from '../redux/selectors'

import VolumeLabels from './audioVolumeLabels'
import FilterLabels from './audioFilterLabels'
import AudioSliders from './audioSliders'
import AudioVisuals from './audioVisuals'
import FrequencyLabels from './audioFrequencyLabels'


const AudioInterfaceContainer = styled.div`
    flex: 60%;
	position:relative;
	width:660px;
	${'' /* height:400px; */}
  	text-align: center;
	display: flex; 	
	flex-direction: column;
	margin-top: 40px;
`
const GraphContainer = styled.div`

`

function AudioInterface() {
	const audio = useSelector(getAudio) 
	return(
		<AudioInterfaceContainer>
			{!audio ? 
			<p>
				To begin, search and select an audio
			</p> : 
			<>
				<FrequencyLabels/>
				<GraphContainer>
					<VolumeLabels/>
					<FilterLabels/>
					<AudioVisuals/>
					<AudioSliders/>
				</GraphContainer>
			</>
			}
		</AudioInterfaceContainer>
	)
}

export default AudioInterface
