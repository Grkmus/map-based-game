var Mongoose = require("mongoose");

var townSchema = Mongoose.Schema({
    _id: { type: String, required: true },
    name: String,
    city: String,
    districts: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'District'
    }],
    geolocation: {
        lat: Number,
        lon: Number,
        polygons: [Array],
        boundingbox: Array
    }
});

module.exports = Mongoose.model("Town", townSchema, 'town');