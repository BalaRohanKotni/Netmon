const mongoose = require('mongoose')

mongoDBPort = 2002

mongoose.connect('mongodb://localhost:2002', { useNewUrlParser: true }, function () {
    console.log('connected to db');
});

