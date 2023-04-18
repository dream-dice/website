import fs from 'fs'
import path from 'path'

const mapsDir = path.resolve(process.cwd(), 'public/hotlink-ok/maps')
const mapsJson = path.resolve(process.cwd(), 'src/maps.json')

const maps = []
fs.readdirSync(mapsDir)
    .forEach(filename => {
        const { name } = path.parse(filename)
        maps.push({
            name,
            filename
        })
    })

fs.writeFileSync(
    mapsJson,
    JSON.stringify(maps, null, 4)
)

console.log('written to', mapsJson)