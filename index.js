const express = require('express')
const bodyParser = require('body-parser');
const dbConfig = require('./server/config/database.config.js');
const mongoose = require('mongoose');


const app = express()
var server = require('http').Server(app);
var port     = process.env.PORT || 8080;

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require('./server/routes/word.routes.js')(app);

mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

server.listen(port)