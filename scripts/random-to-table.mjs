import fs from 'fs'
import chance from 'chance'

const maleIcon = 'assets/icons/icons/male.png'
const femaleIcon = 'assets/icons/icons/female.png'
const personIcon = 'assets/icons/icons/person.png'
const twoShadowsIcon = 'assets/icons/icons/two-shadows.png'
const dragonIcon = 'assets/icons/icons/dragon-head.png'
const undeadIcon = 'assets/icons/icons/chewed-skull.png'
const treesIcon = 'assets/icons/icons/deku-tree.png'
const {
    female,
    male,
    last,
    all,
    dragon,
    undead,
    trees
} = JSON.parse(fs.readFileSync('../src/names.json').toString())

const randomId = () => chance().string({ alpha: true, length: 16 })

const generate = (names, icon, type) => {
    const generateRow = (name, index) => ({
        "_id": randomId(),
        "type": 0,
        "text": name,
        "weight": 1,
        "range": [
            index,
            index
        ],
        "drawn": false,
        "flags": {},
        "img": icon,
        "rangeL": index,
        "rangeH": index
    })

    const results = names.map(generateRow)
    const table = {
        "name": `${type} Names`,
        "img": icon,
        results,
        "formula": `1d${names.length}`,
        "replacement": true,
        "displayRoll": true,
        "flags": {
            "exportSource": {
                "world": "intrepid-cusaders",
                "system": "dnd5e",
                "coreVersion": "9.269",
                "systemVersion": "1.6.3"
            }
        }
    }
    fs.writeFileSync(`./${type}-names.json`, JSON.stringify(table))
    console.log('written', `./${type}-names.json`)
}


// generate(maleNames, maleIcon, 'male')
// generate(femaleNames, femaleIcon, 'female')
// generate(lastNames, personIcon, 'last')
// generate(allNames, twoShadowsIcon, 'all')
// generate(dragon, dragonIcon, 'dragon')
// generate(undead, undeadIcon, 'undead')
generate(trees, treesIcon, 'trees')
