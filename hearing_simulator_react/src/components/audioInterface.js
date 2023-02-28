import React, { useState } from 'react'
import Slider from './filter.js'
import GraphFrequencies from './graph.js'
import './audioInterface.css'

// instantiate Web Audio API
let AudioContext = window.AudioContext || window.webkitAudioContext
let audioContext = new AudioContext()
let audioElement = document.querySelector('audio')
let track = audioContext.createMediaElementSource(audioElement)
let gain = audioContext.createGain()
let analyser = audioContext.createAnalyser()
let frequencies = [0, 250, 500, 1000, 2000, 4000, 8000]
let filters = frequencies.map(frequency => {
  let filter = audioContext.createBiquadFilter()
  filter.type = "peaking"
  filter.frequency.value = frequency
  return(filter)
})

track.connect(filters[0]).connect(filters[1]).connect(filters[2]).connect(filters[3]).connect(filters[4]).connect(filters[5]).connect(filters[6]).connect(analyser).connect(gain).connect(audioContext.destination)

function AudioInterface() {
  const [filtersSettings0, setFilterSettings0] = useState({
    gain: filters[0].gain.value
  }) 
  const [filtersSettings1, setFilterSettings1] = useState({
    gain: filters[1].gain.value
  }) 
  const [filtersSettings2, setFilterSettings2] = useState({
    gain: filters[2].gain.value
  }) 
  const [filtersSettings3, setFilterSettings3] = useState({
    gain: filters[3].gain.value
  }) 
  const [filtersSettings4, setFilterSettings4] = useState({
    gain: filters[4].gain.value
  }) 
  const [filtersSettings5, setFilterSettings5] = useState({
    gain: filters[5].gain.value
  }) 
  const [filtersSettings6, setFilterSettings6] = useState({
    gain: filters[6].gain.value
  }) 
 
  
  const changeFilter0 = gainValue => {
    setFilterSettings0({...filtersSettings0, gain: gainValue})
    filters[0].gain.value = gainValue
  }
  const changeFilter1 = gainValue => {
    setFilterSettings1({...filtersSettings1, gain: gainValue})
    filters[1].gain.value = gainValue
  }
  const changeFilter2 = gainValue => {
    setFilterSettings2({...filtersSettings2, gain: gainValue})
    filters[2].gain.value = gainValue
  }
  const changeFilter3 = gainValue => {
    setFilterSettings3({...filtersSettings3, gain: gainValue})
    filters[3].gain.value = gainValue
  }
  const changeFilter4 = gainValue => {
    setFilterSettings4({...filtersSettings4, gain: gainValue})
    filters[4].gain.value = gainValue
  }
  const changeFilter5 = gainValue => {
    setFilterSettings5({...filtersSettings5, gain: gainValue})
    filters[5].gain.value = gainValue
  }
  const changeFilter6 = gainValue => {
    setFilterSettings6({...filtersSettings6, gain: gainValue})
    filters[6].gain.value = gainValue
  }

  return(
    <div className='interface-wrapper'>

      <WebAudio className="visuals"/>
      <div className='sliders'>
        <Slider className="slider0" change={changeFilter0} settings={filtersSettings0}/>
        <Slider className="slider1" change={changeFilter1} settings={filtersSettings1}/>
        <Slider className="slider2" change={changeFilter2} settings={filtersSettings2}/>
        <Slider className="slider3" change={changeFilter3} settings={filtersSettings3}/>
        <Slider className="slider4" change={changeFilter4} settings={filtersSettings4}/>
        <Slider className="slider5" change={changeFilter5} settings={filtersSettings5}/>
        <Slider className="slider6" change={changeFilter6} settings={filtersSettings6}/>
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
      <button className="play-click" onClick={ (e) => {this.handleClick(e)} }> {String(this.state.playing)} </button> 
    )
  }
}

class WebAudio extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      audioContext: null,
      audioElement: null,
      analyser: null,
    }
  }

  componentDidMount(){
    this.setState({
      audioContext: audioContext, 
      audioElement: audioElement,
      analyser: analyser,
    })
  }

  playClickHandler = (event) => {
    if (this.state.audioContext.state === 'suspended') {
      this.state.audioContext.resume();
    }
    if(event === false){ 
      this.state.audioElement.play()
    } else if(event === true){
      this.state.audioElement.pause()
    }
  }
  
  render(){
    let graph
    if(this.state.analyser !== null){
      graph = <GraphFrequencies analyser={this.state.analyser}/>
    } else {
      graph = <p> failed to load graph </p>
    }
    return (
      <div className="web-audio">
        {graph}
        <PlayClick playClickHandler={this.playClickHandler}/>
      </div>
    )
  }
}

export default AudioInterface
