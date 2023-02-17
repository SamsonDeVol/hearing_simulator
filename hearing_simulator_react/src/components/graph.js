import React, { useRef, useEffect } from 'react'

const Canvas = props => {  
  
  const { draw, ...rest } = props
  const canvasRef = useCanvas(draw)
  
  return <canvas className="canvas" ref={canvasRef} {...rest}/>
}

const useCanvas = draw => {
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId
    
    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return canvasRef
}

function GraphFrequencies(props){

  // 4800Hz and 2048 fft = 2400/1024 = 23.4Hz per bin
  // TODO: decide best value
  props.analyser.fftSize = 2048;
 
  const bufferLength = props.analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  const WIDTH = 1280;
  const HEIGHT = 200;

  // draw an oscilloscope of the current audio source
  const draw = (canvasContext) => {
  
    props.analyser.getByteFrequencyData(dataArray);
    canvasContext.fillRect(0, 0, WIDTH, HEIGHT);

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;
    for(var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      // 250//23.4 = 10.68 for audiogram relation
      if(i < 10.68){
        canvasContext.fillStyle = 'rgb(255,0,0)';
      }
      // 500/23.4 = 21.37
      else if(i < 21.37){
        canvasContext.fillStyle = 'rgb(255,127,0)';
      }
      // 1000/23.4 = 42.74
      else if(i < 42.74){
        canvasContext.fillStyle = 'rgb(255,255,0)';
      }
      // 2000/23.4 = 85.47
      else if(i < 85.47){
        canvasContext.fillStyle = 'rgb(0,255,0)';
      }
      // 4000/23.4 = 170.94
      else if(i < 170.94){
        canvasContext.fillStyle = 'rgb(0,0,255)';
      }
      // 8000/23.4 = 341.88
      else if(i < 341.88){
        canvasContext.fillStyle = 'rgb(75,0,130)';
      }
      else{
        canvasContext.fillStyle = 'rgb(255,255,255)';
      }
      canvasContext.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
      x += barWidth + 1;
    }
  };

  return (
    <>
      <Canvas draw={draw} />
    </>
  )
}

export default GraphFrequencies