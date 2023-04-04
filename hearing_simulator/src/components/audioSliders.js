import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Slider from './audioSlider.js'
import { getAudio, getAudioPaused } from '../redux/selectors'

function AudioSliders() {
	const audio = useSelector(getAudio)

	const [filtersSettings0, setFilterSettings0] = useState({
		gain: audio.filters[0].gain.value
	}) 
	const [filtersSettings1, setFilterSettings1] = useState({
		gain: audio.filters[1].gain.value
	}) 
	const [filtersSettings2, setFilterSettings2] = useState({
		gain: audio.filters[2].gain.value
	}) 
	const [filtersSettings3, setFilterSettings3] = useState({
		gain: audio.filters[3].gain.value
	}) 
	const [filtersSettings4, setFilterSettings4] = useState({
		gain: audio.filters[4].gain.value
	}) 
	const [filtersSettings5, setFilterSettings5] = useState({
		gain: audio.filters[5].gain.value
	}) 
	const [filtersSettings6, setFilterSettings6] = useState({
		gain: audio.filters[6].gain.value
	}) 
	const [filtersSettings7, setFilterSettings7] = useState({
		gain: audio.filters[7].gain.value
	}) 
	
	const changeFilter0 = gainValue => {
		setFilterSettings0({...filtersSettings0, gain: gainValue})
		audio.filters[0].gain.value = gainValue
	}
	const changeFilter1 = gainValue => {
		setFilterSettings1({...filtersSettings1, gain: gainValue})
		audio.filters[1].gain.value = gainValue
	}
	const changeFilter2 = gainValue => {
		setFilterSettings2({...filtersSettings2, gain: gainValue})
		audio.filters[2].gain.value = gainValue
	}
	const changeFilter3 = gainValue => {
		setFilterSettings3({...filtersSettings3, gain: gainValue})
		audio.filters[3].gain.value = gainValue
	}
	const changeFilter4 = gainValue => {
		setFilterSettings4({...filtersSettings4, gain: gainValue})
		audio.filters[4].gain.value = gainValue
	}
	const changeFilter5 = gainValue => {
		setFilterSettings5({...filtersSettings5, gain: gainValue})
		audio.filters[5].gain.value = gainValue
	}
	const changeFilter6 = gainValue => {
		setFilterSettings6({...filtersSettings6, gain: gainValue})
		audio.filters[6].gain.value = gainValue
	}
	const changeFilter7 = gainValue => {
		setFilterSettings7({...filtersSettings7, gain: gainValue})
		audio.filters[7].gain.value = gainValue
	}

    return (
        <div className='sliders'>
            <Slider className="slider0" filter="0" change={changeFilter0} settings={filtersSettings0}/>
            <Slider className="slider1" filter="1" change={changeFilter1} settings={filtersSettings1}/>
            <Slider className="slider2" filter="2" change={changeFilter2} settings={filtersSettings2}/>
            <Slider className="slider3" filter="3" change={changeFilter3} settings={filtersSettings3}/>
            <Slider className="slider4" filter="4" change={changeFilter4} settings={filtersSettings4}/>
            <Slider className="slider5" filter="5" change={changeFilter5} settings={filtersSettings5}/>
            <Slider className="slider6" filter="6" change={changeFilter6} settings={filtersSettings6}/>
            <Slider className="slider7" filter="7" change={changeFilter7} settings={filtersSettings7}/>
        </div>
    )
}

export default AudioSliders