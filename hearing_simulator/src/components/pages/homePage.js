import './Pages.css'
import { Link } from 'react-router-dom'

function HomePage() {
    return (
        <div>
            <h1 className={"header"}>Welcome to Audiomatic!</h1>
            <p className={"main-text"}> &nbsp; &nbsp; The mission of this project is to offer a free and open source web application for conceptualizing hearing loss through live audio manipulation. 
            <br></br><br></br>
			&nbsp; &nbsp; The audio manipulation interface found on the <Link to={"/use"}>Use Page</Link> allows the user to interact with a replication of an <Link to={"/audiogram"}>Audiogram</Link>; a chart used by audiologists to display the results of a hearing test.
			<br></br><br></br>
            &nbsp; &nbsp; For more resources on audiograms, hearing loss, and APIs used, checkout our <Link to={"/sources"}>Sources Page</Link>.
            Shoutout to all the <Link to={"/contributers"}>Contributers</Link> who worked hard pulling together this site!
            <br></br><br></br>
            </p>
            <br></br><br></br><br></br><br></br>
        </div>
        
    )
}

export default HomePage