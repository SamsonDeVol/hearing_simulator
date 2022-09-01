// example from https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API#loading_sound

function log10(x) {
  return Math.log(x)/Math.LN10;
}

function get_decibel(x) {
  return 20 * log10(x)
}

function graph_frequency(analyser){
  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  console.log(bufferLength);
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
    document.getElementById("b").innerHTML = `${dataArray}`;
    for(var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];

      canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
      canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);

      x += barWidth + 1;
    }
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
      document.getElementById("b").innerHTML = `frequency:${get_decibel( biquad_filter.frequency.value )}`;
    }
  }, false);
}


const audioContext = new AudioContext();
const audioElement = document.querySelector('audio');
const track = audioContext.createMediaElementSource(audioElement);
const gainNode = audioContext.createGain();
const analyser = audioContext.createAnalyser();
const biquad_filter = audioContext.createBiquadFilter();

track.connect(analyser).connect(biquad_filter).connect(gainNode).connect(audioContext.destination);
graph_frequency(analyser);
play_button(audioContext, audioElement);
volume_control(audioContext, gainNode);
frequency_control(audioContext, biquad_filter);


