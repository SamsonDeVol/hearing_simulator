import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom/client';
import './index.css'

// npm install react-slider
import ReactSlider from "react-slider";

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
    console.log("PlayClick playing state: ", this.state.playing)
    return(
      <button onClick={ (e) => {this.handleClick(e)} }> {String(this.state.playing)} </button> 
    )
  }
}

function App() {
  return(
    <div>
      <WebAudio/>
    </div>
  )
}

const Canvas = props => {  
  
  const { draw, ...rest } = props
  const canvasRef = useCanvas(draw)
  
  return <canvas className="canvas" width="1280" height="200" ref={canvasRef} {...rest}/>
}

const useCanvas = draw => {
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId
    
    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return canvasRef
}

function GraphFrequencies(props){
  console.log("neeed: ", props.analyser)
  // 4800Hz and 2048 fft = 2400/1024 = 23.4Hz per bin
  props.analyser.fftSize = 2048;
 
  const bufferLength = props.analyser.frequencyBinCount;
  // console.log(props.analyser.minDecibels);
  const dataArray = new Uint8Array(bufferLength);


  const WIDTH = 1280;
  const HEIGHT = 200;

  // draw an oscilloscope of the current audio source
  const draw = (canvasContext, frameCount) => {
    // let drawVisual = requestAnimationFrame(draw);
  
    props.analyser.getByteFrequencyData(dataArray);
    canvasContext.fillStyle = 'rgb(0, 0, 0)';
    canvasContext.fillRect(0, 0, WIDTH, HEIGHT);

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;
    for(var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      
      // 250//23.4 = 10.68 for audiogram relation
      if(i < 10){
        canvasContext.fillStyle = 'rgb(255,0,0)';
      }
      // 500/23.4 = 21.37
      else if(i < 21){
        canvasContext.fillStyle = 'rgb(255,127,0)';
      }
      // 1000/23.4 = 42.74
      else if(i < 42){
        canvasContext.fillStyle = 'rgb(255,255,0)';
      }
      // 2000/23.4 = 85.47
      else if(i < 85){
        canvasContext.fillStyle = 'rgb(0,255,0)';
      }
      // 4000/23.4 = 170.94
      else if(i < 170){
        canvasContext.fillStyle = 'rgb(0,0,255)';
      }
      // 8000/23.4 = 341.88
      else if(i < 341){
        canvasContext.fillStyle = 'rgb(75,0,130)';
      }
      else{
        canvasContext.fillStyle = 'rgb(148,0,211)';
      }
      canvasContext.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);

      x += barWidth + 1;
    }
  };

  return (
    <div>
      <Canvas draw={draw} />
    </div>
  )
}

class WebAudio extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      song: process.env.PUBLIC_URL + 'whitenoise.mp3',
      audioContext: null,
      audioElement: null,
      analyser: null,
      track: null,
      biquadFilter: null
    }
  }

  componentDidMount(){
    // create Web Audio API components
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    const audioElement = document.querySelector('audio');
    const track = audioContext.createMediaElementSource(audioElement);
    const gainNode = audioContext.createGain();
    const analyser = audioContext.createAnalyser();

    // const biquadFilter0 = audioContext.createBiquadFilter();

    // connect Web Audio API components
    track.connect(analyser).connect(gainNode).connect(audioContext.destination);
    track.connect(audioContext.destination);

    // update WebAudio state
    this.setState({
      audioContext: audioContext, 
      audioElement: audioElement,
      analyser: analyser,
      track: track
      // biquadFilter: biquadFilter0
    })
  }

  playClickHandler = (event) => {
    // console.log("playing state", event, "song", this.state)

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
        <BiquadFilter className="biquad_filter"/>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

class BiquadFilter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      type: "peaking",
      frequencyValue: 250,
      Q: 1,
      gainValue: 0,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, valueNow){
    console.log("sliding: ", event[1], valueNow)
    this.setState({
      gainValue: event[1]
    })
    
  }
  render(){
    return (
      <div className="slider_div">
        <Slider onChange={this.handleChange}/>
      </div>
    )
  }
}

const Slider = ({ onChange }) => {
  return (
    <ReactSlider
      className="slider"
      thumbClassName="slider-thumb"
      trackClassName="slider-track"
      min={0}
      max={40}
      defaultValue={0}
      onChange={onChange}
      renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      orientation="vertical"
      invert
      pearling
      minDistance={10}
    />
  );
};

// class FilterControl extends React.Component{
//   constructor(props){
//     super(props)
//     this.state = {
//       audioContext: props.audioContext,
//       biquadFilter: props.biquadFilter,
//       frequencyValue: props.frequencyValue
//     }
//   }

//   handleChange(){
//     this.state.biquadFilter.type = "peaking";
//     // center of the frequency band
//     this.state.biquadFilter.frequency.value = this.state.frequencyValue;
//     // sets slider Q factor, determining inverse band range
//     // Q = frequency/BW (Band Width)
//     this.state.biquadFilter.Q = 1
//     // gain (or attenuation if negative) for dB level
//     this.state.biquadFilter.gain.value = -(this.value)
//     //document.getElementById("b").innerHTML = `frequency:${toDecibel( biquadFilter.frequency.value )}`;
//   }
//   render() {
//     return (
//       <div>
//         <Slider aria-label="Volume" orientation="vertical" min={0} max={40} value={0} onChange={this.handleChange} />
//       </div>
//     )
//   }
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




// class GraphFrequencies extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       analyser: props.analyser,
//       bufferLength: null,
//       dataArray: new Uint8Array(props.analyser.frequencyBinCount),
//       canvasContext: null,
//       drawVisual: null,
//       height: 100,
//       width: 640
//     }
//   }


//   componentDidMount(){
//     console.log("analyser passed 2: ", this.props.analyser)
//     //4800Hz and 2048 fft = 2400/1024 = 23.4Hz per bin
    

    
//     this.setState({
//       analyser: this.props.analyser,
//       bufferLength: this.props.analyser.frequencyBinCount,
//       dataArray: new Uint8Array(this.props.analyser.frequencyBinCount),

//       // drawVisual: requestAnimationFrame(draw)
//     })
//     this.state.analyser.fftSize(2048)
//   }


//   render(){
//     let canvas = document.querySelector('.visualizer');
//     let canvasContext = canvas.getContext("2d")
//     canvasContext.clearRect(0, 0, this.state.width, this.state.height)
//     //draw an oscilloscope of the current audio source
//     this.state.analyser.getByteFrequencyData(this.state.dataArray);
//     canvasContext.fillStyle = 'rgb(0, 0, 0)'
//     canvasContext.fillRect(0, 0, this.state.width, this.state.height);

//     var barWidth = (this.state.width / this.state.bufferLength) * 2.5;
//     var barHeight;
//     var x = 0;
//     for(var i = 0; i < this.state.bufferLength; i++) {
//       barHeight = this.state.dataArray[i];
      
//       // 250//23.4 = 10.68 for audiogram relation
//       if(i < 10){
//         canvasContext.fillStyle('rgb(255,0,0)')
//       }
//       // 500/23.4 = 21.37
//       else if(i < 21){
//         canvasContext.fillStyle('rgb(255,127,0)')
//       }
//       // 1000/23.4 = 42.74
//       else if(i < 42){
//         canvasContext.fillStyle('rgb(255,255,0)')
//       }
//       // 2000/23.4 = 85.47
//       else if(i < 85){
//         canvasContext.fillStyle('rgb(0,255,0)')
//       }
//       // 4000/23.4 = 170.94
//       else if(i < 170){
//         canvasContext.fillStyle('rgb(0,0,255)');
//       }
//       // 8000/23.4 = 341.88
//       else if(i < 341){
//         canvasContext.fillStyle('rgb(75,0,130)');
//       }
//       else{
//         canvasContext.fillStyle('rgb(148,0,211)');
//       }
//       canvasContext.fillRect(x,this.state.height-barHeight/2,barWidth,barHeight/2);
//       x += barWidth + 1;
//     }

    
//     return (
//       canvasContext
//     )
//   }

// }                    




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

// function volumeControl(audioContext, gainNode,){
//   const volumeControl = document.querySelector('#volume');
//   volumeControl.addEventListener('input', function() {
//     if (audioContext.state === 'suspended') {
//       audioContext.resume();
//     }
//     else{
//       gainNode.gain.value = this.value;
//       document.getElementById("a").innerHTML = `dB:${toDecibel( gainNode.gain.value )}`;
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
// const gainNode = audioContext.createGain();
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
// track.connect(biquadFilter0).connect(biquadFilter1).connect(biquadFilter2).connect(biquadFilter3).connect(biquadFilter4).connect(biquadFilter5).connect(biquadFilter6).connect(analyser).connect(gainNode).connect(audioContext.destination);

// // connect interfaces 
// graphFrequency(analyser);
// playButton(audioContext, audioElement);
// volumeControl(audioContext, gainNode);

// // pass biquad filters to specific function

// filterControl(audioContext, biquadFilter0, '#frequency_0', 0);
// filterControl(audioContext, biquadFilter1, '#frequency_1', 250);
// filterControl(audioContext, biquadFilter2, '#frequency_2', 500);
// filterControl(audioContext, biquadFilter3, '#frequency_3', 1000);
// filterControl(audioContext, biquadFilter4, '#frequency_4', 2000);
// filterControl(audioContext, biquadFilter5, '#frequency_5', 4000);
// filterControl(audioContext, biquadFilter6, '#frequency_6', 8000);