import styled from '@emotion/styled/macro'

const VolumeLabelContainer = styled.div`

`
const Title = styled.div`
    top: 40%;
    right: -3em;
    position: absolute;
    rotate: 90deg;
`
const Labels = styled.div`
    position: absolute;
    right: 6em;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

function VolumeLabels() {
    return (
        <div>
            {/* <Title>
                <h4> Output Audio* [Volume in dB] </h4>
            </Title>
            <Labels>
                <a className="volume-label label--10"> x </a>
                <a className="volume-label label-00"> x </a>
                <a className="volume-label label-10"> x </a>
                <a className="volume-label label-20"> x </a>
                <a className="volume-label label-30"> x </a>
                <a className="volume-label label-40"> x </a>
                <a className="volume-label label-50"> x </a>
                <a className="volume-label label-60"> x </a>
                <a className="volume-label label-70"> x </a>
                <a className="volume-label label-80"> x </a>
                <a className="volume-label label-900"> x </a>
            </Labels> */}
        </div>
    )
}

export default VolumeLabels
