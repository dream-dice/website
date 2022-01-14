import Chance from 'chance'
import random from './random.json'

const chance = Chance()

export const generate = (name) => chance.pickone(random[name])
export const attribute = () => chance.pickone(random.attribute)
export const common = () => chance.pickone(random.common)
export const feat = () => chance.pickone(random.feat)
export const rare = () => chance.pickone(random.rare)
export const uncommon = () => chance.pickone(random.uncommon)
export const veryRare = () => chance.pickone(random.veryRare)
export const legendary = () => chance.pickone(random.legendary)
