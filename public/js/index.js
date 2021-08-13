const CHART = document.getElementById("chart").getContext("2d");

let labelsTime = [];
let downloadData = [];
let uploadData = [];

results.forEach(function (result) {

    downloadData.push(result.downloadBandwidth);
    uploadData.push(result.uploadBandwidth);
    labelsTime.push(result.time);
    console.log(result.time)
});

function goBackOneDay(date) {
    let monthDayNum = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let month = parseInt(date.split(' - ')[0].split(' ')[0]);
    let day = parseInt(date.split(' - ')[0].split(' ')[1]);
    let year = date.split(' - ')[0].split(' ')[2];

    let hour = date.split(' - ')[1].split(':')[0];
    let min = date.split(' - ')[1].split(':')[1];

    if (day != 1) {
        return `${month} ${day - 1} ${year} - ${hour}:${min}`
    }
    else if (day == 1 && month != 1) {
        return `${month - 1} ${monthDayNum[month - 2]} ${year} - ${hour}:${min}`
    }
    else if (day == 1 && month == 1) {
        return `12 ${monthDayNum[12 - 1]} ${year - 1} - ${hour}:${min}`
    }
}


Chart.defaults.scale.ticks.beginAtZero = true;
let barChart = new Chart(CHART,

    {
        type: "bar",
        data: {
            labels: labelsTime,
            datasets: [
                {
                    label: "Download Bandwidth",
                    backgroundColor: "#1fa8e7",
                    data: downloadData,
                },
                {
                    label: "Upload Bandwidth",
                    backgroundColor: "#bd71ff",
                    data: uploadData,
                }
            ],
        },
        options: {
            color: "#fff",
            maintainAspectRatio: false,
        },
    }
);
