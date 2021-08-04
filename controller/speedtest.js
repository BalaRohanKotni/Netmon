const installSpeedTest = require("../helpers/install_speedtest");
const { exec } = require("child_process")
const fs = require("fs");
const SpeedtestResult = require("../models/speedtest_result")



if (!fs.existsSync("ookla/")) {
    installSpeedTest.installOoklaSpeedTestCLI();
}


function processResultAndStore(json) {
    console.log(json);
    let dateObj = new Date();

    const speedtestResult = SpeedtestResult();

    speedtestResult.time = dateObj`${dateObj.toLocaleString('default', { month: 'long' })} ${dateObj.getDate()} ${dateObj.getFullYear()} - ${dateObj.getHours()}:${dateObj.getMinutes()}`;

    speedtestResult.ping = json.ping;
    speedtestResult.downloadBandwidth = parseInt(json.download.bandwidth) / 125000;
    speedtestResult.uploadBandwidth = parseInt(json.upload.bandwidth) / 125000;
    speedtestResult.isp = json.isp;
    speedtestResult.isVpn = json.interface.isVpn;
    speedtestResult.serverLocation = json.server.location;
    speedtestResult.serverCountry = json.server.country;
    speedtestResult.resultURL = json.result.url;
    speedtestResult.packetLoss = json.packetLoss





}

dummyJSON = JSON.parse(`{"type": "result",
  "timestamp": "2021-08-03T17:06:34Z",
  "ping": { "jitter": 2.069, "latency": 10.882 },
  "download": { "bandwidth": 4834406, "bytes": 48578600, "elapsed": 10303 },
  "upload": { "bandwidth": 5297605, "bytes": 30577400, "elapsed": 5807 },
  "packetLoss": 0,
  "isp": "Airtel Broadband",
  "interface":
   { "internalIp": "192.168.1.3",
     "name": "wlp8s0",
     "macAddr": "74:DE:2B:F9:26:C7",
     "isVpn": false,
     "externalIp": "122.183.37.195" },
  "server":
   { "id": 2679,
     "name": "Bharti Airtel Ltd",
     "location": "Hyderabad",
     "country": "India",
     "host": "speedtestap1.airtel.in",
     "port": 8080,
     "ip": "223.224.136.154" },
  "result":
   { "id": "765e1d9a-ba45-4de5-9d9b-75f46f3f6166",
     "url":
      "https://www.speedtest.net/result/c/765e1d9a-ba45-4de5-9d9b-75f46f3f6166" } }`);

processResultAndStore(dummyJSON);

// exec("./ookla/speedtest -f json", function (err, data, getter) {
//     if (err) {
//         console.log("Error", err.message);
//         return;
//     }
//     result = JSON.parse(data.trim())
//     processResultAndStore(result);
// });
