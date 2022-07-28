// example from https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API#loading_sound

function log10(x) {
  return Math.log(x)/Math.LN10;
}

function get_decibel(x) {
  return 20 * log10(x)
}

// create audio context
const audioContext = new AudioContext();
const audioElement = document.querySelector('audio');
const track = audioContext.createMediaElementSource(audioElement);
track.connect(audioContext.destination);

// play button
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

// volume slider
const gainNode = audioContext.createGain();
track.connect(gainNode).connect(audioContext.destination);
const volumeControl = document.querySelector('#volume');

volumeControl.addEventListener('input', function() {
  gainNode.gain.value = this.value;
  document.getElementById("a").innerHTML = `dB:${get_decibel( gainNode.gain.value )}`;
}, false);

// add button listner
audioElement.addEventListener('ended', () => {
  playButton.dataset.playing = 'false';
}, false);

