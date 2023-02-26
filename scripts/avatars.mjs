import fs from 'fs'
import path from 'path'

const avatarsDir = path.resolve(process.cwd(), 'public/hotlink-ok/avatars')
const avatarsJson = path.resolve(process.cwd(), 'src/avatars.json')

const avatars = []
fs.readdirSync(avatarsDir)
    .forEach(filename => {
        const { name } = path.parse(filename)
        const [avatar, index = 0] = name.split('+')
        const value = Object.fromEntries(
            avatar
                .split('_')
                .map(a => a.split('='))
                .concat([['index', Number(index)]])
                .concat([['filename', filename]])
        )
        avatars.push(value)
    })
fs.writeFileSync(
    avatarsJson,
    JSON.stringify(avatars, null, 4)
)
