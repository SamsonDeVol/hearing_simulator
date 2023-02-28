import React from 'react'
import ReactSlider from "react-slider";
import './filter.css'
const Slider = ({ change, settings }) => {
  const {type, frequency, Q, gain} = settings

  return (
    <ReactSlider
      className="react-slider"
      thumbClassName="slider-thumb"
      trackClassName="slider-track"
      defaultValue={0}
      // id="frequency"
      min={-40}
      max={0}
      value={gain}
      onChange={change}
      renderThumb={(props, state) => <div {...props}>{gain}</div>}
      orientation="vertical"
      invert={true}

    />
  )
}

export default Slider