var Mongoose = require("mongoose");

// var citySchema = Mongoose.Schema({ collection : 'city' })

var citySchema = Mongoose.Schema({
    _id: { type: String, required: true },
    name: String,
    towns: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Town'
    }],
    geolocation: {
        lat: Number,
        lon: Number,
        polygons: [Array],
        boundingbox: Array
    }
});

module.exports = Mongoose.model("City", citySchema, 'city');