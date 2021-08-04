const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:2002', { useNewUrlParser: true, useUnifiedTopology: true }, function () {
    console.log('Connected to DB');
});

const SpeedtestResult = require('./models/speedtest_result');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
    const results = await SpeedtestResult.find();

    let avgs = []

    downloadBandwidthSum = 0
    results.forEach(data => { downloadBandwidthSum += data.downloadBandwidth });
    avgs.push((downloadBandwidthSum / results.length).toFixed(2));

    uploadBandwidthSum = 0
    results.forEach(data => { uploadBandwidthSum += data.uploadBandwidth });
    avgs.push((uploadBandwidthSum / results.length).toFixed(2));

    res.render('index', { avgs: avgs })
});

app.get('/db', async (req, res,) => {
    const results = await SpeedtestResult.find();
    console.log(results)
    res.json(results);
});

app.listen(5000)