import './Pages.css'

function ContributorsPage() {
    return (
        <>
            <h1 className="header">Contributors</h1>

            <div className="flex-container">
                <div className="flex-item-left flex-item">
                    <h1>Samson</h1>
                    <p>Software Engineer: <br></br>
                    tech is a cool tool. <br></br>
                    connect with me at <a href="https://www.samsondevol.com" target="_blank"> samsondevol.com </a></p>
                    <img src="images/samson_portrait.jpg"/>
                </div>
                <div className="flex-item-right flex-item">
                    <h1>Kimberly</h1>
                    <p>Computer Science nerd: <br></br>
                        obsessed with making beautiful things useful, <br></br>
                        and useful things more beautiful.</p>
                    <img src="images/kimberly_portrait.jpg"/>
                </div>
            </div>
            <div className="flex-container">
                <div className="flex-item-left flex-item">
                    <h1>Blake</h1>
                    <p>Aspiring Web Developer/Software Engineer<br></br>
                    passionate about making the world of technology more accessible and handy, one line of code at a time.
                    </p>
                    <img src="images/blake_portrait.jpg"/>
                </div>
                <div className="flex-item-right flex-item">
                    <h1>Ian Snyder</h1>
                    <p>Web Developer: <br></br>
                        splitting my time between coding web apps<br></br>
                        and playing in the mountains.</p>
                    <img src="images/ian_portrait.jpg"/>
                </div>
            </div>
            <br></br><br></br><br></br>
        </>
    )
}

export default ContributorsPage