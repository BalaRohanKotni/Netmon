const { exec } = require("child_process")
const fs = require("fs");
const SpeedtestResult = require("../models/speedtest_result")
const mongoose = require('mongoose')

mongoose.connect('mongodb://mongo:27017', { useUnifiedTopology: true, useNewUrlParser: true }, function () {
  console.log('Connected to DB');
});


function runProcessSaveSpeedtest() {
  function processResultAndStore(json) {
    console.log(json);
    let dateObj = new Date();

    const speedtestResult = SpeedtestResult();

    speedtestResult.time = `${dateObj.toLocaleString('default', { month: 'long' })} ${dateObj.getDate()} ${dateObj.getFullYear()} - ${dateObj.getHours()}:${dateObj.getMinutes()}`;

    speedtestResult.latency = json.ping.latency;
    speedtestResult.jitter = json.ping.jitter;
    speedtestResult.downloadBandwidth = parseInt(json.download.bandwidth) / 125000;
    speedtestResult.uploadBandwidth = parseInt(json.upload.bandwidth) / 125000;
    speedtestResult.isp = json.isp;
    speedtestResult.isVpn = json.interface.isVpn;
    speedtestResult.serverLocation = json.server.location;
    speedtestResult.serverCountry = json.server.country;
    speedtestResult.resultURL = json.result.url;
    speedtestResult.packetLoss = parseInt(json.packetLoss);

    speedtestResult.save()
    console.log("saved")
  }


  console.log("executing");
  exec("speedtest -f json --accept-license", function (err, data, getter) {
    if (err) {
      console.log("Error", err.message);
      return;
    }
    console.log("done, saving");
    result = JSON.parse(data.trim())
    processResultAndStore(result);
  });
}

module.exports = runProcessSaveSpeedtest;