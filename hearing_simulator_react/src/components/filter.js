import React from 'react'
import ReactSlider from "react-slider";
import './filter.css'

const Slider = ({ filter, change, settings }) => {
  const {type, frequency, Q, gain} = settings

  console.log(filter)
  return (
    <ReactSlider
      className={`react-slider slider-${filter}`}
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