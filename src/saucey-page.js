const Saucey = () => (
    <div className='level'>
        <div className='level-left'>
            <div className='level-item'>
                <div className="image">
                    <img src={`/saucey.jpeg`} alt='thing' />
                </div>
            </div>
            <div className='level-item'>
                <div className='content'>
                    <h1 className='title'>
                        The Wizard's Staff: A Spellinding Romance
                        <br />
                        (The Macy Blush Collection)
                    </h1>
                    <div style={{
                        overflowWrap: 'break-word',
                        wordWrap: 'break-word',
                        hyphens: 'auto'
                    }}>
                        <p style={{ maxWidth: 500 }} className='mt-5'>
                            Na’amah is just an average, ordinary half-succubus adopted by a warren of kobolds. But when she takes a trip to a nearby town, she discovers true love in the form of a distinguished wizard adventurer—Alatar. Life becomes complicated for Na’amah as she tries to get some alone time with the renowned hero, her forbidden fruit.
                        </p>
                        <p style={{ maxWidth: 500 }} className='mt-5'>
                            You can find the link to this wonderful book on <a href='https://www.amazon.co.uk/gp/product/B08VS1DHPM/ref=ppx_yo_dt_b_d_asin_title_o00?ie=UTF8&psc=1'>Amazon</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default Saucey