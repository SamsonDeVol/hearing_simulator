import styled from '@emotion/styled/macro'

const Title = styled.div`
    top: 40%;
    left: -3em;
    position: absolute;
    rotate: -90deg;
`

const Labels = styled.div`
    position: absolute;
    left: 6em;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

function FilterLabels() {
    return (
        <div>
            <Title>
                <h4> Hearing Level [Volume in dB] </h4>
            </Title>
            <Labels>
                <a className="filter_label label--10"> -10 </a>
                <a className="filter_label label-0"> 0 </a>
                <a className="filter_label label-10"> 10 </a>
                <a className="filter_label label-20"> 20 </a>
                <a className="filter_label label-30"> 30 </a>
                <a className="filter_label label-40"> 40 </a>
                <a className="filter_label label-50"> 50 </a>
                <a className="filter_label label-60"> 60 </a>
                <a className="filter_label label-70"> 70 </a>
                <a className="filter_label label-80"> 80 </a>
                <a className="filter_label label-900"> 90 </a>
            </Labels>
        </div>
    )
}

export default FilterLabels
