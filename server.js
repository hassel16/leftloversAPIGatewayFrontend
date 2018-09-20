const express = require("express");
const app = express();
const path = require('path');
const jsonfile = require('jsonfile');
const bodyParser = require('body-parser');
const jsonSaveFile = './saveJSON.json';

app.use(bodyParser.json());

app.use(express.static(__dirname + '/html'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});



// Initialize the app.
const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
});

const routerObj = readFromJSON();

app.get('/storage/studiengang', function (req, res) {
    res.status(200).json(readFromJSON());
});

app.post('/storage/studiengang', function (req, res) {
    res.status(200).json(saveInJSON(req.body));
});

function saveInJSON(arrayFromStudiengang){
    jsonfile.writeFileSync(jsonSaveFile, arrayFromStudiengang)
}

function readFromJSON(){
    return jsonfile.readFileSync(jsonSaveFile)
}

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/Studentuebersicht.html'));
});
