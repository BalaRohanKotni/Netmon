const mongoose = require('mongoose');

const SpeedtestResult = mongoose.schema(
    {
        time: { type: String, required: true },
        ping: { type: Uint8Array, required: true },
        downloadBandwidth: { type: Float64Array, required: true },
        uploadBandwidth: { type: Float64Array, required: true },
        packetLoss: { type: String, required: true },
        isp: { type: String, required: true },
        serverLocation: { type: String, required: true },
        serverCountry: { type: String, required: true },
        resultURL: { type: String, required: true },
    }
);

module.exports = mongoose.model('SpeedtestResult', SpeedtestResult);