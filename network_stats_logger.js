const mongoose = require('mongoose')
const runProcessSaveSpeedtest = require('./controller/speedtest')

mongoDBPort = 27017

mongoose.connect(`mongodb://mongo:${mongoDBPort}`, { useNewUrlParser: true }, function () {
    console.log('connected to db');
});

runProcessSaveSpeedtest();

setInterval(function () {
    runProcessSaveSpeedtest();
}, 1800000);