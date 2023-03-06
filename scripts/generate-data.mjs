import fs from 'fs'
import path from 'path'
import { capitalCase } from 'change-case'

export default (base) => {
    const directory = path.resolve(process.cwd(), `public/${base}`)
    const newData = {}
    fs.readdirSync(directory)
        .forEach(game => {
            const dir = path.join(directory, game)
            fs.readdirSync(dir)
                .filter(filename => filename.endsWith('.md'))
                .forEach((filename, index) => {
                    newData[game] = newData[game] || []
                    const name = filename.replace('.md', '')
                    const title = capitalCase(name)
                    const content = `/${base}/${game}/${filename}`
                    index = index + 1
                    if (name === 'summary') index = 0
                    if (name.startsWith('session-')) index = Number(name.replace('session-', ''))
                    newData[game].push(
                        {
                            index,
                            name,
                            title,
                            content
                        }
                    )
                })
        })

    fs.writeFileSync(`./src/${base}.json`, JSON.stringify(newData, null, 4))
    console.log('wrote', `./src/${base}.json`)
}
