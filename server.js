const express = require("express");
const app = express();
const path = require('path');
const jsonfile = require('jsonfile');
const jsonSaveFile = './saveJSON.json';

app.use(express.static(__dirname + '/html'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/Studentuebersicht.html'));
});

// Initialize the app.
const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
});

app.get('/storage/studiengang', function (req, res) {
    res.statusCode(200).json(readFromJSON);
});

app.post('/storage/studiengang', function (req, res) {
    res.statusCode(200).json(saveInJSON);
});


function saveInJSON(arrayFromStudiengang){
    jsonfile.writeFileSync(jsonSaveFile, arrayFromStudiengang)
}

function readFromJSON(){
    return jsonfile.readFileSync(jsonSaveFile)
}