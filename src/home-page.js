import React from 'react'

const Home = () => (
    <div className='content mt-3'>
        <h1 className='title'>Intrepid Crusaders</h1>
        <p>
            Hey there, this is a website I use to be able to share info with players. I don't agree that DMs should hide anything from their players, other than spoilers. This is a collection of notes and tools I have created and I hope that my players find some use out of it. I do this as a labour of love and not as a job, so please don't be disheartended if you feel something is wrong or incorrect, instead start a conversation with me on Discord and we can sort it out.
        </p>

        <h2>Searchable</h2>
        <p>As many of the pages are searchable as possible and you can search using the url adding the param <b>?term=</b> in the url or use the search box on each page.</p>

        <h2>API</h2>
        <p>There are several APIs which contains all the data that the website uses. Feel free to use these, they aren't maintained so don't get in contact if anything is broken with them.</p>
        <ul>
            <li>https://intrepid-crusaders.blankstring.com/appendix.json</li>
            <li>https://intrepid-crusaders.blankstring.com/calendar.json</li>
            <li>https://intrepid-crusaders.blankstring.com/factions.json</li>
            <li>https://intrepid-crusaders.blankstring.com/items.json</li>
            <li>https://intrepid-crusaders.blankstring.com/maps.json</li>
            <li>https://intrepid-crusaders.blankstring.com/names.json</li>
            <li>https://intrepid-crusaders.blankstring.com/notes.json</li>
            <li>https://intrepid-crusaders.blankstring.com/players.json</li>
            <li>https://intrepid-crusaders.blankstring.com/random.json</li>
        </ul>

        <h2>Players & NPCs</h2>
        <p>This has all the infomation I am willing to share about players and NPCs. If something is missing it will be because the players do not know this infomation. It might not be complete and I have tried to keep it as brief as possible.</p>

        <h2>Notes</h2>
        <p>This is a bullet point list of notes after I have run a session. Useful for recapping or finding info that you might have forgotton.</p>

        <h2>Copyright and other T&C's</h2>
        <p>For all the D&D content it will either come from Wizards of the Coast or my brain. It is all creative and if I plagurise anything it is probably a parody or super coincidence.</p>
        <p>I didn't make any images, if anyone recognises the images and wants me to take them down I am happy to. As far as I am aware they all fall under creative licence or were publically posted without any rules on them.</p>
        <p>If you take any of the images off my site, that doesn't bother me. You are responsible for them and if you get caught that's your own fault and not mine.</p>
        <p>I don't make any money off of this, it is all a hobby and for fun.</p>

        <h2>More to come</h2>
        <p>More things to come, lots more.</p>
        <ul>
            <li><b>Services</b> I intend to extend the shops with the services available.</li>
            <li><b>DM notes and tools</b> I have a list of things like rules and certain tools which I have created in order to make my job easier, but also to set expectations for players. This is being moved about as well.</li>
        </ul>
    </div>
)

export default Home