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
            <li><a href='https://intrepid-crusaders.blankstring.com/appendix.json'>https://intrepid-crusaders.blankstring.com/appendix.json</a></li>
            <li><a href='https://intrepid-crusaders.blankstring.com/calendar.json'>https://intrepid-crusaders.blankstring.com/calendar.json</a></li>
            <li><a href='https://intrepid-crusaders.blankstring.com/items.json'>https://intrepid-crusaders.blankstring.com/items.json</a></li>
            <li><a href='https://intrepid-crusaders.blankstring.com/maps.json'>https://intrepid-crusaders.blankstring.com/maps.json</a></li>
            <li><a href='https://intrepid-crusaders.blankstring.com/names.json'>https://intrepid-crusaders.blankstring.com/names.json</a></li>
            <li><a href='https://intrepid-crusaders.blankstring.com/notes.json'>https://intrepid-crusaders.blankstring.com/notes.json</a></li>
            <li><a href='https://intrepid-crusaders.blankstring.com/random.json'>https://intrepid-crusaders.blankstring.com/random.json</a></li>
        </ul>

        <h2>Copyright and other T&C's</h2>
        <p>Any content I have used comes from WotC or I created it. It is all for hobby and fun and no profit is made from the content on this website.</p>
    </div>
)

export default Home