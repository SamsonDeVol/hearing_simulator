import React, { useState } from 'react'
import ReactDOM from 'react-dom/client';
import './index.css'
import Slider from './components/filter.js';
import GraphFrequencies from './components/graph';
// npm install react-slider

// instantiate Web Audio API
let AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext = new AudioContext();
let audioElement = document.querySelector('audio');
let track = audioContext.createMediaElementSource(audioElement);
let gain = audioContext.createGain();
let analyser = audioContext.createAnalyser();
let frequencies = [0, 250, 500, 1000, 2000, 4000, 8000]

let filters = frequencies.map(frequency => {
  let filter = audioContext.createBiquadFilter();
  filter.type = "peaking"
  filter.frequency.value = frequency
  return(filter)
})

console.log(filters)
// let filter = audioContext.createBiquadFilter();
// filter.type = "peaking"
// filter.frequency.value = 50
track.connect(filters[0]).connect(filters[1]).connect(filters[2]).connect(filters[3]).connect(filters[4]).connect(filters[5]).connect(filters[6]).connect(analyser).connect(gain).connect(audioContext.destination);


function App() {
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
    console.log("la", gainValue)
    setFilterSettings0({...filtersSettings0, gain: gainValue})
    filters[0].gain.value = gainValue
  }
  const changeFilter1 = gainValue => {
    console.log("la", gainValue)
    setFilterSettings1({...filtersSettings1, gain: gainValue})
    filters[1].gain.value = gainValue
  }
  const changeFilter2 = gainValue => {
    console.log("la", gainValue)
    setFilterSettings2({...filtersSettings2, gain: gainValue})
    filters[2].gain.value = gainValue
  }
  const changeFilter3 = gainValue => {
    console.log("la", gainValue)
    setFilterSettings3({...filtersSettings3, gain: gainValue})
    filters[3].gain.value = gainValue
  }
  const changeFilter4 = gainValue => {
    console.log("la", gainValue)
    setFilterSettings4({...filtersSettings4, gain: gainValue})
    filters[4].gain.value = gainValue
  }
  const changeFilter5 = gainValue => {
    console.log("la", gainValue)
    setFilterSettings5({...filtersSettings5, gain: gainValue})
    filters[5].gain.value = gainValue
  }
  const changeFilter6 = gainValue => {
    console.log("la", gainValue)
    setFilterSettings6({...filtersSettings6, gain: gainValue})
    filters[6].gain.value = gainValue
  }

  return(
    <div className='main-div'>

      <WebAudio className="visuals"/>
      <div className='sliders'>
        <Slider className="slider" change={changeFilter0} settings={filtersSettings0}/>
        <Slider className="slider" change={changeFilter1} settings={filtersSettings1}/>
        <Slider className="slider" change={changeFilter2} settings={filtersSettings2}/>
        <Slider className="slider" change={changeFilter3} settings={filtersSettings3}/>
        <Slider className="slider" change={changeFilter4} settings={filtersSettings4}/>
        <Slider className="slider" change={changeFilter5} settings={filtersSettings5}/>
        <Slider className="slider" change={changeFilter6} settings={filtersSettings6}/>
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
      <button onClick={ (e) => {this.handleClick(e)} }> {String(this.state.playing)} </button> 
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
    // update WebAudio state
    this.setState({
      audioContext: audioContext, 
      audioElement: audioElement,
      analyser: analyser,
    })
  }

  playClickHandler = (event) => {
    // resume audio if suspended (required by Web Audio API)
    if (this.state.audioContext.state === 'suspended') {
      this.state.audioContext.resume();
    }
    
    // play or pause audio depending on current playing state
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
      graph = <p> no graph </p>
    }
    return (
      <div className="web_audio">
        {graph}
        <PlayClick className="play_click" playClickHandler={this.playClickHandler}/>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)


// Samson DeVol, Hearing Simulator usin Web Audio API in JavaScript
// example from https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API#loading_sound

// function log10(x) {
//   return Math.log(x)/Math.LN10;
// }

// function toDecibel(x) {
//   return 20 * log10(x)
// }



// function playButton(audioContext, audioElement){
//   const playButton = document.querySelector('button');
//   playButton.addEventListener('click', function() {
//       if (audioContext.state === 'suspended') {
//           audioContext.resume();
//       }
//       if (this.dataset.playing === 'false') {
//           audioElement.play();
//           this.dataset.playing = 'true';
//       } else if (this.dataset.playing === 'true') {
//           audioElement.pause();
//           this.dataset.playing = 'false';
//       }
//   }, false);

//     // add button listner
//   audioElement.addEventListener('ended', () => {
//     playButton.dataset.playing = 'false';
//   }, false);
// }

// function volumeControl(audioContext, gain,){
//   const volumeControl = document.querySelector('#volume');
//   volumeControl.addEventListener('input', function() {
//     if (audioContext.state === 'suspended') {
//       audioContext.resume();
//     }
//     else{
//       gain.gain.value = this.value;
//       document.getElementById("a").innerHTML = `dB:${toDecibel( gain.gain.value )}`;
//     }
//   }, false);
// }

// function filterControl(audioContext, biquadFilter, sliderIndex, frequencyValue){
//   const frequency_slider = document.querySelector(sliderIndex);
//   frequency_slider.addEventListener('input', function() {
//     if (audioContext.state === 'suspended'){
//       audioContext.resume();
//     }
//     else{
//       biquadFilter.type = "peaking";
//       // center of the frequency band
//       biquadFilter.frequency.value = frequencyValue;
//       // sets slider Q factor, determining inverse band range
//       // Q = frequency/BW (Band Width)
//       biquadFilter.Q = 1
//       // gain (or attenuation if negative) for dB level
//       biquadFilter.gain.value = -(this.value)
//       //document.getElementById("b").innerHTML = `frequency:${toDecibel( biquadFilter.frequency.value )}`;
//     }
//   }, false);
// }

// const audioContext = new AudioContext();
// // console.log(audioContext.sampleRate);
// // console.log(audioContext)
// const audioElement = document.querySelector('audio');
// const track = audioContext.createMediaElementSource(audioElement);
// console.log(track)
// const gain = audioContext.createGain();
// const analyser = audioContext.createAnalyser();

// // initialize filters
// const biquadFilter0 = audioContext.createBiquadFilter();
// const biquadFilter1 = audioContext.createBiquadFilter();
// const biquadFilter2 = audioContext.createBiquadFilter();
// const biquadFilter3 = audioContext.createBiquadFilter();
// const biquadFilter4 = audioContext.createBiquadFilter();
// const biquadFilter5 = audioContext.createBiquadFilter();
// const biquadFilter6 = audioContext.createBiquadFilter();

// // connect audio elements
// track.connect(biquadFilter0).connect(biquadFilter1).connect(biquadFilter2).connect(biquadFilter3).connect(biquadFilter4).connect(biquadFilter5).connect(biquadFilter6).connect(analyser).connect(gain).connect(audioContext.destination);

// // connect interfaces 
// graphFrequency(analyser);
// playButton(audioContext, audioElement);
// volumeControl(audioContext, gain);

// // pass biquad filters to specific function

// filterControl(audioContext, biquadFilter0, '#frequency_0', 0);
// filterControl(audioContext, biquadFilter1, '#frequency_1', 250);
// filterControl(audioContext, biquadFilter2, '#frequency_2', 500);
// filterControl(audioContext, biquadFilter3, '#frequency_3', 1000);
// filterControl(audioContext, biquadFilter4, '#frequency_4', 2000);
// filterControl(audioContext, biquadFilter5, '#frequency_5', 4000);
// filterControl(audioContext, biquadFilter6, '#frequency_6', 8000);