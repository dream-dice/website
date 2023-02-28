import fs from 'fs'
import path from 'path'
import generateData from './generate-data.mjs'

const watch = (base) => {
    const directory = path.resolve(process.cwd(), `public/${base}`)
    fs.readdirSync(directory)
        .forEach(game => {
            const dir = path.join(directory, game)
            console.log('watching', dir)
            fs.watch(dir, (eventType, filename) => {
                console.log('updated', path.join(dir, filename))
                generateData(base)
            })
        })
}

watch('appendix')
watch('dm-notes')
watch('notes')