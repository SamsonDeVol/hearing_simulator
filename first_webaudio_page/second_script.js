// example from https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API#loading_sound

function log10(x) {
  return Math.log(x)/Math.LN10;
}

function get_decibel(x) {
  return 20 * log10(x)
}

function graph_frequency(analyser){
  // 4800Hz and 2048 fft = 2400/1024 = 23.4Hz per bin
  analyser.fftSize = 2048;
 
  const bufferLength = analyser.frequencyBinCount;
  console.log(analyser.minDecibels);
  const dataArray = new Uint8Array(bufferLength);

  var canvas = document.querySelector('.visualizer');
  var canvasCtx = canvas.getContext("2d");

  WIDTH = 640;
  HEIGHT = 100;
  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

  // draw an oscilloscope of the current audio source

  var draw = function() {
    drawVisual = requestAnimationFrame(draw);
  
    analyser.getByteFrequencyData(dataArray);
    
    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;
    var total = 0;
    for(var j = 0; j < 500; j++) {
        total += dataArray[j];
    }
    var upto500 = 0;
    for(var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      
      // 250//23.4 = 10.68 for audiogram relation
      if(i < 10){
        canvasCtx.fillStyle = 'rgb(125,0,0)';
      }
      // 500/23.4 = 21.37
      else if(i < 21){
        upto500 += dataArray[i];
        canvasCtx.fillStyle = 'rgb(125,125,0)';
      }
      // 1000/23.4 = 42.74
      else if(i < 42){
        canvasCtx.fillStyle = 'rgb(125,125,0)';
      }
      // 2000/23.4 = 85.47
      else if(i < 85){
        canvasCtx.fillStyle = 'rgb(125,125,125)';
      }
      // 4000/23.4 = 170.94
      else if(i < 170){
        canvasCtx.fillStyle = 'rgb(255,0,0)';
      }
      // 8000/23.4 = 341.88
      else if(i < 341){
        canvasCtx.fillStyle = 'rgb(255,125,0)';
      }
      else{
        canvasCtx.fillStyle = 'rgb(255,255,0)';
      }
      canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);

      x += barWidth + 1;
    }
    document.getElementById("b").innerHTML = `${upto500/11}`;
  };

  draw();
}

function play_button(audioCtx, audioElement){
  const playButton = document.querySelector('button');
  playButton.addEventListener('click', function() {
      if (audioCtx.state === 'suspended') {
          audioCtx.resume();
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

function volume_control(audioCtx, gainNode,){
  const volumeControl = document.querySelector('#volume');
  volumeControl.addEventListener('input', function() {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    else{
      gainNode.gain.value = this.value;
      document.getElementById("a").innerHTML = `dB:${get_decibel( gainNode.gain.value )}`;
    }
  }, false);
}


function frequency_control(audioCtx, biquad_filter){
  const frequency_slider = document.querySelector('#frequency');
  frequency_slider.addEventListener('input', function() {
    if (audioCtx.state === 'suspended'){
      audioCtx.resume();
    }
    else{
      biquad_filter.type = "lowpass";
      biquad_filter.frequency.value = this.value;
      //document.getElementById("b").innerHTML = `frequency:${get_decibel( biquad_filter.frequency.value )}`;
    }
  }, false);
}


const audioContext = new AudioContext();
console.log(audioContext.sampleRate);
const audioElement = document.querySelector('audio');
const track = audioContext.createMediaElementSource(audioElement);
const gainNode = audioContext.createGain();
const analyser = audioContext.createAnalyser();
const biquad_filter = audioContext.createBiquadFilter();

track.connect(biquad_filter).connect(analyser).connect(gainNode).connect(audioContext.destination);
graph_frequency(analyser);
play_button(audioContext, audioElement);
volume_control(audioContext, gainNode);
frequency_control(audioContext, biquad_filter);


