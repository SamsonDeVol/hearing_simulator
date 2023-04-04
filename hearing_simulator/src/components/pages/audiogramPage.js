import './Pages.css'
import audiogramDiagnostic from '../../img/audiogram_diagnostic.png'

function AudiogramPage() {
    return (
        <div className="audiogram-container">
            <h1 className="header">Audiograms</h1>
            <p className="audiogram-text"> &emsp; &emsp; Audiograms are tools used by Audiologists to measure audible thresholds for individuals based on specific frequencies
            This helps asses hearing levels, and provide the right diagnositcs. 
            Below is an image of an example Audiogram.  </p> <br></br>
            <div className="audiogram-img-container">
                <img className="audiogram-img" src={audiogramDiagnostic} alt="Christa L. Themann - Own work"></img>
                <p>Christa L. Themann - Own work:  Pure tone audiogram showing a "notch" consistent with noise-induced hearing loss in the left ear and normal hearing in the right ear</p>
            </div> <br></br>
            
            <p className="audiogram-text"> &emsp; &emsp; As seen in the figure, the x axis is a scale of frequencies measured in Hertz. 
            Along the y axis is a scale of volume measured in Decibels. 
            The notchs for both the right and left ears intersect with the quietest volume that a participant can hear for that given frequency.
            <br></br><br></br>
            &emsp;&emsp; For our practices, we have limited the interactive audiogram to a single notch, as audio output devices are not always capable of replilcating full stereo sound.  </p>
            <br></br>
        </div>
    )
}

export default AudiogramPage