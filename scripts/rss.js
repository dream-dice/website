const fs = require('fs')
const path = require('path')
const data = require('../src/rss.json')

const item = ({title, description, link, guid, date}) => `                <item>
                    <title><![CDATA[${title}]]></title>
                    <description><![CDATA[<p>${description}</p>]]></description>
                    <link>${link}</link>
                    <guid isPermaLink="false">${guid}</guid>
                    <dc:creator><![CDATA[Luke String]]></dc:creator>
                    <pubDate>${date}</pubDate>
                </item>`

const items = data.map(item).join('\n')

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
	<channel>
		<title><![CDATA[Dream Dice]]></title>
		<description><![CDATA[Where I keep all my notes.]]></description>
		<link>https://dream-dice.blankstring.com</link>
		<image>
			<url>https://dream-dice.blankstring.com/icon.png</url>
			<title>Dream Dice</title>
			<link>https://dream-dice.blankstring.com</link>
		</image>
		<generator>Dream Dice</generator>
		<lastBuildDate>${new Date()}</lastBuildDate>
		<atom:link href="https://dream-dice.blankstring.com/rss.xml" rel="self" type="application/rss+xml"/>
		<author><![CDATA[Luke Preston]]></author>
		<language><![CDATA[en-gb]]></language>
		<atom:link rel="hub" href="https://pubsubhubbub.appspot.com/"/>
${items}
	</channel>
</rss>`


const fileName = path.resolve(process.cwd(), 'build/rss.xml')
fs.writeFileSync(fileName, rss)