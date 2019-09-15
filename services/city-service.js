const CityModel = require('../models/city')

async function findAll() {
    return CityModel.find()
}

async function find(cityId) {
    return CityModel.findOne({ _id: cityId }).populate(['towns'])
}

async function update(cityId, newCity) {
    return CityModel.updateOne({ _id: cityId }, newCity, { new: true })
}

module.exports = {
    findAll,
    find,
    update
}