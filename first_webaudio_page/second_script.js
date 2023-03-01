// Samson DeVol, Hearing Simulator usin Web Audio API in JavaScript
// example from https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API#loading_sound

function log10(x) {
  return Math.log(x)/Math.LN10;
}

function toDecibel(x) {
  return 20 * log10(x)
}

function graphFrequency(analyser){
  // 4800Hz and 2048 fft = 2400/1024 = 23.4Hz per bin
  analyser.fftSize = 2048;
 
  const bufferLength = analyser.frequencyBinCount;
  // console.log(analyser.minDecibels);
  const dataArray = new Uint8Array(bufferLength);

  var canvas = document.querySelector('.visualizer');
  var canvasContext = canvas.getContext("2d");

  WIDTH = 640;
  HEIGHT = 100;
  canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

  // draw an oscilloscope of the current audio source
  var draw = function() {
    drawVisual = requestAnimationFrame(draw);
  
    analyser.getByteFrequencyData(dataArray);
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

  draw();
}

function playButton(audioContext, audioElement){
  const playButton = document.querySelector('button');
  playButton.addEventListener('click', function() {
      if (audioContext.state === 'suspended') {
          audioContext.resume();
      }
      if (this.dataset.playing === 'false') {
          audioElement.play();
          this.dataset.playing = 'true';
      } else if (this.dataset.playing === 'true') {
          audioElement.pause();
          this.dataset.playing = 'false';
      }
  }, false);

    // add button listner
  audioElement.addEventListener('ended', () => {
    playButton.dataset.playing = 'false';
  }, false);
}

function volumeControl(audioContext, gainNode,){
  const volumeControl = document.querySelector('#volume');
  volumeControl.addEventListener('input', function() {
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    else{
      gainNode.gain.value = this.value;
      document.getElementById("a").innerHTML = `dB:${toDecibel( gainNode.gain.value )}`;
    }
  }, false);
}

function filterControl(audioContext, biquadFilter, sliderIndex, frequencyValue){
  const frequency_slider = document.querySelector(sliderIndex);
  frequency_slider.addEventListener('input', function() {
    if (audioContext.state === 'suspended'){
      audioContext.resume();
    }
    else{
      biquadFilter.type = "peaking";
      // center of the frequency band
      biquadFilter.frequency.value = frequencyValue;
      // sets slider Q factor, determining inverse band range
      // Q = frequency/BW (Band Width)
      biquadFilter.Q = 1
      // gain (or attenuation if negative) for dB level
      biquadFilter.gain.value = -(this.value)
      //document.getElementById("b").innerHTML = `frequency:${toDecibel( biquadFilter.frequency.value )}`;
    }
  }, false);
}

const audioContext = new AudioContext();
// console.log(audioContext.sampleRate);
// console.log(audioContext)
const audioElement = document.querySelector('audio');
const track = audioContext.createMediaElementSource(audioElement);
console.log(track)
const gainNode = audioContext.createGain();
const analyser = audioContext.createAnalyser();

// initialize filters
const biquadFilter0 = audioContext.createBiquadFilter();
const biquadFilter1 = audioContext.createBiquadFilter();
const biquadFilter2 = audioContext.createBiquadFilter();
const biquadFilter3 = audioContext.createBiquadFilter();
const biquadFilter4 = audioContext.createBiquadFilter();
const biquadFilter5 = audioContext.createBiquadFilter();
const biquadFilter6 = audioContext.createBiquadFilter();

// connect audio elements
track.connect(biquadFilter0).connect(biquadFilter1).connect(biquadFilter2).connect(biquadFilter3).connect(biquadFilter4).connect(biquadFilter5).connect(biquadFilter6).connect(analyser).connect(gainNode).connect(audioContext.destination);

// connect interfaces 
graphFrequency(analyser);
playButton(audioContext, audioElement);
volumeControl(audioContext, gainNode);

// pass biquad filters to specific function

filterControl(audioContext, biquadFilter0, '#frequency_0', 0);
filterControl(audioContext, biquadFilter1, '#frequency_1', 250);
filterControl(audioContext, biquadFilter2, '#frequency_2', 500);
filterControl(audioContext, biquadFilter3, '#frequency_3', 1000);
filterControl(audioContext, biquadFilter4, '#frequency_4', 2000);
filterControl(audioContext, biquadFilter5, '#frequency_5', 4000);
filterControl(audioContext, biquadFilter6, '#frequency_6', 8000);

