import React, { useRef, useEffect } from 'react'

const Canvas = props => {  
  
	const { draw, ...rest } = props
	const canvasRef = useCanvas(draw)
	
	return <canvas className="canvas" width="640" height="401" ref={canvasRef} {...rest}/>
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
	// console.log("neeed: ", props.analyser)
	// 4800Hz and 2048 fft = 2400/1024 = 23.4Hz per bin
	props.analyser.fftSize = 2048;
	
	const bufferLength = props.analyser.frequencyBinCount;
	// console.log(props.analyser.minDecibels);
	const dataArray = new Uint8Array(bufferLength);


	const WIDTH = 640;
	const HEIGHT = 400;

	// draw an oscilloscope of the current audio source
	const draw = (canvasContext, frameCount) => {
		// let drawVisual = requestAnimationFrame(draw);
	
		props.analyser.getByteFrequencyData(dataArray);
		canvasContext.fillStyle = 'white';
		canvasContext.fillRect(0, 0, WIDTH, HEIGHT);

		var barWidth = 1;
		var barHeight;
		var x = 0;

		// draw grid
		var p = 0;
		for (var i = 0; i <= WIDTH; i += 91) {
			canvasContext.moveTo(0.5 + i + p, p);
			canvasContext.lineTo(0.5 + i + p, HEIGHT + p);
		}
		for (var i = 0; i <= HEIGHT+40; i += 40) {
			canvasContext.moveTo(p, 0.5 + i + p);
			canvasContext.lineTo(WIDTH + p, 0.5 + i + p);
		}
		canvasContext.strokeStyle = "black";
		canvasContext.stroke();

		// draw frequencies
		var jump = 0
		var x = 0
		for(var i = 1; i < bufferLength; i++) {
		barHeight = dataArray[i]*3;
		canvasContext.fillStyle = 'black';
		// 250//23.4 = 10.68 for audiogram relation
		if(i < 11){
			jump = 8;
		}
		// 500/23.4 = 21.37
		else if(i < 22){
			jump = 7			
		}
		// 1000/23.4 = 42.74
		else if(i < 42){
			jump = 3.5
		}
		// 2000/23.4 = 85.47
		else if(i < 85){
			jump = 1
		}
		// 4000/23.4 = 170.94
		else if(i < 170){
			jump = 0.1
		}
		// 8000/23.4 = 341.88
		else if(i < 341){
			jump = - .47
		}
		else{
			jump = -0.7
		}

		canvasContext.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
		// x += jump;
		x += barWidth + jump;
		}
  	};

	return (
		<div>
		<Canvas draw={draw} />
		</div>
	)
}
export default GraphFrequencies