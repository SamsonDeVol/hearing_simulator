import styled from '@emotion/styled/macro'


const FrequencyLabelContainer = styled.div`
  display: flex;
  justify-content: start;
  width: 660px;
  padding: 0 0 0 130px;

  .frequency-label{
    padding: 0px;
  }
  
  .label-0 {
    margin: 0px 0px 0px 0em;
  }
  .label-250 {
    margin: 0px 0px 0px 4em;
  }
  .label-500 {
    margin: 0px 0px 0px 4em;
  }
  .label-1000 {
    margin: 0px 0px 0px 4em;
  }
  .label-2000 {
    margin: 0px 0px 0px 3em;
  }
  .label-4000{
    margin: 0px 0px 0px 3.5em;
  }
  .label-8000{
    margin: 0px 0px 0px 3.5em;
  }
  .label-16000{
    margin: 0px 0px 0px 3em;
  }
  
`
function FrequencyLabels() {
    return (
        <>
          <h3> Frequency [Hz]</h3>
            <FrequencyLabelContainer>
                <p className="frequency-label label-0"> 0 </p>
                <p className="frequency-label label-250"> 250 </p>
                <p className="frequency-label label-500"> 500 </p>
                <p className="frequency-label label-1000"> 1000 </p>
                <p className="frequency-label label-2000"> 2000 </p>
                <p className="frequency-label label-4000"> 4000 </p>
                <p className="frequency-label label-8000"> 8000 </p>
                <p className="frequency-label label-16000"> 16000 </p>
            </FrequencyLabelContainer>
        </>
    )
}

export default FrequencyLabels