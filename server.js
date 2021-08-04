const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:2002', { useNewUrlParser: true, useUnifiedTopology: true }, function () {
    console.log('Connected to DB');
});

const SpeedtestResult = require('./models/speedtest_result');

const app = express();

app.set('view engine', 'ejs');

app.get('/', async (req, res,) => {
    const results = await SpeedtestResult.find();
    console.log(results)
    res.json(results);
});

app.listen(5000)