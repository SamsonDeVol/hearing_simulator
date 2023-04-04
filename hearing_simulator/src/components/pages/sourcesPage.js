import "./Pages.css";
import styled from '@emotion/styled/macro'

const SourcesContainer = styled.div`
    margin: 0 10em 5em 10em;
`

const SourceList = styled.ul`
    margin: 0 5em 0 5em;
`

function SourcesPage() {
  return (
    <>
        <h1 className="header">More Sources</h1>

        <SourcesContainer>
            <h2> Want to learn more? Here are some great resources for reading further about the audio aspects of this project: </h2>
            <br></br>
            <SourceList>
                    <li> <p className="sources-text"> Hearing Loss:  <a href="https://www.cdc.gov/ncbddd/hearingloss/types.html" target="_blank"> cdc.gov </a> </p> </li>
                    <br></br>
                    <li> <p className="sources-text"> Audiograms: <a href="https://www.asha.org/public/hearing/audiogram/" target="_blank"> asha.org</a> (American Speech-Language-Hearing Association) </p> </li>
                    <br></br>
                    <li> <p className="sources-text"> Find an Audiologist:  <a href="https://www.healthyhearing.com/help/hearing-loss/symptoms#symptoms-of-noise-notch-hearing-loss" target="_blank"> asha.org </a> </p> </li>
            </SourceList>
            <br></br><br></br>
            <h2> For all the tech nerds out there, here’s some documentation on for API’s used:  </h2>
            <br></br>
            <SourceList>
                    <li> <p className="sources-text"> Web Audio API: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API" target="_blank"> developer.mozilla.org </a> </p> </li>
                    <br></br>
                    <li> <p className="sources-text"> Sound API:  <a href=" https://freesound.org/" target="_blank"> freesound.org </a> </p> </li>
            </SourceList>
        </SourcesContainer>
        <br></br>
    </>
  );
}

export default SourcesPage;
