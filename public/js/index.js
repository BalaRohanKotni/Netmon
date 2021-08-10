const CHART = document.getElementById("chart").getContext("2d");

const labelsTime = [];
const downloadData = [];

results.forEach(function (result) {
    downloadData.push(result.downloadBandwidth)
    labelsTime.push(result.time);
});

console.log(labelsTime);

const labels = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug"]

let lineChart = new Chart(CHART, {
    type: 'line',
    data: {
        labels: labelsTime,
        datasets: [{
            tension: 0.1,
            label: 'Download',
            data: downloadData,
            fill: false,
            borderColor: 'white',
            pointBorderWidth: 10,
            pointHitRadius: 10,
            pointHoverBorderWidth: 4,
            pointHoverHitRadius: 4,
        },]
    },
});