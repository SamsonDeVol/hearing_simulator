export function getAudio(state) {
  	return state.audio
}

export function getAudioPaused(state) {
	return state.audio.audioElement.paused
}
