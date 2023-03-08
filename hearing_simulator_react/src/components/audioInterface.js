import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Slider from './audioSlider.js'
import GraphFrequencies from './audioGraph.js'
import './audioInterface.css'

import { getAudio } from '../redux/selectors'

function AudioInterface() {
	const audio = useSelector(getAudio)

	const [filtersSettings0, setFilterSettings0] = useState({
		gain: audio.filters[0].gain.value
	}) 
	const [filtersSettings1, setFilterSettings1] = useState({
		gain: audio.filters[1].gain.value
	}) 
	const [filtersSettings2, setFilterSettings2] = useState({
		gain: audio.filters[2].gain.value
	}) 
	const [filtersSettings3, setFilterSettings3] = useState({
		gain: audio.filters[3].gain.value
	}) 
	const [filtersSettings4, setFilterSettings4] = useState({
		gain: audio.filters[4].gain.value
	}) 
	const [filtersSettings5, setFilterSettings5] = useState({
		gain: audio.filters[5].gain.value
	}) 
	const [filtersSettings6, setFilterSettings6] = useState({
		gain: audio.filters[6].gain.value
	}) 
	
	const changeFilter0 = gainValue => {
		setFilterSettings0({...filtersSettings0, gain: gainValue})
		audio.filters[0].gain.value = gainValue
	}
	const changeFilter1 = gainValue => {
		setFilterSettings1({...filtersSettings1, gain: gainValue})
		audio.filters[1].gain.value = gainValue
	}
	const changeFilter2 = gainValue => {
		setFilterSettings2({...filtersSettings2, gain: gainValue})
		audio.filters[2].gain.value = gainValue
	}
	const changeFilter3 = gainValue => {
		setFilterSettings3({...filtersSettings3, gain: gainValue})
		audio.filters[3].gain.value = gainValue
	}
	const changeFilter4 = gainValue => {
		setFilterSettings4({...filtersSettings4, gain: gainValue})
		audio.filters[4].gain.value = gainValue
	}
	const changeFilter5 = gainValue => {
		setFilterSettings5({...filtersSettings5, gain: gainValue})
		audio.filters[5].gain.value = gainValue
	}
	const changeFilter6 = gainValue => {
		setFilterSettings6({...filtersSettings6, gain: gainValue})
		audio.filters[6].gain.value = gainValue
	}

  return(
    <div className='interface-wrapper'>

		<WebAudio className="visuals"/>
		<div className='sliders'>
			<Slider className="slider0" filter="0" change={changeFilter0} settings={filtersSettings0}/>
			<Slider className="slider1" filter="1" change={changeFilter1} settings={filtersSettings1}/>
			<Slider className="slider2" filter="2" change={changeFilter2} settings={filtersSettings2}/>
			<Slider className="slider3" filter="3" change={changeFilter3} settings={filtersSettings3}/>
			<Slider className="slider4" filter="4" change={changeFilter4} settings={filtersSettings4}/>
			<Slider className="slider5" filter="5" change={changeFilter5} settings={filtersSettings5}/>
			<Slider className="slider6" filter="6" change={changeFilter6} settings={filtersSettings6}/>
		</div>
    </div>
  )
}

class PlayClick extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      playing: false
    }
  }

  handleClick(){
    this.setState({playing:!this.state.playing})
    this.props.playClickHandler(this.state.playing)
  }

  render(){
    return(
      <button className="play-click" onClick={ (e) => {this.handleClick(e)} }> {this.state.playing ? <p> Pause </p> : <p> Play </p>} </button> 
    )
  }
}

function WebAudio() {
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
      <div className="web-audio">
        { audio ? <GraphFrequencies analyser={audio.analyser}/> : <p> failed to load graph </p> }
        <PlayClick playClickHandler={playClickHandler}/>
      </div>
    )
}

export default AudioInterface
