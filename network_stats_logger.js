require('dotenv').config()
const mongoose = require('mongoose')
const runProcessSaveSpeedtest = require('./controller/speedtest')

mongoose.connect(`${process.env.mongodb_uri}${process.env.mongodb_port}`, { useNewUrlParser: true }, function () {
    console.log('connected to db');
});

runProcessSaveSpeedtest();

setInterval(function () {
    runProcessSaveSpeedtest();
}, 1800000);