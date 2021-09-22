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

    // get avg
    let downloadBandwidthSum = 0
    results.forEach(data => { downloadBandwidthSum += data.downloadBandwidth });
    let avgDownloadBandwidth = (downloadBandwidthSum / results.length).toFixed(2);

    // get avg
    let uploadBandwidthSum = 0
    results.forEach(data => { uploadBandwidthSum += data.uploadBandwidth });
    let avgUploadBandwidth = (uploadBandwidthSum / results.length).toFixed(2);

    // get avg
    let latencySum = 0;
    results.forEach(data => { latencySum += data.latency });
    let avgLatency = (latencySum / results.length).toFixed(1);

    // get avg
    let jitterSum = 0;
    results.forEach(data => { jitterSum += data.jitter });
    let avgJitter = (jitterSum / results.length).toFixed(3);

    res.render('pages/avg', { avgDownloadBandwidth: avgDownloadBandwidth, avgUploadBandwidth: avgUploadBandwidth, avgLatency: avgLatency, avgJitter: avgJitter });
});

app.get('/graph', async (req, res) => {
    const results = await SpeedtestResult.find();
    res.render('pages/graph', { speedtestResults: JSON.stringify(results) });
});

app.get('/db', async (req, res,) => {
    const results = await SpeedtestResult.find();
    res.json(results);
});

app.get('/allResults', async (req, res) => {
    // res.render("");
});

app.listen(5000)