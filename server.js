const express = require("express");
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/html'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/Studentübersicht.html'));
});

// Initialize the app.
const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
});