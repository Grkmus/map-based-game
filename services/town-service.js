const TownModel = require('../models/town')

async function findAll() {
    return TownModel.find()
}


module.exports = {
    findAll
}