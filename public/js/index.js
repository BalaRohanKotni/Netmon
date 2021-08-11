const CHART = document.getElementById("chart").getContext("2d");

const labelsTime = [];
const downloadData = [];
const uploadData = [];

results.forEach(function (result) {
    downloadData.push(result.downloadBandwidth);
    uploadData.push(result.uploadBandwidth);
    labelsTime.push(result.time);
});

console.log(labelsTime.length);
let lineChart = new Chart(CHART, {
    type: 'line',
    data: {
        labels: labelsTime,
        datasets: [{
            tension: 0.1,
            label: 'Download Bandwidth',
            data: downloadData,
            fill: true,
            borderWidth: 2,
            backgroundColor: 'rgba(31, 168, 231, 0.3)',
            borderColor: '#1fa8e7',
            pointBorderWidth: 1,
            pointHitRadius: 1,
            pointHoverBorderWidth: 1,
            pointHoverHitRadius: 1,
        }, {
            tension: 0.1,
            label: 'Upload Bandwidth',
            data: uploadData,
            fill: true,
            borderColor: '#bd71ff',
            backgroundColor: 'rgba(189, 113, 255, 0.4)',
            pointBorderWidth: 1,
            pointHitRadius: 1,
            pointHoverBorderWidth: 1,
            pointHoverHitRadius: 1,
        },]
    },
});