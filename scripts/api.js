const fs = require('fs')
const path = require('path')

const srcFolder = path.resolve(process.cwd(), 'src')
const buildFolder = path.resolve(process.cwd(), 'build')

fs.readdirSync(srcFolder)
    .filter(file => file.endsWith('.json'))
    .forEach(file => {
        fs.copyFileSync(
            path.join(srcFolder, file),
            path.join(buildFolder, file)
        )
    })