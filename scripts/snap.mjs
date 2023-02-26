import fs from 'fs'
import path from 'path'
import handler from 'serve-handler'
import http from 'http'
import puppeteer from 'puppeteer'

const host = 'http://localhost:3030'

const buildDir = path.resolve('build')
const server = http.createServer((request, response) => {
    return handler(request, response, {
        public: buildDir
    })
})

const metadata = JSON.parse(fs.readFileSync('./src/metadata.json').toString())
const metadataUrls = Object.keys(metadata).filter(url => url.startsWith('/')).sort()
const notes = JSON.parse(fs.readFileSync('./src/notes.json').toString())
const notesUrls = Object
    .entries(notes)
    .map(([game, values]) =>
        values.map(
            ({ index }) => `/${game}/notes/${index}`
        )
    )
    .flat()
const appendix = JSON.parse(fs.readFileSync('./src/appendix.json').toString())
const appendixUrls = Object
    .entries(appendix)
    .map(([game, values]) =>
        values.map(
            ({ name }) => `/${game}/appendix/${name}`
        )
    )
    .flat()
const maps = JSON.parse(fs.readFileSync('./src/maps.json').toString())
const mapsUrls = maps.map(({name}) => `/maps/${name}`)

const avatars = JSON.parse(fs.readFileSync('./src/avatars.json').toString())
const avatarsUrls = avatars.map(({filename}) => `/avatars/${filename.replace('.png', '')}`)

const urls = [...metadataUrls, ...notesUrls, ...appendixUrls, ...mapsUrls, ...avatarsUrls]

const copyIndex = async () => {
    for (const url of urls) {
        const dir = path.join(buildDir, url)
        if (!fs.existsSync(dir)) fs.mkdirSync(dir)
        fs.copyFileSync(path.join(buildDir, 'index.html'), path.join(dir, 'index.html'))
        if (url === '/') {
            fs.copyFileSync(path.join(buildDir, 'index.html'), path.join(dir, '404.html'))
            fs.copyFileSync(path.join(buildDir, 'index.html'), path.join(dir, '200.html'))
        }
    }
}
copyIndex()

server.listen(3030, async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage()

    for (const url of urls) {
        await page.goto(`${host}${url}`);
        await page.waitForNetworkIdle()
        const data = await page.evaluate(() => document.querySelector('*').outerHTML);
        const dir = path.join(buildDir, url)
        console.log('writing', url)
        fs.writeFileSync(path.join(dir, 'index.html'), data)
        if (url === '/') {
            console.log('writing', '200')
            fs.writeFileSync(path.join(dir, '200.html'), data)
        }
    }

    await page.goto(`${host}/404`);
    await page.waitForNetworkIdle()
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    console.log('writing', '404')
    fs.writeFileSync(path.join(buildDir, '404.html'), data)
    await browser.close()
    process.exit()
})
