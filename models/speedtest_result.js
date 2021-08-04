const mongoose = require('mongoose');

const SpeedtestResult = mongoose.Schema(
    {
        time: { type: String, required: true },
        latency: { type: Number, required: true },
        jitter: { type: Number, required: true },
        downloadBandwidth: { type: Number, required: true },
        uploadBandwidth: { type: Number, required: true },
        packetLoss: { type: String, required: true },
        isp: { type: String, required: true },
        serverLocation: { type: String, required: true },
        serverCountry: { type: String, required: true },
        resultURL: { type: String, required: true },
    }
);

module.exports = mongoose.model('SpeedtestResult', SpeedtestResult);