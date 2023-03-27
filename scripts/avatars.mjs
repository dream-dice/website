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

        const tags = [...Object.keys(value)].filter(key => key.startsWith('t'))
        value.tags = value.tags || []
        tags.forEach(tag => {
            value.tags.push(value[tag])
            delete value[tag]
        })
        avatars.push(value)
    })
fs.writeFileSync(
    avatarsJson,
    JSON.stringify(avatars.sort(({ filename: left }, { filename: right }) => {
        if (!new RegExp(/.*\d+\.png$/igm).test(left)) {
            left = left.replace('.png', '+0.png')
        }
        if (!new RegExp(/.*\d+\.png$/igm).test(right)) {
            right = right.replace('.png', '+0.png')
        }
        if (left > right) return 1
        if (left < right) return -1
        return 0
    }), null, 4)
)

console.log(
    'All the keys',
    [...new Set(avatars.map(a => Object.keys(a)).flat())]
)

console.log('written to', avatarsJson)