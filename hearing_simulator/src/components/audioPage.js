import React from 'react'
import { useSelector } from 'react-redux'
import { getAudio } from '../redux/selectors'

import AudioInterface from './audioInterface'
import AudioSelection from './audioSelection'
import AudioHint from './audioHint'

import styled from '@emotion/styled/macro'

const AudioPageContainer = styled.div`
    display: flex;
`

const HintContainer = styled.div`
    flex: 15%;
    padding: 10px;
`

function AudioPage () {

    return (
        <AudioPageContainer>
            
            <AudioSelection/>
            <AudioInterface/>
            <AudioHint/>
            
        </AudioPageContainer>
  )
}

export default AudioPage
