// example from https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API#loading_sound

// create audio context
const audioContext = new AudioContext();

// load the audio
const audioElement = document.querySelector('audio');

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);

// select our play button
const playButton = document.querySelector('button');

track.connect(audioContext.destination);

playButton.addEventListener('click', function() {

    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // play or pause track depending on state
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

