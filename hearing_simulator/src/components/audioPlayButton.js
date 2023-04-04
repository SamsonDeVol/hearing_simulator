import React from 'react'

class AudioPlayButton extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        playing: false
      }
    }
  
    handleClick(){
      this.setState({playing:!this.state.playing})
      this.props.playClickHandler(this.state.playing)
    }
  
    render(){
      return(
            <button className="play-click" onClick={ (e) => {this.handleClick(e)} }> {this.state.playing ? <p> Pause </p> : <p> Play </p>} </button> 
      )
    }
  }

export default AudioPlayButton
