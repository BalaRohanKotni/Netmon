const mongoose = require('mongoose')
const runProcessSaveSpeedtest = require('./controller/speedtest')

mongoDBPort = 2002

mongoose.connect('mongodb://localhost:2002', { useNewUrlParser: true }, function () {
    console.log('connected to db');
});

runProcessSaveSpeedtest();

setInterval(function () {
    runProcessSaveSpeedtest();
}, 1800000);