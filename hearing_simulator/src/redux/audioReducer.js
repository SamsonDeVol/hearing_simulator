import { CREATE_AUDIO, STOP_AUDIO } from './actions'

function audioReducer(state = false, action) {
    switch (action.type) {
        case CREATE_AUDIO: 
			let AudioContext = window.AudioContext || window.webkitAudioContext
			let audioContext = new AudioContext()
			let audioElement = new Audio(action.payload)
			audioElement.crossOrigin = "anonymous"
			let track = audioContext.createMediaElementSource(audioElement)
			let gain = audioContext.createGain()
			let analyser = audioContext.createAnalyser()
			let frequencies = [1, 250, 500, 1000, 2000, 4000, 8000, 16000]
			let filters = frequencies.map(frequency => {
				let filter = audioContext.createBiquadFilter()
				filter.type = "peaking"
				filter.frequency.value = frequency
				return(filter)
			})
			track.connect(filters[0]).connect(filters[1]).connect(filters[2]).connect(filters[3]).connect(filters[4]).connect(filters[5]).connect(filters[6]).connect(filters[7]).connect(analyser).connect(gain).connect(audioContext.destination)

			return (
				{ 
					audioContext: audioContext, 
					audioElement: audioElement, 
					track: track, 
					filters: filters, 
					analyser: analyser,  
				}
			)
		case STOP_AUDIO:
			if (state !== false){
				state.audioContext.close()
				
			}
			return ( false )
        default:
            return state
    }
}

export default audioReducer
