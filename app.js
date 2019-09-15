var express = require("express")
    mongoose = require("mongoose"),
    app = express(),
    bodyParser = require("body-parser"),
    CityService = require("./services/city-service")
    TownService = require("./services/town-service")

// const connectionString = process.env.DB_URL || 'mongodb://mongo/leaflet-app'

mongoose.connect('mongodb://localhost/map', { useNewUrlParser: true })
.then(()=> {
        console.log('You did it! Your MongoDB is running.')
}).catch(err => {
    // console.error('Something went wrong!')
    console.error(err)
    process.exit(1)
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/home", function (req, res) {
    res.render("home");
});

app.get('/city/all', async function(req, res) {
    const cities = await CityService.findAll()
    res.send(cities)
});

app.get('/city/:id/town/all', async function(req, res) {
    const city = await CityService.find(req.params.id)
    res.send(city.towns)
});

app.get('/town/all', async function(req, res) {
    const cities = await TownService.findAll()
    res.send(cities)
});

app.listen(3000, function () {
    console.log("server has started");
});  
